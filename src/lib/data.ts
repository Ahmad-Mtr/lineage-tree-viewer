import type { Person, KarajahData, RelResult, Stats } from './types'
import { DEFAULT_HONORIFIC } from './config'

function mkPerson(
  id: string, gen: number, fatherId: string | null,
  en: string, ar: string, firstEn: string, firstAr: string,
  born: number, died: number | null, placeEn: string, placeAr: string,
  opts: { bornCirca?: boolean; diedCirca?: boolean; verified?: boolean; bioEn?: string; bioAr?: string; sourcesEn?: string[] } = {}
): Person {
  return {
    id, gen, fatherId,
    nameEn: en, nameAr: ar, firstEn, firstAr,
    born, died,
    bornCirca: opts.bornCirca !== false,
    diedCirca: opts.diedCirca !== false && died !== null,
    placeEn, placeAr,
    verified: opts.verified !== false,
    honorific: DEFAULT_HONORIFIC,
    bioEn: opts.bioEn ?? '',
    bioAr: opts.bioAr ?? '',
    sourcesEn: opts.sourcesEn ?? [],
    monogramAr: firstAr[0],
    monogramEn: firstEn[0],
  }
}

const people: Person[] = [
  // Gen 1
  mkPerson('g1-1', 1, null, 'Karajah ibn Abdullah', 'كَرَجَة بن عبد الله', 'Karajah', 'كَرَجَة', 1480, 1545, 'Damascus', 'دمشق', {
    bioEn: 'The earliest documented ancestor of the Karajah family, recorded in a Mamluk-era Damascus tax register c. 1480. Family tradition traces his line to the Hijaz.',
    bioAr: 'أقدم جدّ موثّق لعائلة كَرَاجَة، ذُكر في سجلّ ضرائب دمشقي من العصر المملوكي حوالي 1480م.',
    sourcesEn: ['Damascus tax register (c. 1480)', 'Family oral chronicle'],
  }),

  // Gen 2
  mkPerson('g2-1', 2, 'g1-1', 'Ahmad ibn Karajah', 'أحمد بن كَرَاجَة', 'Ahmad', 'أحمد', 1510, 1578, 'Damascus', 'دمشق', {
    bioEn: 'Eldest known son of Karajah. Settled in Bab Sharqi quarter of Damascus.',
    bioAr: 'الابن الأكبر المعروف لكَرَجَة. سكن حي باب شرقي بدمشق.',
    sourcesEn: ['Ottoman waqf register, Damascus, 1567'],
  }),
  mkPerson('g2-2', 2, 'g1-1', 'Salim ibn Karajah', 'سليم بن كَرَاجَة', 'Salim', 'سليم', 1518, 1580, 'Jaffa', 'يافا', {
    bioEn: 'Believed to have moved south to coastal Palestine. The Jaffa branch traces its descent to him.',
    bioAr: 'يُعتقد أنه انتقل جنوباً إلى ساحل فلسطين.',
    verified: false,
  }),

  // Gen 3
  mkPerson('g3-1', 3, 'g2-1', 'Umar ibn Ahmad', 'عمر بن أحمد', 'Umar', 'عمر', 1545, 1612, 'Nablus', 'نابلس', {
    bioEn: 'Founded the Nablus branch in the late 16th century.',
    bioAr: 'أسّس فرع نابلس في أواخر القرن السادس عشر.',
    sourcesEn: ['Nablus sijill, 1612'],
  }),
  mkPerson('g3-2', 3, 'g2-1', 'Ibrahim ibn Ahmad', 'إبراهيم بن أحمد', 'Ibrahim', 'إبراهيم', 1550, 1620, 'Damascus', 'دمشق', {
    bioEn: 'Remained in Damascus; named in the same waqf register as his father.',
  }),
  mkPerson('g3-3', 3, 'g2-2', 'Mahmoud ibn Salim', 'محمود بن سليم', 'Mahmoud', 'محمود', 1555, 1630, 'Jaffa', 'يافا', {
    bioEn: 'First of the line documented in coastal Palestine.',
  }),
  mkPerson('g3-4', 3, 'g2-2', 'Hassan ibn Salim', 'حسن بن سليم', 'Hassan', 'حسن', 1560, null, 'Hebron', 'الخليل', {
    bioEn: 'Settled in Hebron; few records survive.', verified: false,
  }),

  // Gen 4
  mkPerson('g4-1', 4, 'g3-1', 'Yusuf ibn Umar', 'يوسف بن عمر', 'Yusuf', 'يوسف', 1580, 1650, 'Nablus', 'نابلس'),
  mkPerson('g4-2', 4, 'g3-1', 'Khalil ibn Umar', 'خليل بن عمر', 'Khalil', 'خليل', 1585, 1655, 'Nablus', 'نابلس'),
  mkPerson('g4-3', 4, 'g3-2', 'Said ibn Ibrahim', 'سعيد بن إبراهيم', 'Said', 'سعيد', 1590, 1660, 'Damascus', 'دمشق'),
  mkPerson('g4-4', 4, 'g3-3', 'Mustafa ibn Mahmoud', 'مصطفى بن محمود', 'Mustafa', 'مصطفى', 1595, 1668, 'Jaffa', 'يافا'),
  mkPerson('g4-5', 4, 'g3-3', 'Rashid ibn Mahmoud', 'رشيد بن محمود', 'Rashid', 'رشيد', 1600, null, 'Jaffa', 'يافا', { verified: false }),
  mkPerson('g4-6', 4, 'g3-4', 'Abdullah ibn Hassan', 'عبد الله بن حسن', 'Abdullah', 'عبد الله', 1605, 1680, 'Hebron', 'الخليل'),

  // Gen 5
  mkPerson('g5-1', 5, 'g4-1', 'Tayseer ibn Yusuf', 'تيسير بن يوسف', 'Tayseer', 'تيسير', 1620, 1695, 'Nablus', 'نابلس'),
  mkPerson('g5-2', 5, 'g4-1', 'Murad ibn Yusuf', 'مراد بن يوسف', 'Murad', 'مراد', 1625, 1700, 'Nablus', 'نابلس'),
  mkPerson('g5-3', 5, 'g4-2', 'Mohammed ibn Khalil', 'محمد بن خليل', 'Mohammed', 'محمد', 1630, 1705, 'Acre', 'عكّا'),
  mkPerson('g5-4', 5, 'g4-3', 'Issa ibn Said', 'عيسى بن سعيد', 'Issa', 'عيسى', 1635, 1715, 'Damascus', 'دمشق'),
  mkPerson('g5-5', 5, 'g4-4', 'Ali ibn Mustafa', 'علي بن مصطفى', 'Ali', 'علي', 1640, 1718, 'Jaffa', 'يافا'),
  mkPerson('g5-6', 5, 'g4-5', 'Khaled ibn Rashid', 'خالد بن رشيد', 'Khaled', 'خالد', 1645, 1720, 'Jerusalem', 'القدس'),
  mkPerson('g5-7', 5, 'g4-6', 'Othman ibn Abdullah', 'عثمان بن عبد الله', 'Othman', 'عثمان', 1650, 1725, 'Hebron', 'الخليل'),
  mkPerson('g5-8', 5, 'g4-6', 'Mansour ibn Abdullah', 'منصور بن عبد الله', 'Mansour', 'منصور', 1655, null, 'Hebron', 'الخليل', { verified: false }),

  // Gen 6
  mkPerson('g6-1', 6, 'g5-1', 'Adel ibn Tayseer', 'عادل بن تيسير', 'Adel', 'عادل', 1660, 1735, 'Nablus', 'نابلس'),
  mkPerson('g6-2', 6, 'g5-1', 'Bashir ibn Tayseer', 'بشير بن تيسير', 'Bashir', 'بشير', 1665, 1738, 'Nablus', 'نابلس'),
  mkPerson('g6-3', 6, 'g5-2', 'Dawood ibn Murad', 'داوود بن مراد', 'Dawood', 'داوود', 1670, 1742, 'Nablus', 'نابلس'),
  mkPerson('g6-4', 6, 'g5-3', 'Fuad ibn Mohammed', 'فؤاد بن محمد', 'Fuad', 'فؤاد', 1672, 1745, 'Acre', 'عكّا'),
  mkPerson('g6-5', 6, 'g5-4', 'Ghassan ibn Issa', 'غسّان بن عيسى', 'Ghassan', 'غسّان', 1678, 1748, 'Damascus', 'دمشق'),
  mkPerson('g6-6', 6, 'g5-5', 'Hisham ibn Ali', 'هشام بن علي', 'Hisham', 'هشام', 1683, 1752, 'Jaffa', 'يافا'),
  mkPerson('g6-7', 6, 'g5-6', 'Jamal ibn Khaled', 'جمال بن خالد', 'Jamal', 'جمال', 1685, 1755, 'Jerusalem', 'القدس'),
  mkPerson('g6-8', 6, 'g5-7', 'Kamal ibn Othman', 'كمال بن عثمان', 'Kamal', 'كمال', 1690, 1762, 'Hebron', 'الخليل'),

  // Gen 7
  mkPerson('g7-1', 7, 'g6-1', 'Nabil ibn Adel', 'نبيل بن عادل', 'Nabil', 'نبيل', 1700, 1772, 'Nablus', 'نابلس'),
  mkPerson('g7-2', 7, 'g6-1', 'Omar ibn Adel', 'عمر بن عادل', 'Omar', 'عمر', 1705, 1775, 'Nablus', 'نابلس'),
  mkPerson('g7-3', 7, 'g6-2', 'Qasim ibn Bashir', 'قاسم بن بشير', 'Qasim', 'قاسم', 1710, 1780, 'Nablus', 'نابلس'),
  mkPerson('g7-4', 7, 'g6-3', 'Rami ibn Dawood', 'رامي بن داوود', 'Rami', 'رامي', 1715, 1785, 'Nablus', 'نابلس'),
  mkPerson('g7-5', 7, 'g6-4', 'Sami ibn Fuad', 'سامي بن فؤاد', 'Sami', 'سامي', 1718, 1790, 'Acre', 'عكّا'),
  mkPerson('g7-6', 7, 'g6-5', 'Tariq ibn Ghassan', 'طارق بن غسّان', 'Tariq', 'طارق', 1722, 1792, 'Damascus', 'دمشق'),
  mkPerson('g7-7', 7, 'g6-6', 'Wael ibn Hisham', 'وائل بن هشام', 'Wael', 'وائل', 1725, 1795, 'Jaffa', 'يافا'),
  mkPerson('g7-8', 7, 'g6-7', 'Ziad ibn Jamal', 'زياد بن جمال', 'Ziad', 'زياد', 1730, null, 'Jerusalem', 'القدس', { verified: false }),

  // Gen 8
  mkPerson('g8-1', 8, 'g7-1', 'Anis ibn Nabil', 'أنيس بن نبيل', 'Anis', 'أنيس', 1745, 1820, 'Nablus', 'نابلس'),
  mkPerson('g8-2', 8, 'g7-2', 'Basem ibn Omar', 'باسم بن عمر', 'Basem', 'باسم', 1748, 1822, 'Jaffa', 'يافا'),
  mkPerson('g8-3', 8, 'g7-4', 'Faris ibn Rami', 'فارس بن رامي', 'Faris', 'فارس', 1755, 1828, 'Nablus', 'نابلس'),
  mkPerson('g8-4', 8, 'g7-5', 'Hadi ibn Sami', 'هادي بن سامي', 'Hadi', 'هادي', 1758, 1830, 'Acre', 'عكّا'),
  mkPerson('g8-5', 8, 'g7-6', 'Jalal ibn Tariq', 'جلال بن طارق', 'Jalal', 'جلال', 1762, 1835, 'Damascus', 'دمشق'),
  mkPerson('g8-6', 8, 'g7-7', 'Marwan ibn Wael', 'مروان بن وائل', 'Marwan', 'مروان', 1768, 1840, 'Jaffa', 'يافا'),
]

