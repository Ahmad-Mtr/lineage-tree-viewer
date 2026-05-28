import { useState } from 'react'
import type { Lang, RelResult, Person } from '@/lib/types'
import { data } from '@/lib/data'
import { personFirst, t } from '@/lib/i18n'
import { Sheet } from './sheet'
import { PersonRow } from './person-row'

interface RelationSheetProps {
  open: boolean
  onClose: () => void
  lang: Lang
  relAId: string | null
  relBId: string | null
  onSetRelAId: (id: string | null) => void
  onSetRelBId: (id: string | null) => void
  onShowOnTree: (path: Set<string>) => void
}

type Picking = 'a' | 'b' | null

export function RelationSheet({
  open, onClose, lang, relAId, relBId, onSetRelAId, onSetRelBId, onShowOnTree
}: RelationSheetProps) {
  const ar = lang === 'ar'
  const [picking, setPicking] = useState<Picking>(null)
  const [query, setQuery] = useState('')

  const personA = relAId ? data.byId[relAId] : null
  const personB = relBId ? data.byId[relBId] : null

  const result: RelResult | null = relAId && relBId ? data.relationship(relAId, relBId) : null
  const lca = result ? data.byId[result.lca] : null

  const filtered = query.length > 0
    ? data.people.filter(p => {
        const q = query.toLowerCase()
        return p.nameEn.toLowerCase().includes(q) || p.nameAr.includes(query)
      })
    : data.people

  function handlePick(id: string) {
    if (picking === 'a') onSetRelAId(id)
    else if (picking === 'b') onSetRelBId(id)
    setPicking(null)
    setQuery('')
  }

  function handleShowOnTree() {
    if (!result) return
    const path = new Set([...result.aPath, ...result.bPath])
    onShowOnTree(path)
    onClose()
  }

  if (picking !== null) {
    return (
      <Sheet open={open} onClose={() => setPicking(null)} title={picking === 'a' ? t('pickPersonA', lang) : t('pickPersonB', lang)} lang={lang}>
        <div style={{ padding: '0 16px 12px' }}>
          <div className="search-input">
            <input
              dir={ar ? 'rtl' : 'ltr'}
              placeholder={ar ? 'ابحث بالاسم…' : 'Search by name…'}
              value={query}
              onChange={e => setQuery(e.target.value)}
              autoFocus
              style={{ all: 'unset', flex: 1, fontSize: 15, fontFamily: ar ? 'var(--font-arabic)' : undefined }}
            />
          </div>
        </div>
        <div style={{ padding: '0 16px' }}>
          {filtered.map(p => (
            <PersonRow key={p.id} person={p} lang={lang} onClick={() => handlePick(p.id)} />
          ))}
        </div>
      </Sheet>
    )
  }

  return (
    <Sheet open={open} onClose={onClose} title={t('relationship', lang)} lang={lang}>
      <div style={{ padding: '0 16px 24px', display: 'flex', flexDirection: 'column', gap: 16 }}>

        {/* Person A */}
        <div>
          <div className={`section-eyebrow${ar ? ' ar' : ''}`}>{ar ? 'الشخص الأول' : 'First person'}</div>
          {personA ? (
            <PersonRow
              person={personA}
              lang={lang}
              onClick={() => setPicking('a')}
              trailing={<EditIcon />}
            />
          ) : (
            <button
              type="button"
              className={`row${ar ? ' ar' : ''}`}
              style={{ color: 'var(--olive-deep)', fontFamily: ar ? 'var(--font-arabic)' : undefined }}
              onClick={() => setPicking('a')}
            >
              <span style={{ flex: 1, textAlign: ar ? 'right' : 'left', fontSize: 14 }}>
                {t('pickPersonA', lang)}
              </span>
              <PlusIcon />
            </button>
          )}
        </div>

        {/* Person B */}
        <div>
          <div className={`section-eyebrow${ar ? ' ar' : ''}`}>{ar ? 'الشخص الثاني' : 'Second person'}</div>
          {personB ? (
            <PersonRow
              person={personB}
              lang={lang}
              onClick={() => setPicking('b')}
              trailing={<EditIcon />}
            />
          ) : (
            <button
              type="button"
              className={`row${ar ? ' ar' : ''}`}
              style={{ color: 'var(--olive-deep)', fontFamily: ar ? 'var(--font-arabic)' : undefined }}
              onClick={() => setPicking('b')}
            >
              <span style={{ flex: 1, textAlign: ar ? 'right' : 'left', fontSize: 14 }}>
                {t('pickPersonB', lang)}
              </span>
              <PlusIcon />
            </button>
          )}
        </div>

        {/* Result */}
        {result && lca && personA && personB && (
          <div className="surface" style={{ padding: 16, borderRadius: 10 }}>
            <div className={`section-eyebrow${ar ? ' ar' : ''}`} style={{ marginBottom: 10 }}>{t('result', lang)}</div>
            <RelDescription result={result} personA={personA} personB={personB} lca={lca} lang={lang} ar={ar} />
            <button
              type="button"
              className={`btn${ar ? ' ar' : ''}`}
              style={{ marginTop: 14, width: '100%' }}
              onClick={handleShowOnTree}
            >
              {t('showOnTree', lang)}
            </button>
          </div>
        )}

        {relAId && relBId && !result && (
          <div className="surface" style={{ padding: 16, borderRadius: 10 }}>
            <p style={{ margin: 0, fontSize: 13, color: 'var(--ink-faint)', fontFamily: ar ? 'var(--font-arabic)' : undefined, direction: ar ? 'rtl' : 'ltr' }}>
              {ar ? 'لا توجد صلة قرابة موثَّقة بين هذين الشخصين.' : 'No documented relationship found between these two people.'}
            </p>
          </div>
        )}

        {(relAId || relBId) && (
          <button
            type="button"
            className={`chip${ar ? ' ar' : ''}`}
            style={{ alignSelf: ar ? 'flex-end' : 'flex-start' }}
            onClick={() => { onSetRelAId(null); onSetRelBId(null) }}
          >
            {t('clear', lang)}
          </button>
        )}
      </div>
    </Sheet>
  )
}

