import { useState, useDeferredValue } from 'react'
import type { Lang } from '@/lib/types'
import { data } from '@/lib/data'
import { t } from '@/lib/i18n'
import { Sheet } from './sheet'
import { PersonRow } from './person-row'

interface SearchSheetProps {
  open: boolean
  onClose: () => void
  lang: Lang
  onSelectPerson: (id: string) => void
}

export function SearchSheet({ open, onClose, lang, onSelectPerson }: SearchSheetProps) {
  const ar = lang === 'ar'
  const [query, setQuery] = useState('')
  const deferred = useDeferredValue(query)

  const results = deferred.length > 0
    ? data.people.filter(p => {
        const q = deferred.toLowerCase()
        return (
          p.nameEn.toLowerCase().includes(q) ||
          p.nameAr.includes(deferred) ||
          p.placeEn.toLowerCase().includes(q) ||
          p.placeAr.includes(deferred)
        )
      })
    : data.people

  function handleSelect(id: string) {
    onSelectPerson(id)
    onClose()
  }

  return (
    <Sheet open={open} onClose={onClose} title={t('search', lang)} lang={lang}>
      <div style={{ padding: '0 16px 12px' }}>
        <div className="search-input">
          <input
            className={ar ? 'ar' : undefined}
            dir={ar ? 'rtl' : 'ltr'}
            placeholder={ar ? 'ابحث بالاسم أو المكان…' : 'Search by name or place…'}
            value={query}
            onChange={e => setQuery(e.target.value)}
            autoFocus={open}
            style={{ all: 'unset', flex: 1, fontSize: 15, fontFamily: ar ? 'var(--font-arabic)' : undefined, direction: ar ? 'rtl' : 'ltr' }}
          />
        </div>
      </div>
      <div className="sheet__body" style={{ padding: '0 16px', gap: 0 }}>
        {results.length === 0 ? (
          <p style={{ color: 'var(--ink-faint)', textAlign: ar ? 'right' : 'left', padding: '24px 0', fontFamily: ar ? 'var(--font-arabic)' : undefined }}>
            {t('noMatches', lang)}
          </p>
        ) : (
          results.map(p => (
            <PersonRow
              key={p.id}
              person={p}
              lang={lang}
              onClick={() => handleSelect(p.id)}
              highlight={deferred || undefined}
            />
          ))
        )}
      </div>
    </Sheet>
  )
}
