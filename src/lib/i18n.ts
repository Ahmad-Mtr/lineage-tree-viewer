import type { Lang, Person } from './types'

const strings = {
  appTitleEn: 'The Karajah lineage',
  appTitleAr: 'سلسلة آل كَرَاجَة',
  appSubEn: 'A patrilineal family tree',
  appSubAr: 'شجرة العائلة من جهة الأب',

  tree:               { en: 'The tree',          ar: 'الشجرة' },
  search:             { en: 'Search',             ar: 'بحث' },
  filter:             { en: 'Filter',             ar: 'تصفية' },
  filters:            { en: 'Filters',            ar: 'التصفية' },
  generation:         { en: 'Generation',         ar: 'الجيل' },
  generations:        { en: 'Generations',        ar: 'الأجيال' },
  generationRange:    { en: 'Generation range',   ar: 'نطاق الأجيال' },
  generationSingle:   { en: 'Single generation',  ar: 'جيل واحد' },
  stats:              { en: 'Statistics',          ar: 'الإحصاءات' },
  relationship:       { en: 'Relationship',        ar: 'صلة القرابة' },
  relationshipShort:  { en: 'How are they related?', ar: 'ما صلة القرابة؟' },
  pickPersonA:        { en: 'Pick the first person',  ar: 'اختر الشخص الأول' },
  pickPersonB:        { en: 'Pick the second person', ar: 'اختر الشخص الثاني' },
  result:             { en: 'Result',              ar: 'النتيجة' },
  showOnTree:         { en: 'Show on the tree',   ar: 'إظهار في الشجرة' },
  clear:              { en: 'Clear',               ar: 'مسح' },
  reset:              { en: 'Reset',               ar: 'إعادة ضبط' },
  apply:              { en: 'Apply',               ar: 'تطبيق' },
  close:              { en: 'Close',               ar: 'إغلاق' },
  back:               { en: 'Back',                ar: 'رجوع' },
  menu:               { en: 'Menu',                ar: 'القائمة' },
  born:               { en: 'Born',                ar: 'وُلد' },
  died:               { en: 'Died',                ar: 'توفّي' },
  place:              { en: 'Place',               ar: 'المكان' },
  father:             { en: 'Father',              ar: 'الأب' },
  sons:               { en: 'Sons',                ar: 'الأبناء' },
  noSons:             { en: 'No recorded sons',    ar: 'لا أبناء مسجَّلون' },
  ancestors:          { en: 'Lineage to root',     ar: 'النسب حتى الجذر' },
  verified:           { en: 'verified',            ar: 'موثّق' },
  unverified:         { en: 'unverified',          ar: 'غير موثّق' },
  noMatches:          { en: 'No matches. Try a partial name or a place.', ar: 'لا توجد نتائج. جرّب جزءاً من الاسم أو اسم بلدة.' },
  totalRecorded:      { en: 'People recorded',     ar: 'الأشخاص المسجَّلون' },
  generationsCount:   { en: 'Generations documented', ar: 'الأجيال الموثَّقة' },
  avgChildren:        { en: 'Avg sons per father', ar: 'متوسّط الأبناء لكل أب' },
  largestBranches:    { en: 'Largest branches',    ar: 'أكبر الفروع' },
  descendants:        { en: 'descendants',         ar: 'من النسل' },
  verifiedShare:      { en: 'Verified records',    ar: 'السجلات الموثَّقة' },
  layoutOrgChart:     { en: 'Org chart',           ar: 'مخطّط هرمي' },
  layoutColumns:      { en: 'Columns',             ar: 'أعمدة' },
  layoutRadial:       { en: 'Radial',              ar: 'دائري' },
  centerOnTree:       { en: 'Center on tree',      ar: 'إظهار في الشجرة' },
  about:              { en: 'About',               ar: 'عن المشروع' },
} as const

export function t(key: keyof typeof strings, lang: Lang): string {
  const v = strings[key]
  if (typeof v === 'string') return v
  return v[lang]
}

export function personName(p: Person, lang: Lang) {
  return lang === 'ar' ? p.nameAr : p.nameEn
}

export function personFirst(p: Person, lang: Lang) {
  return lang === 'ar' ? p.firstAr : p.firstEn
}

export function personPlace(p: Person, lang: Lang) {
  return lang === 'ar' ? p.placeAr : p.placeEn
}

export function lifespan(p: Person, lang: Lang) {
  const circa = (year: number, isCirca: boolean) =>
    isCirca ? (lang === 'ar' ? `${year} تقريباً` : `c. ${year}`) : `${year}`
  const left = circa(p.born, p.bornCirca)
  const right = p.died != null ? circa(p.died, p.diedCirca) : (lang === 'ar' ? '؟' : '?')
  return `${left}–${right}`
}

export const APP_TITLE_AR = strings.appTitleAr
export const APP_TITLE_EN = strings.appTitleEn
export const APP_SUB_AR = strings.appSubAr
export const APP_SUB_EN = strings.appSubEn
