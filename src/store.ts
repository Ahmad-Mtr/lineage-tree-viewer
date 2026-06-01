import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Lang, TreeLayout, Palette, FilterMode, SheetName } from '@/lib/types'
import { DEFAULT_LANG, DEFAULT_PALETTE } from '@/lib/config'

export type ColorTheme = 'light' | 'dark' | 'system'

interface AppState {
  lang: Lang
  theme: ColorTheme
  layout: TreeLayout
  palette: Palette
  showGenLegend: boolean
  selectedId: string | null
  collapsed: Set<string>
  filterMode: FilterMode
  genSingle: number
  genRange: [number, number]
  highlightPath: Set<string> | null
  openSheet: SheetName
  relAId: string | null
  relBId: string | null
  subtreeRoot: string | null

  setTheme: (t: ColorTheme) => void
  setLang: (l: Lang) => void
  toggleLang: () => void
  setLayout: (l: TreeLayout) => void
  setPalette: (p: Palette) => void
  toggleGenLegend: () => void
  setSelectedId: (id: string | null) => void
  openPerson: (id: string) => void
  toggleCollapse: (id: string) => void
  setFilterMode: (m: FilterMode) => void
  setGenSingle: (g: number) => void
  setGenRange: (r: [number, number]) => void
  setHighlightPath: (path: Set<string> | null) => void
  clearHighlight: () => void
  setOpenSheet: (s: SheetName) => void
  setRelAId: (id: string | null) => void
  setRelBId: (id: string | null) => void
  setSubtreeRoot: (id: string | null) => void
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      lang: DEFAULT_LANG,
      theme: 'system' as ColorTheme,
      layout: "tidy",
      palette: DEFAULT_PALETTE,
      showGenLegend: false,
      selectedId: null,
      collapsed: new Set(),
      filterMode: "all",
      genSingle: 1,
      genRange: [1, 8],
      highlightPath: null,
      openSheet: null,
      relAId: null,
      relBId: null,
      subtreeRoot: null,

      setTheme: (theme) => set({ theme }),
      setLang: (lang) => set({ lang }),
      toggleLang: () => set((s) => ({ lang: s.lang === "ar" ? "en" : "ar" })),
      setLayout: (layout) => set({ layout }),
      setPalette: (palette) => set({ palette }),
      toggleGenLegend: () => set((s) => ({ showGenLegend: !s.showGenLegend })),
      setSelectedId: (selectedId) => set({ selectedId }),
      openPerson: (id) => set({ selectedId: id, openSheet: "person" }),
      toggleCollapse: (id) =>
        set((s) => {
          const next = new Set(s.collapsed)
          if (next.has(id)) next.delete(id)
          else next.add(id)
          return { collapsed: next }
        }),
      setFilterMode: (filterMode) => set({ filterMode }),
      setGenSingle: (genSingle) => set({ genSingle }),
      setGenRange: (genRange) => set({ genRange }),
      setHighlightPath: (highlightPath) => set({ highlightPath }),
      clearHighlight: () => set({ highlightPath: null }),
      setOpenSheet: (openSheet) => set({ openSheet }),
      setRelAId: (relAId) => set({ relAId }),
      setRelBId: (relBId) => set({ relBId }),
      setSubtreeRoot: (subtreeRoot) => set({ subtreeRoot }),
    }),
    {
      name: "karajah-prefs",
      partialize: (s) => ({ lang: s.lang, theme: s.theme, palette: s.palette }),
    }
  )
)
