import type { Lang } from '@/lib/types'

interface TopBarProps {
  title: string
  subtitle: string
  lang: Lang
  onMenu: () => void
  onSearch: () => void
}

export function TopBar({ title, subtitle, lang, onMenu, onSearch }: TopBarProps) {
  const ar = lang === 'ar'
  return (
    <header className="topbar">
      <button type="button" className="icon-btn" onClick={onMenu} aria-label="Menu">
        <MenuIcon />
      </button>
      <div className="topbar__center">
        <div className={`topbar__title${ar ? ' ar' : ''}`}>{title}</div>
        <div className={`topbar__sub${ar ? ' ar' : ''}`}>{subtitle}</div>
      </div>
      <button type="button" className="icon-btn" onClick={onSearch} aria-label="Search">
        <SearchIcon />
      </button>
    </header>
  )
}

function MenuIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 6h18"/><path d="M3 12h18"/><path d="M3 18h18"/>
    </svg>
  )
}

function SearchIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>
    </svg>
  )
}
