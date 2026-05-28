import type { Lang } from '@/lib/types'
import { data } from '@/lib/data'
import { personName, personFirst, personPlace, lifespan, t } from '@/lib/i18n'
import { genColor } from '@/lib/palettes'
import type { Palette } from '@/lib/types'
import { Sheet } from './sheet'
import { PersonRow } from './person-row'

interface PersonSheetProps {
  open: boolean
  onClose: () => void
  lang: Lang
  personId: string | null
  palette: Palette
  onSelectPerson: (id: string) => void
}

export function PersonSheet({ open, onClose, lang, personId, palette, onSelectPerson }: PersonSheetProps) {
  const ar = lang === 'ar'
  const person = personId ? data.byId[personId] : null

  if (!person) return null

  const color = genColor(person.gen, palette)
  const father = person.fatherId ? data.byId[person.fatherId] : null
  const sons = (data.childrenOf[person.id] ?? []).map(id => data.byId[id])
  const ancestorIds = data.ancestors(person.id)
  const ancestorChain = ancestorIds.map(id => data.byId[id]).filter(Boolean)

  return (
    <Sheet open={open} onClose={onClose} lang={lang}>
      <div style={{ padding: '0 16px 24px', display: 'flex', flexDirection: 'column', gap: 20 }}>

        {/* Header */}
        <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start', paddingTop: 4 }}>
          <span
            style={{
              width: 48, height: 48, borderRadius: '50%', flexShrink: 0,
              background: `color-mix(in oklch, ${color} 22%, var(--cream))`,
              color: genColor(Math.max(person.gen - 1, 1), palette),
              border: `2px solid color-mix(in oklch, ${color} 40%, transparent)`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 20, fontFamily: 'var(--font-arabic)',
            }}
          >
            {person.monogramAr}
          </span>
          <div style={{ flex: 1 }}>
            <div style={{
              fontFamily: ar ? 'var(--font-arabic)' : 'var(--font-display)',
              fontSize: ar ? 20 : 18,
              fontWeight: 500,
              lineHeight: 1.3,
              direction: ar ? 'rtl' : 'ltr',
            }}>
              {personName(person, lang)}
            </div>
            <div style={{ color: 'var(--ink-mute)', fontSize: 13, marginTop: 4, direction: ar ? 'rtl' : 'ltr', fontFamily: ar ? 'var(--font-arabic)' : undefined }}>
              {ar ? 'الجيل' : 'Gen'} {person.gen} · {lifespan(person, lang)} · {personPlace(person, lang)}
              {!person.verified && (
                <span style={{ color: 'var(--amber)', marginInlineStart: 6 }}>{t('unverified', lang)}</span>
              )}
            </div>
          </div>
        </div>

        {/* Bio */}
        {(ar ? person.bioAr : person.bioEn) && (
          <p style={{
            margin: 0, fontSize: 14, lineHeight: 1.7,
            fontFamily: ar ? 'var(--font-arabic)' : undefined,
            direction: ar ? 'rtl' : 'ltr',
            color: 'var(--ink-mute)',
          }}>
            {ar ? person.bioAr : person.bioEn}
          </p>
        )}

        {/* Father */}
        {father && (
          <section>
            <div className={`section-eyebrow${ar ? ' ar' : ''}`}>{t('father', lang)}</div>
            <PersonRow person={father} lang={lang} onClick={() => onSelectPerson(father.id)} />
          </section>
        )}

        {/* Sons */}
        <section>
          <div className={`section-eyebrow${ar ? ' ar' : ''}`}>{t('sons', lang)}</div>
          {sons.length === 0 ? (
            <p style={{ color: 'var(--ink-faint)', fontSize: 13, margin: '8px 0', fontFamily: ar ? 'var(--font-arabic)' : undefined, direction: ar ? 'rtl' : 'ltr' }}>
              {t('noSons', lang)}
            </p>
          ) : (
            sons.map(s => (
              <PersonRow key={s.id} person={s} lang={lang} onClick={() => onSelectPerson(s.id)} />
            ))
          )}
        </section>

        {/* Lineage chain */}
        {ancestorChain.length > 1 && (
          <section>
            <div className={`section-eyebrow${ar ? ' ar' : ''}`}>{t('ancestors', lang)}</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px 0', alignItems: 'center', marginTop: 6, direction: ar ? 'rtl' : 'ltr' }}>
              {ancestorChain.map((anc, i) => (
                <span key={anc.id} style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                  <button
                    type="button"
                    style={{
                      background: 'none', border: 'none', padding: '2px 4px', cursor: 'pointer',
                      color: 'var(--olive-deep)', fontSize: 13, borderRadius: 4,
                      fontFamily: ar ? 'var(--font-arabic)' : undefined,
                      fontWeight: anc.id === person.id ? 600 : 400,
                    }}
                    onClick={() => anc.id !== person.id && onSelectPerson(anc.id)}
                  >
                    {personFirst(anc, lang)}
                  </button>
                  {i < ancestorChain.length - 1 && (
                    <span style={{ color: 'var(--ink-faint)', fontSize: 11 }}>{ar ? '←' : '→'}</span>
                  )}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* Sources */}
        {person.sourcesEn.length > 0 && (
          <section>
            <div className={`section-eyebrow${ar ? ' ar' : ''}`}>{ar ? 'المصادر' : 'Sources'}</div>
            <ul style={{ margin: '8px 0 0', paddingInlineStart: 16, fontSize: 12, color: 'var(--ink-faint)', display: 'flex', flexDirection: 'column', gap: 4 }}>
              {person.sourcesEn.map((s, i) => (
                <li key={i}>{s}</li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </Sheet>
  )
}
