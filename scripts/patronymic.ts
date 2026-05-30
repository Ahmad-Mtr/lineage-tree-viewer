/**
 * Add or remove Ibn/بن patronymics in src/lib/data.ts.
 *
 * Usage:
 *   bun scripts/patronymic.ts --add     # Muhammad → Muhammad ibn Mustafa
 *   bun scripts/patronymic.ts --remove  # Muhammad ibn Mustafa → Muhammad
 *   bun scripts/patronymic.ts --dry-run --add
 */

import { readFileSync, writeFileSync } from 'fs'
import { resolve } from 'path'

const mode    = process.argv.includes('--remove') ? 'remove' : 'add'
const dryRun  = process.argv.includes('--dry-run')
const FILE    = resolve(import.meta.dirname, '../src/lib/data.ts')

const src = readFileSync(FILE, 'utf8')

// ── 1. Parse every data line into a lightweight record ───────────────────────

type Entry = { id: string; fatherId: string | null; firstAr: string; firstEn: string }

const entries: Entry[] = []
const lineRe  = /id:\s*'([^']+)'.*?fatherId:\s*('([^']*)'|null).*?firstAr:\s*'([^']*)'.*?firstEn:\s*'([^']*)'/g
let m: RegExpExecArray | null
while ((m = lineRe.exec(src)) !== null) {
  entries.push({ id: m[1], fatherId: m[3] ?? null, firstAr: m[4], firstEn: m[5] })
}

const byId = Object.fromEntries(entries.map(e => [e.id, e]))

// ── 2. Build replacement map: id → { nameAr, nameEn } ───────────────────────

const replacements = new Map<string, { nameAr: string; nameEn: string }>()
for (const e of entries) {
  const parent = e.fatherId ? byId[e.fatherId] : null
  replacements.set(e.id, {
    nameAr: parent && mode === 'add' ? `${e.firstAr} بن ${parent.firstAr}` : e.firstAr,
    nameEn: parent && mode === 'add' ? `${e.firstEn} ibn ${parent.firstEn}` : e.firstEn,
  })
}

// ── 3. Apply to source text line by line ─────────────────────────────────────

const idLineRe = /id:\s*'([^']+)'/

let changed = 0
const result = src.split('\n').map(line => {
  const idMatch = idLineRe.exec(line)
  if (!idMatch) return line
  const rep = replacements.get(idMatch[1])
  if (!rep) return line

  const updated = line
    .replace(/(nameAr:\s*')[^']*(')/,  `$1${rep.nameAr}$2`)
    .replace(/(nameEn:\s*')[^']*(')/,  `$1${rep.nameEn}$2`)
  if (updated !== line) changed++
  return updated
}).join('\n')

// ── 4. Report / write ────────────────────────────────────────────────────────

if (result === src) {
  console.log(`Nothing to change — names already in '${mode}' form.`)
  process.exit(0)
}

console.log(`Mode: ${mode} | ${changed} lines updated`)

if (dryRun) {
  const before = src.split('\n')
  const after  = result.split('\n')
  let shown = 0
  for (let i = 0; i < after.length && shown < 10; i++) {
    if (after[i] !== before[i]) {
      const bid = (idLineRe.exec(before[i]) ?? [])[1] ?? '?'
      console.log(`  [${bid}]`)
      console.log(`    - ${before[i].match(/nameAr:\s*'[^']*'|nameEn:\s*'[^']*'/g)?.join('  ')}`)
      console.log(`    + ${after[i].match(/nameAr:\s*'[^']*'|nameEn:\s*'[^']*'/g)?.join('  ')}`)
      shown++
    }
  }
  if (changed > 10) console.log(`  … and ${changed - 10} more`)
  console.log('\n(dry run — no file written)')
} else {
  writeFileSync(FILE, result)
  console.log('Done.')
}
