// ── App identity ──────────────────────────────────────────────────────────
export const APP_TITLE = {
  en: "Nasser Karajah Tree",
  ar: " حمولة ناصر كَرَاجَة",
} as const

export const APP_SUBTITLE = {
  en: '',
  ar: '',
} as const

// Shown in person cards for deceased individuals
export const DEFAULT_HONORIFIC = 'رحمه الله'

// ── Color palettes ───────────────────────────────────────────────────────────
// One color per generation, darkest → lightest.
export const PALETTES = {
  olive: ['#3D4419', '#4A5226', '#6F7D3F', '#8E9C5B', '#A8B377', '#BFC793', '#D2D8B0', '#E3E7CC'],
  warm:  ['#5C2E1A', '#7A4A29', '#A06A3E', '#B8593A', '#C4923A', '#D2A85E', '#DFB985', '#E8CFA8'],
  cool:  ['#1F3B3A', '#2F5957', '#3D7873', '#5A9590', '#7AAFAA', '#9DC6C2', '#BCD8D5', '#D8E6E3'],
  mono:  ['#1B1814', '#3A332B', '#5E574A', '#7E7563', '#9C927E', '#B6AC95', '#CFC6AC', '#E2DCC4'],
} as const

export type Palette = keyof typeof PALETTES

// ── Sidebar about text ────────────────────────────────────────────────────────
export const ABOUT_TEXT = {
  en: "A family archive based on Dr. Salah Al-Houdlieh's book “Nasab ʿAshiret Al-Amir Muhammad Karajah fi Qaryat Safa”, which traced the family line, and Nashat Mahmoud Matar's work on documenting the newer generations.",
  ar: "أرشيف عائلي يستند إلى كتاب الدكتور صلاح الهودلية «نسب عشيرة الأمير محمد قراجة في قرية صفا» الذي تتبّع جميع من هنا، وإلى جهد نشأت محمود مطر في تتبّع الأجيال الجديدة.",
} as const

// ── Defaults ──────────────────────────────────────────────────────────────────
export const DEFAULT_LANG = 'ar' as const
export const DEFAULT_PALETTE: Palette = 'olive'
