import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useCallback, useState, useMemo } from 'react'
import { useAppStore } from '@/store'
import { data, getSubtree } from '@/lib/data'
import { t, APP_TITLE_AR, APP_TITLE_EN, APP_SUB_AR, APP_SUB_EN } from '@/lib/i18n'
import {
  Combobox, ComboboxInput, ComboboxContent,
  ComboboxList, ComboboxItem,
} from '@/components/ui/combobox'

import { TopBar } from '@/components/top-bar'
import { GenLegend } from '@/components/gen-legend'
import { TreeView } from '@/components/tree-view'
import { Drawer } from '@/components/drawer'
import { SearchSheet } from '@/components/search-sheet'
import { FilterSheet } from '@/components/filter-sheet'
import { PersonSheet } from '@/components/person-sheet'
import { RelationSheet } from '@/components/relation-sheet'
import { StatsSheet } from '@/components/stats-sheet'

export const Route = createFileRoute('/')({ component: App })

const LAYOUTS = ['tidy', 'columns', 'radial'] as const

const TREE_OPTIONS = [
  { value: 'all',  ar: 'الكل',         en: 'All' },
  { value: 'g2-1', ar: 'مصطفى (ج٢)',  en: 'Mustafa (G2)' },
  { value: 'g4-4', ar: 'مطر (ج٤)',     en: 'Matar (G4)' },
] as const

