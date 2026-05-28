import type { Person, Lang } from '@/lib/types'
import { personName, personPlace, lifespan } from '@/lib/i18n'
import { genColor } from '@/lib/palettes'

interface PersonRowProps {
  person: Person
  lang: Lang
  onClick: () => void
  trailing?: React.ReactNode
  highlight?: string
}

export function PersonRow({ person, lang, onClick, trailing, highlight }: PersonRowProps) {
  const ar = lang === 'ar'
  const color = genColor(person.gen)
  const name = personName(person, lang)

  return (
    <button type="button" className="row" onClick={onClick}>
      <span
        className="row__monogram"
        style={{
          background: `color-mix(in oklch, ${color} 22%, var(--cream))`,
          color: genColor(Math.max(person.gen - 1, 1)),
          borderColor: `color-mix(in oklch, ${color} 40%, transparent)`,
        }}
      >
        {person.monogramAr}
      </span>
      <div className="row__main">
        <div className={`row__name${ar ? ' ar' : ''}`} dir={ar ? 'rtl' : 'ltr'}>
          {highlight ? <HighlightedText text={name} query={highlight} /> : name}
        </div>
        <div className={`row__meta${ar ? ' ar' : ''}`} dir={ar ? 'rtl' : 'ltr'}>
          <span>{ar ? 'الجيل' : 'Gen'} <span className="tabular">{person.gen}</span></span>
          <span className="dot">·</span>
          <span className="tabular">{lifespan(person, lang)}</span>
          <span className="dot">·</span>
          <span>{personPlace(person, lang)}</span>
          {!person.verified && (
            <>
              <span className="dot">·</span>
              <span style={{ color: 'var(--amber)' }}>{ar ? 'غير موثّق' : 'unverified'}</span>
            </>
          )}
        </div>
      </div>
      {trailing ?? (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--ink-faint)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          {ar ? <path d="m15 6-6 6 6 6"/> : <path d="m9 6 6 6-6 6"/>}
        </svg>
      )}
    </button>
  )
}

function HighlightedText({ text, query }: { text: string; query: string }) {
  const i = text.toLowerCase().indexOf(query.toLowerCase())
  if (i < 0) return <>{text}</>
  return (
    <>
      {text.slice(0, i)}
      <mark style={{ background: 'var(--olive-wash)', color: 'var(--olive-deep)', padding: '0 2px', borderRadius: 3 }}>
        {text.slice(i, i + query.length)}
      </mark>
      {text.slice(i + query.length)}
    </>
  )
}