function RelDescription({ result, personA, personB, lca, lang, ar }: {
  result: RelResult
  personA: Person
  personB: Person
  lca: Person
  lang: Lang
  ar: boolean
}) {
  const nameA = personFirst(personA, lang)
  const nameB = personFirst(personB, lang)
  const nameL = personFirst(lca, lang)

  if (personA.id === result.lca) {
    const deg = result.bSteps
    return (
      <p style={{ margin: 0, fontSize: 14, lineHeight: 1.7, fontFamily: ar ? 'var(--font-arabic)' : undefined, direction: ar ? 'rtl' : 'ltr' }}>
        {ar
          ? `${nameB} من نسل ${nameA} بفارق ${deg} جيل.`
          : `${nameB} is a descendant of ${nameA}, ${deg} generation${deg !== 1 ? 's' : ''} apart.`}
      </p>
    )
  }
  if (personB.id === result.lca) {
    const deg = result.aSteps
    return (
      <p style={{ margin: 0, fontSize: 14, lineHeight: 1.7, fontFamily: ar ? 'var(--font-arabic)' : undefined, direction: ar ? 'rtl' : 'ltr' }}>
        {ar
          ? `${nameA} من نسل ${nameB} بفارق ${deg} جيل.`
          : `${nameA} is a descendant of ${nameB}, ${deg} generation${deg !== 1 ? 's' : ''} apart.`}
      </p>
    )
  }
  return (
    <p style={{ margin: 0, fontSize: 14, lineHeight: 1.7, fontFamily: ar ? 'var(--font-arabic)' : undefined, direction: ar ? 'rtl' : 'ltr' }}>
      {ar
        ? `${nameA} و${nameB} ابنا عم. جدّهما المشترك ${nameL} (الجيل ${lca.gen}).`
        : `${nameA} and ${nameB} share a common ancestor: ${nameL} (Gen ${lca.gen}). ${nameA} is ${result.aSteps} step${result.aSteps !== 1 ? 's' : ''} away, ${nameB} is ${result.bSteps}.`}
    </p>
  )
}

function PlusIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 5v14"/><path d="M5 12h14"/>
    </svg>
  )
}

function EditIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--ink-faint)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
    </svg>
  )
}
