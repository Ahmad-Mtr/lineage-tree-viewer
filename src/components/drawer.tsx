import { useEffect } from 'react'
import type { Lang } from '@/lib/types'
import { APP_TITLE_AR, APP_TITLE_EN, APP_SUB_AR, APP_SUB_EN } from '@/lib/i18n'
import { ABOUT_TEXT } from '@/lib/config'

interface DrawerProps {
  open: boolean
  onClose: () => void
  lang: Lang
  onOpenSheet: (name: 'search' | 'filter' | 'relate' | 'stats') => void
  onToggleLang: () => void
}

export function Drawer({ open, onClose, lang, onOpenSheet, onToggleLang }: DrawerProps) {
  const ar = lang === 'ar'

  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = prev }
  }, [open])

  const items = [
    { id: 'search' as const, label: ar ? 'بحث' : 'Search', Icon: SearchIcon },
    { id: 'filter' as const, label: ar ? 'تصفية' : 'Filter', Icon: FilterIcon },
    { id: 'relate' as const, label: ar ? 'صلة القرابة' : 'Relationship', Icon: LinkIcon },
    { id: 'stats' as const, label: ar ? 'الإحصاءات' : 'Statistics', Icon: ChartIcon },
  ]

  return (
    <>
      <div className={`scrim${open ? ' is-open' : ''}`} onClick={onClose} />
      <aside className={`drawer${open ? ' is-open' : ''}`} aria-label={ar ? 'القائمة' : 'Menu'}>
        <div className="drawer__brand">
          <OliveIcon />
          <div>
            <div className="drawer__brand-title" lang={ar ? 'ar' : 'en'} style={ar ? { fontFamily: 'var(--font-arabic)' } : undefined}>
              {ar ? APP_TITLE_AR : APP_TITLE_EN}
            </div>
            <div className={`drawer__brand-sub${ar ? ' ar' : ''}`}>{ar ? APP_SUB_AR : APP_SUB_EN}</div>
          </div>
        </div>
        <nav className="drawer__list">
          {items.map(({ id, label, Icon }) => (
            <button
              key={id}
              type="button"
              className={`drawer__item${ar ? ' ar' : ''}`}
              onClick={() => { onOpenSheet(id); onClose() }}
            >
              <Icon />
              <span style={{ flex: 1, textAlign: ar ? 'right' : 'left' }}>{label}</span>
              <ChevronIcon ar={ar} />
            </button>
          ))}
        </nav>
        <div className="drawer__foot">
          <button
            type="button"
            className={`drawer__item${ar ? ' ar' : ''}`}
            style={{ padding: '12px 0', borderInlineStart: 'none' }}
            onClick={onToggleLang}
          >
            <LangIcon />
            <span style={{ flex: 1, textAlign: ar ? 'right' : 'left' }}>{ar ? 'English' : 'العربية'}</span>
          </button>
          <p style={{ marginTop: 12, fontFamily: ar ? 'var(--font-arabic)' : undefined }}>
            {ar ? ABOUT_TEXT.ar : ABOUT_TEXT.en}
          </p>
        </div>
      </aside>
    </>
  )
}

function OliveIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--olive-deep)', flexShrink: 0 }}>
      <path d="M6 26 C 10 22, 14 16, 20 10 C 22 8, 25 8, 27 10"/>
      <path d="M11 20 C 8 19, 6 19, 5 21 C 6 23, 9 23, 11 22 Z" fill="currentColor" fillOpacity="0.18"/>
      <path d="M15 14 C 12 13, 10 13, 9 15 C 10 17, 13 17, 15 16 Z" fill="currentColor" fillOpacity="0.18"/>
      <path d="M19 9 C 21 10, 23 10, 24 8 C 23 6, 21 6, 19 7 Z" fill="currentColor" fillOpacity="0.18"/>
      <ellipse cx="13.5" cy="22" rx="1.5" ry="2" fill="currentColor" fillOpacity="0.65" stroke="none"/>
    </svg>
  )
}

function SearchIcon() {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>
}
function FilterIcon() {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 6h13"/><path d="M19 6h1"/><circle cx="17.5" cy="6" r="2"/><path d="M4 12h3"/><path d="M9 12h11"/><circle cx="7.5" cy="12" r="2"/><path d="M4 18h9"/><path d="M15 18h5"/><circle cx="13.5" cy="18" r="2"/></svg>
}
function LinkIcon() {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7 0l3-3a5 5 0 0 0-7-7l-1 1"/><path d="M14 11a5 5 0 0 0-7 0l-3 3a5 5 0 0 0 7 7l1-1"/></svg>
}
function ChartIcon() {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 21V11"/><path d="M12 21V3"/><path d="M19 21v-6"/></svg>
}
function LangIcon() {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 8h7"/><path d="M8.5 5v3"/><path d="M5.5 14c2 4 5 4 7 0"/><path d="M9 11h3"/><path d="M14 17l3-7 3 7"/><path d="M15 15h4"/></svg>
}
function ChevronIcon({ ar }: { ar: boolean }) {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--ink-faint)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      {ar ? <path d="m15 6-6 6 6 6"/> : <path d="m9 6 6 6-6 6"/>}
    </svg>
  )
}
