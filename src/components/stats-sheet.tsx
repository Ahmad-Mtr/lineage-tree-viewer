import type { Lang } from '@/lib/types'
import { data } from '@/lib/data'
import { personFirst, t } from '@/lib/i18n'
import { genColor } from '@/lib/palettes'
import type { Palette } from '@/lib/types'
import { Sheet } from './sheet'

interface StatsSheetProps {
  open: boolean
  onClose: () => void
  lang: Lang
  palette: Palette
}

export function StatsSheet({ open, onClose, lang, palette }: StatsSheetProps) {
  const ar = lang === 'ar'
  const stats = data.stats()
  const branches = data.topBranches(2)
  const maxGenCount = Math.max(...stats.perGen.map(g => g.count))

  return (
    <Sheet open={open} onClose={onClose} title={t('stats', lang)} lang={lang}>
      <div style={{ padding: '0 16px 32px', display: 'flex', flexDirection: 'column', gap: 28 }}>

        {/* Big numbers */}
        <div className="stat-grid">
          <StatCard
            value={stats.total}
            label={t('totalRecorded', lang)}
            ar={ar}
          />
          <StatCard
            value={stats.generationCount}
            label={t('generationsCount', lang)}
            ar={ar}
          />
          <StatCard
            value={stats.avgChildren.toFixed(1)}
            label={t('avgChildren', lang)}
            ar={ar}
          />
          <StatCard
            value={`${Math.round((stats.verified / stats.total) * 100)}%`}
            label={t('verifiedShare', lang)}
            ar={ar}
          />
        </div>

        {/* Generation bars */}
        <section>
          <div className={`section-eyebrow${ar ? ' ar' : ''}`}>{t('generations', lang)}</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 12 }}>
            {stats.perGen.map(({ gen, count }) => (
              <div key={gen} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{
                  width: 40, flexShrink: 0, fontSize: 12,
                  color: 'var(--ink-faint)',
                  textAlign: ar ? 'right' : 'left',
                  fontFamily: ar ? 'var(--font-arabic)' : undefined,
                }}>
                  {ar ? `ج${gen}` : `G${gen}`}
                </span>
                <div style={{ flex: 1, height: 20, background: 'var(--parchment-deep)', borderRadius: 4, overflow: 'hidden', position: 'relative' }}>
                  <div style={{
                    position: 'absolute', insetBlock: 0,
                    [ar ? 'right' : 'left']: 0,
                    width: `${(count / maxGenCount) * 100}%`,
                    background: `color-mix(in oklch, ${genColor(gen, palette)} 70%, var(--cream))`,
                    borderRadius: 4,
                    transition: 'width 0.3s ease',
                  }} />
                  <span style={{
                    position: 'absolute', insetBlock: 0, display: 'flex', alignItems: 'center',
                    [ar ? 'right' : 'left']: 8,
                    fontSize: 11, fontWeight: 600, color: 'var(--ink)',
                  }}>
                    {count}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Top branches */}
        {branches.length > 0 && (
          <section>
            <div className={`section-eyebrow${ar ? ' ar' : ''}`}>{t('largestBranches', lang)}</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 12 }}>
              {branches.map(({ p, count }, rank) => (
                <div key={p.id} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <span style={{
                    width: 22, height: 22, borderRadius: '50%', flexShrink: 0,
                    background: `color-mix(in oklch, ${genColor(p.gen, palette)} 22%, var(--cream))`,
                    color: genColor(Math.max(p.gen - 1, 1), palette),
                    border: `1.5px solid color-mix(in oklch, ${genColor(p.gen, palette)} 40%, transparent)`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 10, fontFamily: 'var(--font-arabic)',
                  }}>
                    {p.monogramAr}
                  </span>
                  <div style={{ flex: 1 }}>
                    <div style={{
                      fontSize: 14, fontFamily: ar ? 'var(--font-arabic)' : 'var(--font-display)',
                      direction: ar ? 'rtl' : 'ltr',
                    }}>
                      {personFirst(p, lang)}
                    </div>
                    <div style={{ fontSize: 11, color: 'var(--ink-faint)' }}>
                      {count} {t('descendants', lang)}
                    </div>
                  </div>
                  <span style={{
                    fontSize: 22, fontWeight: 700, color: 'var(--olive-deep)',
                    fontFamily: 'var(--font-display)', lineHeight: 1,
                    opacity: 1 - rank * 0.2,
                  }}>
                    #{rank + 1}
                  </span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Timeline note */}
        <section>
          <div className={`section-eyebrow${ar ? ' ar' : ''}`}>{ar ? 'الامتداد الزمني' : 'Timeline'}</div>
          <p style={{
            margin: '10px 0 0', fontSize: 14, lineHeight: 1.8,
            color: 'var(--ink-mute)',
            fontFamily: ar ? 'var(--font-arabic)' : 'var(--font-display)',
            direction: ar ? 'rtl' : 'ltr',
            fontStyle: ar ? 'normal' : 'italic',
          }}>
            {ar
              ? `من حوالي ${stats.earliestBorn}م إلى حوالي ${stats.latestBorn}م — ما يقارب ${stats.latestBorn - stats.earliestBorn} عاماً من التاريخ الموثَّق.`
              : `From c. ${stats.earliestBorn} to c. ${stats.latestBorn} — roughly ${stats.latestBorn - stats.earliestBorn} years of documented history.`}
          </p>
        </section>
      </div>
    </Sheet>
  )
}

function StatCard({ value, label, ar }: { value: string | number; label: string; ar: boolean }) {
  return (
    <div className="surface" style={{ padding: '14px 16px', borderRadius: 10, textAlign: ar ? 'right' : 'left' }}>
      <div style={{
        fontSize: 28, fontWeight: 700, lineHeight: 1, fontFamily: 'var(--font-display)',
        color: 'var(--olive-deep)',
      }}>
        {value}
      </div>
      <div style={{
        fontSize: 12, color: 'var(--ink-faint)', marginTop: 4,
        fontFamily: ar ? 'var(--font-arabic)' : undefined,
      }}>
        {label}
      </div>
    </div>
  )
}
