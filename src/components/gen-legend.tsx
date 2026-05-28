import type { Lang, Palette } from '@/lib/types'
import { genColor } from '@/lib/palettes'

interface GenLegendProps {
  palette: Palette
  generations: number[]
  lang: Lang
  activeGens: Set<number> | null
  onToggle: (g: number) => void
}

export function GenLegend({ palette, generations, lang, activeGens, onToggle }: GenLegendProps) {
  const ar = lang === 'ar'
  return (
    <div className="gen-legend">
      {generations.map(g => {
        const dim = activeGens != null && !activeGens.has(g)
        return (
          <button
            key={g}
            type="button"
            className={`gen-swatch${dim ? ' is-dim' : ''}`}
            onClick={() => onToggle(g)}
          >
            <span className="gen-swatch__dot" style={{ background: genColor(g, palette) }} />
            <span>{ar ? `الجيل ${g}` : `Gen ${g}`}</span>
          </button>
        )
      })}
    </div>
  )
}
