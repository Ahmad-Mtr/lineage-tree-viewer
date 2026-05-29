import { PALETTES } from './config'
import type { Palette } from './config'

export { PALETTES }

export function genColor(gen: number, palette: Palette = 'olive'): string {
  const pal = PALETTES[palette] ?? PALETTES.olive
  return pal[Math.min(Math.max(gen - 1, 0), pal.length - 1)]
}
