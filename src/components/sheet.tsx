import { useEffect } from 'react'
import type { Lang } from '@/lib/types'

interface SheetProps {
  open: boolean
  onClose: () => void
  title?: string
  lang: Lang
  children: React.ReactNode
  footer?: React.ReactNode
}

export function Sheet({ open, onClose, title, lang, children, footer }: SheetProps) {
  const ar = lang === 'ar'

  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = prev }
  }, [open])

  return (
    <>
      <div className={`scrim${open ? ' is-open' : ''}`} onClick={onClose} />
      <div className={`sheet${open ? ' is-open' : ''}`} role="dialog" aria-modal="true">
        <div className="sheet__grip" />
        {title != null && (
          <div className="sheet__head">
            <div className={`sheet__title${ar ? ' ar' : ''}`}>{title}</div>
            <button type="button" className="icon-btn" onClick={onClose} aria-label="Close">
              <CloseIcon />
            </button>
          </div>
        )}
        <div className="sheet__body">{children}</div>
        {footer && <div style={{ padding: '0 16px 16px', flexShrink: 0 }}>{footer}</div>}
      </div>
    </>
  )
}

export function CloseIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 6 6 18"/><path d="m6 6 12 12"/>
    </svg>
  )
}
