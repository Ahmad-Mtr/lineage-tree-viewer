import type { Palette } from './types'

export const PALETTES: Record<Palette, string[]> = {
  olive: ['#3D4419','#4A5226','#6F7D3F','#8E9C5B','#A8B377','#BFC793','#D2D8B0','#E3E7CC'],
  warm:  ['#5C2E1A','#7A4A29','#A06A3E','#B8593A','#C4923A','#D2A85E','#DFB985','#E8CFA8'],
  cool:  ['#1F3B3A','#2F5957','#3D7873','#5A9590','#7AAFAA','#9DC6C2','#BCD8D5','#D8E6E3'],
  mono:  ['#1B1814','#3A332B','#5E574A','#7E7563','#9C927E','#B6AC95','#CFC6AC','#E2DCC4'],
}

export function genColor(gen: number, palette: Palette = 'olive'): string {
  const pal = PALETTES[palette] ?? PALETTES.olive
  return pal[Math.min(Math.max(gen - 1, 0), pal.length - 1)]
}