function App() {
  const {
    lang, theme, layout, palette, showGenLegend,
    selectedId, collapsed, highlightPath,
    filterMode, genSingle, genRange,
    openSheet,
    relAId, relBId,
    subtreeRoot,
    toggleLang, setLayout, setPalette, setTheme,
    openPerson, toggleCollapse, setHighlightPath,
    setFilterMode, setGenSingle, setGenRange,
    setOpenSheet, setRelAId, setRelBId,
    toggleGenLegend, setSubtreeRoot,
  } = useAppStore()

  const displayData = useMemo(
    () => subtreeRoot ? getSubtree(subtreeRoot) : data,
    [subtreeRoot]
  )

  const ar = lang === 'ar'

  const [mounted, setMounted] = useState(false)
  useEffect(() => { setMounted(true) }, [])

  // Sync <html> lang + dir when language changes
  useEffect(() => {
    document.documentElement.lang = lang
    document.documentElement.dir = ar ? 'rtl' : 'ltr'
  }, [lang, ar])

  // Sync <html> dark class with theme setting
  useEffect(() => {
    const root = document.documentElement
    if (theme === 'dark') {
      root.classList.add('dark')
      return
    }
    if (theme === 'light') {
      root.classList.remove('dark')
      return
    }
    // system
    const mq = window.matchMedia('(prefers-color-scheme: dark)')
    const apply = (e: MediaQueryList | MediaQueryListEvent) => root.classList.toggle('dark', e.matches)
    apply(mq)
    mq.addEventListener('change', apply)
    return () => mq.removeEventListener('change', apply)
  }, [theme])

  const handleOpenSheet = useCallback((name: 'search' | 'filter' | 'relate' | 'stats') => {
    setOpenSheet(name)
  }, [setOpenSheet])

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpenSheet(openSheet === 'search' ? null : 'search')
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [openSheet, setOpenSheet])

  const handleSelectPerson = useCallback((id: string) => {
    openPerson(id)
  }, [openPerson])

  const activeGens = (() => {
    if (filterMode === 'single') return new Set([genSingle])
    if (filterMode === 'range') {
      const s = new Set<number>()
      for (let g = genRange[0]; g <= genRange[1]; g++) s.add(g)
      return s
    }
    return null
  })()

  return (
    <div className="app-shell">
      <div className="app-stage">
        <TopBar
          title={ar ? APP_TITLE_AR : APP_TITLE_EN}
          subtitle={ar ? APP_SUB_AR : APP_SUB_EN}
          lang={lang}
          onMenu={() => setOpenSheet('menu')}
          onSearch={() => setOpenSheet('search')}
        />

        {/* Layout + controls strip */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 6,
          padding: '8px 16px', flexWrap: 'wrap',
          borderBottom: '1px solid var(--border)',
        }}>
          <div style={{ display: 'flex', gap: 4 }}>
            {LAYOUTS.map(l => (
              <button
                key={l}
                type="button"
                className={`chip${layout === l ? ' is-active' : ''}${ar ? ' ar' : ''}`}
                onClick={() => setLayout(l)}
              >
                {l === 'tidy' ? t('layoutOrgChart', lang)
                  : l === 'columns' ? t('layoutColumns', lang)
                  : t('layoutRadial', lang)}
              </button>
            ))}
          </div>
          <div style={{ flex: 1 }} />

          {/* Subtree selector */}
          <Combobox
            value={subtreeRoot ?? 'all'}
            onValueChange={(v) => setSubtreeRoot(!v || v === 'all' ? null : v)}
          >
            <ComboboxInput readOnly showClear={false} className="h-7 w-36 text-xs" />
            <ComboboxContent>
              <ComboboxList>
                {TREE_OPTIONS.map(o => (
                  <ComboboxItem key={o.value} value={o.value}>
                    {ar ? o.ar : o.en}
                  </ComboboxItem>
                ))}
              </ComboboxList>
            </ComboboxContent>
          </Combobox>

          <button
            type="button"
            className={`chip${ar ? ' ar' : ''}`}
            onClick={() => setOpenSheet('filter')}
          >
            <FilterIcon />
            {t('filter', lang)}
          </button>
          <button
            type="button"
            className={`chip${ar ? ' ar' : ''}`}
            onClick={toggleGenLegend}
            style={{ opacity: showGenLegend ? 1 : 0.55 }}
          >
            <LayersIcon />
          </button>
        </div>

        {/* Gen legend */}
        {showGenLegend && (
          <div style={{ padding: '8px 16px', borderBottom: '1px solid var(--border)' }}>
            <GenLegend
              palette={palette}
              generations={displayData.generations}
              lang={lang}
              activeGens={activeGens}
              onToggle={(g) => {
                if (filterMode === 'single' && genSingle === g) {
                  setFilterMode('all')
                } else {
                  setFilterMode('single')
                  setGenSingle(g)
                }
              }}
            />
          </div>
        )}

        {/* Tree — position:relative already in .tree-stage CSS; absolute child gives React Flow concrete dimensions */}
        <div className="tree-stage" style={{ flex: 1, minHeight: 400 }}>
          {highlightPath && (
            <div className={`tree-hint${ar ? ' ar' : ''}`} style={{ zIndex: 6 }}>
              {ar ? 'النسب موضَّح على الشجرة' : 'Relationship shown on tree'}
              <button
                type="button"
                style={{ all: 'unset', cursor: 'pointer', marginInlineStart: 8, color: 'var(--olive-deep)', fontSize: 11 }}
                onClick={() => setHighlightPath(null)}
              >
                {t('clear', lang)}
              </button>
            </div>
          )}
          <div style={{ position: 'absolute', inset: 0 }}>
            {mounted && (
              <TreeView
                data={displayData}
                lang={lang}
                layout={layout}
                palette={palette}
                selectedId={selectedId}
                highlightPath={highlightPath}
                collapsed={collapsed}
                filterMode={filterMode}
                genSingle={genSingle}
                genRange={genRange}
                onSelect={handleSelectPerson}
                onToggleCollapse={toggleCollapse}
              />
            )}
          </div>
        </div>
      </div>

      {/* Drawer */}
      <Drawer
        open={openSheet === 'menu'}
        onClose={() => setOpenSheet(null)}
        lang={lang}
        theme={theme}
        onOpenSheet={handleOpenSheet}
        onToggleLang={toggleLang}
        onSetTheme={setTheme}
      />

      {/* Sheets */}
      <SearchSheet
        open={openSheet === 'search'}
        onClose={() => setOpenSheet(null)}
        lang={lang}
        onSelectPerson={handleSelectPerson}
      />

      <FilterSheet
        open={openSheet === 'filter'}
        onClose={() => setOpenSheet(null)}
        lang={lang}
        filterMode={filterMode}
        genSingle={genSingle}
        genRange={genRange}
        palette={palette}
        onSetFilterMode={setFilterMode}
        onSetGenSingle={setGenSingle}
        onSetGenRange={setGenRange}
        onSetPalette={setPalette}
      />

      <PersonSheet
        open={openSheet === 'person'}
        onClose={() => setOpenSheet(null)}
        lang={lang}
        personId={selectedId}
        palette={palette}
        onSelectPerson={handleSelectPerson}
      />

      <RelationSheet
        open={openSheet === 'relate'}
        onClose={() => setOpenSheet(null)}
        lang={lang}
        relAId={relAId}
        relBId={relBId}
        onSetRelAId={setRelAId}
        onSetRelBId={setRelBId}
        onShowOnTree={(path) => setHighlightPath(path)}
      />

      <StatsSheet
        open={openSheet === 'stats'}
        onClose={() => setOpenSheet(null)}
        lang={lang}
        palette={palette}
        data={displayData}
      />
    </div>
  )
}

function FilterIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 6h16"/><path d="M7 12h10"/><path d="M10 18h4"/>
    </svg>
  )
}

function LayersIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="m12 2 10 6.5-10 6.5L2 8.5z"/><path d="m2 15.5 10 6.5 10-6.5"/><path d="m2 12 10 6.5 10-6.5"/>
    </svg>
  )
}
