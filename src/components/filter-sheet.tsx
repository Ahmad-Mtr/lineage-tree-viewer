import type { Lang, FilterMode, Palette } from '@/lib/types'
import { data } from '@/lib/data'
import { t } from '@/lib/i18n'
import { genColor } from '@/lib/palettes'
import { Sheet } from './sheet'

interface FilterSheetProps {
  open: boolean
  onClose: () => void
  lang: Lang
  filterMode: FilterMode
  genSingle: number
  genRange: [number, number]
  palette: Palette
  onSetFilterMode: (m: FilterMode) => void
  onSetGenSingle: (g: number) => void
  onSetGenRange: (r: [number, number]) => void
  onSetPalette: (p: Palette) => void
}

const PALETTE_NAMES: Record<Palette, { en: string; ar: string }> = {
  olive: { en: 'Olive', ar: 'زيتوني' },
  warm: { en: 'Warm', ar: 'دافئ' },
  cool: { en: 'Cool', ar: 'بارد' },
  mono: { en: 'Mono', ar: 'أحادي' },
}

export function FilterSheet({
  open, onClose, lang, filterMode, genSingle, genRange, palette,
  onSetFilterMode, onSetGenSingle, onSetGenRange, onSetPalette,
}: FilterSheetProps) {
  const ar = lang === 'ar'
  const gens = data.generations

  return (
    <Sheet open={open} onClose={onClose} title={t('filters', lang)} lang={lang}>
      <div style={{ padding: '0 16px 24px', display: 'flex', flexDirection: 'column', gap: 24 }}>

        {/* Generation filter mode */}
        <section>
          <div className={`section-eyebrow${ar ? ' ar' : ''}`}>{t('generation', lang)}</div>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 10 }}>
            {(['all', 'single', 'range'] as FilterMode[]).map(mode => (
              <button
                key={mode}
                type="button"
                className={`chip${filterMode === mode ? ' is-active' : ''}`}
                onClick={() => onSetFilterMode(mode)}
              >
                {mode === 'all' ? (ar ? 'الكل' : 'All') : mode === 'single' ? t('generationSingle', lang) : t('generationRange', lang)}
              </button>
            ))}
          </div>

          {filterMode === 'single' && (
            <div style={{ marginTop: 14, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {gens.map(g => (
                <button
                  key={g}
                  type="button"
                  className={`chip${genSingle === g ? ' is-active' : ''}`}
                  style={{ gap: 6 }}
                  onClick={() => onSetGenSingle(g)}
                >
                  <span style={{ width: 8, height: 8, borderRadius: '50%', background: genColor(g, palette), display: 'inline-block', flexShrink: 0 }} />
                  {ar ? `الجيل ${g}` : `Gen ${g}`}
                </button>
              ))}
            </div>
          )}

          {filterMode === 'range' && (
            <div style={{ marginTop: 14 }}>
              <RangeSlider
                min={gens[0]}
                max={gens[gens.length - 1]}
                value={genRange}
                onChange={onSetGenRange}
                ar={ar}
                palette={palette}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6, color: 'var(--ink-faint)', fontSize: 12 }}>
                <span>{ar ? `الجيل ${genRange[0]}` : `Gen ${genRange[0]}`}</span>
                <span>{ar ? `الجيل ${genRange[1]}` : `Gen ${genRange[1]}`}</span>
              </div>
            </div>
          )}
        </section>

        {/* Palette picker */}
        <section>
          <div className={`section-eyebrow${ar ? ' ar' : ''}`}>{ar ? 'لوحة الألوان' : 'Color palette'}</div>
          <div style={{ display: 'flex', gap: 8, marginTop: 10, flexWrap: 'wrap' }}>
            {(Object.keys(PALETTE_NAMES) as Palette[]).map(p => (
              <button
                key={p}
                type="button"
                className={`chip${palette === p ? ' is-active' : ''}`}
                style={{ gap: 8 }}
                onClick={() => onSetPalette(p)}
              >
                <span style={{ display: 'flex', gap: 2 }}>
                  {[1, 3, 5].map(g => (
                    <span key={g} style={{ width: 6, height: 6, borderRadius: '50%', background: genColor(g, p), display: 'inline-block' }} />
                  ))}
                </span>
                {ar ? PALETTE_NAMES[p].ar : PALETTE_NAMES[p].en}
              </button>
            ))}
          </div>
        </section>
      </div>
    </Sheet>
  )
}

function RangeSlider({
  min, max, value, onChange, palette
}: {
  min: number; max: number; value: [number, number]; onChange: (v: [number, number]) => void; ar: boolean; palette: Palette
}) {
  const range = max - min
  const lowPct = ((value[0] - min) / range) * 100
  const highPct = ((value[1] - min) / range) * 100

  return (
    <div className="range-track" style={{ position: 'relative', height: 32, display: 'flex', alignItems: 'center' }}>
      <div style={{
        position: 'absolute', left: 0, right: 0, height: 4,
        background: `linear-gradient(to right, var(--ink-faint) ${lowPct}%, ${genColor(value[0], palette)} ${lowPct}%, ${genColor(value[1], palette)} ${highPct}%, var(--ink-faint) ${highPct}%)`,
        borderRadius: 2,
      }} />
      <input
        type="range" min={min} max={max} value={value[0]}
        style={{ position: 'absolute', width: '100%', zIndex: 2 }}
        onChange={e => {
          const v = Number(e.target.value)
          if (v <= value[1]) onChange([v, value[1]])
        }}
      />
      <input
        type="range" min={min} max={max} value={value[1]}
        style={{ position: 'absolute', width: '100%', zIndex: 2 }}
        onChange={e => {
          const v = Number(e.target.value)
          if (v >= value[0]) onChange([value[0], v])
        }}
      />
    </div>
  )
}