const byId: Record<string, Person> = Object.fromEntries(people.map(p => [p.id, p]))

const childrenOf: Record<string, string[]> = Object.fromEntries(people.map(p => [p.id, [] as string[]]))
people.forEach(p => { if (p.fatherId) childrenOf[p.fatherId].push(p.id) })

const byGen: Record<number, Person[]> = {}
people.forEach(p => { (byGen[p.gen] ??= []).push(p) })
const generations = Object.keys(byGen).map(Number).sort((a, b) => a - b)

function ancestors(id: string): string[] {
  const out: string[] = []
  let cur: Person | undefined = byId[id]
  while (cur) { out.push(cur.id); cur = cur.fatherId ? byId[cur.fatherId] : undefined }
  return out
}

function relationship(aId: string, bId: string): RelResult | null {
  if (!byId[aId] || !byId[bId]) return null
  const aAnc = ancestors(aId)
  const bAnc = ancestors(bId)
  const bSet = new Set(bAnc)
  let lca: string | null = null
  for (const x of aAnc) { if (bSet.has(x)) { lca = x; break } }
  if (!lca) return null
  const aPath = aAnc.slice(0, aAnc.indexOf(lca) + 1)
  const bPath = bAnc.slice(0, bAnc.indexOf(lca) + 1)
  return { lca, aPath, bPath, aSteps: aPath.length - 1, bSteps: bPath.length - 1 }
}

function descendantCount(id: string): number {
  let n = 1
  for (const c of childrenOf[id]) n += descendantCount(c)
  return n
}

function topBranches(atGen = 2) {
  return (byGen[atGen] ?? [])
    .map(p => ({ p, count: descendantCount(p.id) }))
    .sort((a, b) => b.count - a.count)
}

function stats(): Stats {
  const total = people.length
  const generationCount = generations.length
  const perGen = generations.map(g => ({ gen: g, count: byGen[g].length }))
  const fathers = people.filter(p => childrenOf[p.id].length > 0)
  const avgChildren = fathers.length
    ? fathers.reduce((s, p) => s + childrenOf[p.id].length, 0) / fathers.length
    : 0
  const verified = people.filter(p => p.verified).length
  return {
    total, generationCount, perGen, avgChildren,
    fathersCount: fathers.length, verified,
    earliestBorn: Math.min(...people.map(p => p.born)),
    latestBorn: Math.max(...people.map(p => p.born)),
  }
}

export const data: KarajahData = {
  people, byId, byGen, generations, childrenOf,
  ancestors, relationship, descendantCount, topBranches, stats,
  root: people.find(p => p.fatherId === null)!,
}
