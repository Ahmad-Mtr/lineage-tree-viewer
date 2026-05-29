export function OliveIcon({ size = 28 }: { size?: number }) {
  return (
    <svg
      width={size} height={size}
      viewBox="0 0 32 32" fill="none"
      stroke="currentColor" strokeWidth="1.5"
      strokeLinecap="round" strokeLinejoin="round"
      style={{ color: 'var(--olive-deep)', flexShrink: 0 }}
      aria-hidden="true"
    >
      <path d="M6 26 C 10 22, 14 16, 20 10 C 22 8, 25 8, 27 10"/>
      <path d="M11 20 C 8 19, 6 19, 5 21 C 6 23, 9 23, 11 22 Z" fill="currentColor" fillOpacity="0.18"/>
      <path d="M15 14 C 12 13, 10 13, 9 15 C 10 17, 13 17, 15 16 Z" fill="currentColor" fillOpacity="0.18"/>
      <path d="M19 9 C 21 10, 23 10, 24 8 C 23 6, 21 6, 19 7 Z" fill="currentColor" fillOpacity="0.18"/>
      <ellipse cx="13.5" cy="22" rx="1.5" ry="2" fill="currentColor" fillOpacity="0.65" stroke="none"/>
    </svg>
  )
}
