import type { CSSProperties } from 'react'

type IconProps = {
  name: IconName
  size?: number
  className?: string
  style?: CSSProperties
  strokeWidth?: number
}

export type IconName =
  | 'chat'
  | 'spark'
  | 'layers'
  | 'receipt'
  | 'card'
  | 'dashboard'
  | 'plug'
  | 'shield'
  | 'edit'
  | 'tag'
  | 'globe'
  | 'rupee'
  | 'arrow-right'
  | 'arrow-left'
  | 'check'
  | 'close'
  | 'menu'
  | 'sun'
  | 'moon'
  | 'mail'
  | 'calendar'
  | 'clock'
  | 'user'
  | 'store'
  | 'sliders'
  | 'flag'
  | 'refresh'
  | 'code'
  | 'search'
  | 'link'
  | 'whatsapp'
  | 'instagram'
  | 'telegram'

const S = {
  chat: (
    <>
      <path d="M21 11.5a8.4 8.4 0 0 1-9 8.4 9.6 9.6 0 0 1-3.4-.6L3 21l1.8-4.7A8.3 8.3 0 0 1 3.6 11.5 8.4 8.4 0 0 1 12 3.1a8.4 8.4 0 0 1 9 8.4Z" />
      <path d="M8.5 11.5h.01M12 11.5h.01M15.5 11.5h.01" />
    </>
  ),
  spark: (
    <>
      <path d="M12 3.5 13.6 8l4.4 1.6L13.6 11 12 15.5 10.4 11 6 9.6 10.4 8 12 3.5Z" />
      <path d="M18.5 15l.8 2.2 2.2.8-2.2.8-.8 2.2-.8-2.2-2.2-.8 2.2-.8.8-2.2Z" />
      <path d="M5.5 14.5l.6 1.6 1.6.6-1.6.6-.6 1.6-.6-1.6-1.6-.6 1.6-.6.6-1.6Z" />
    </>
  ),
  layers: (
    <>
      <path d="m12 3 8.5 4.5L12 12 3.5 7.5 12 3Z" />
      <path d="m4 12 8 4.3 8-4.3" />
      <path d="m4 16.4 8 4.3 8-4.3" />
    </>
  ),
  receipt: (
    <>
      <path d="M6 3.5h12v17l-2.4-1.6-2.4 1.6-2.4-1.6L8.4 20.5 6 18.9V3.5Z" />
      <path d="M9.5 8.5h5M9.5 12.5h5" />
    </>
  ),
  card: (
    <>
      <rect x="2.8" y="5.5" width="18.4" height="13" rx="2.4" />
      <path d="M2.8 10h18.4M6.5 14.6h3.2" />
    </>
  ),
  dashboard: (
    <>
      <rect x="3" y="3.5" width="7.5" height="8" rx="1.8" />
      <rect x="13.5" y="3.5" width="7.5" height="5" rx="1.8" />
      <rect x="13.5" y="11.5" width="7.5" height="9" rx="1.8" />
      <rect x="3" y="14.5" width="7.5" height="6" rx="1.8" />
    </>
  ),
  plug: (
    <>
      <path d="M9 3v5M15 3v5" />
      <path d="M6.5 8h11v3.2a5.5 5.5 0 0 1-5.5 5.5A5.5 5.5 0 0 1 6.5 11.2V8Z" />
      <path d="M12 16.7V21" />
    </>
  ),
  shield: (
    <>
      <path d="M12 3 5 5.8v5.4c0 4.3 2.9 8.2 7 9.3 4.1-1.1 7-5 7-9.3V5.8L12 3Z" />
      <path d="m9 12 2.2 2.2L15.3 10" />
    </>
  ),
  edit: (
    <>
      <path d="M4.5 19.5h4l10-10a2.1 2.1 0 0 0-3-3l-10 10v3Z" />
      <path d="m14.5 6.5 3 3" />
    </>
  ),
  tag: (
    <>
      <path d="M3.5 11V4.5a1 1 0 0 1 1-1H11l9 9-7.5 7.5-9-9Z" />
      <circle cx="7.8" cy="7.8" r="1.3" />
    </>
  ),
  globe: (
    <>
      <circle cx="12" cy="12" r="8.6" />
      <path d="M3.6 12h16.8M12 3.4c2.2 2.4 3.3 5.4 3.3 8.6S14.2 18.2 12 20.6c-2.2-2.4-3.3-5.4-3.3-8.6S9.8 5.8 12 3.4Z" />
    </>
  ),
  rupee: (
    <>
      <circle cx="12" cy="12" r="8.6" />
      <path d="M9 7.6h6M9 10.6h6M9 16.4h6M9 7.6c2.6 0 4.2 1.3 4.2 3s-1.6 3-4.2 3" />
    </>
  ),
  'arrow-right': <path d="M4.5 12h14m-5.5-5.5L18.5 12l-5.5 5.5" />,
  'arrow-left': <path d="M19.5 12h-14m5.5-5.5L5.5 12l5.5 5.5" />,
  check: <path d="m5 12.5 4.5 4.5L19 7.5" />,
  close: <path d="M6.5 6.5l11 11m0-11-11 11" />,
  menu: <path d="M4 7.5h16M4 12h16M4 16.5h16" />,
  sun: (
    <>
      <circle cx="12" cy="12" r="4.2" />
      <path d="M12 2.8v2.4M12 18.8v2.4M4.5 4.5l1.7 1.7M17.8 17.8l1.7 1.7M2.8 12h2.4M18.8 12h2.4M4.5 19.5l1.7-1.7M17.8 6.2l1.7-1.7" />
    </>
  ),
  moon: <path d="M20 14.4A8.4 8.4 0 0 1 9.6 4 8.6 8.6 0 1 0 20 14.4Z" />,
  mail: (
    <>
      <rect x="3" y="5.5" width="18" height="13" rx="2.2" />
      <path d="m3.8 7.4 7.2 5.2a1.6 1.6 0 0 0 2 0l7.2-5.2" />
    </>
  ),
  calendar: (
    <>
      <rect x="3.5" y="5" width="17" height="15.5" rx="2.2" />
      <path d="M3.5 9.6h17M8 3.2v3.6M16 3.2v3.6" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="8.6" />
      <path d="M12 7.4V12l3 1.8" />
    </>
  ),
  user: (
    <>
      <circle cx="12" cy="8.4" r="3.8" />
      <path d="M4.8 20a7.2 7.2 0 0 1 14.4 0" />
    </>
  ),
  store: (
    <>
      <path d="M4 9.5V20a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1V9.5" />
      <path d="M3 5.5 4.4 9.4a2.6 2.6 0 0 0 5 0l1-2.9a2.6 2.6 0 0 0 5 0l1 2.9a2.6 2.6 0 0 0 5 0L21 5.5a1.5 1.5 0 0 0-1.7-1.5H4.7A1.5 1.5 0 0 0 3 5.5Z" />
    </>
  ),
  sliders: (
    <>
      <path d="M4 8h10M18 8h2M4 16h4M12 16h8" />
      <circle cx="16" cy="8" r="2.2" />
      <circle cx="10" cy="16" r="2.2" />
    </>
  ),
  flag: (
    <>
      <path d="M5.5 21V4" />
      <path d="M5.5 5h10.8l-1.6 3.4 1.6 3.4H5.5" />
    </>
  ),
  refresh: (
    <>
      <path d="M20 11.4A8 8 0 0 0 6.3 6.3L4 8.5" />
      <path d="M4 4.5v4h4" />
      <path d="M4 12.6a8 8 0 0 0 13.7 5.1l2.3-2.2" />
      <path d="M20 19.5v-4h-4" />
    </>
  ),
  code: <path d="m8.5 8.5-4 3.5 4 3.5M15.5 8.5l4 3.5-4 3.5M13.5 5l-3 14" />,
  search: (
    <>
      <circle cx="11" cy="11" r="6.5" />
      <path d="m16 16 4 4" />
    </>
  ),
  link: (
    <>
      <path d="M10.5 13.5a3.8 3.8 0 0 0 5.4 0l2.6-2.6a3.8 3.8 0 0 0-5.4-5.4l-1.3 1.3" />
      <path d="M13.5 10.5a3.8 3.8 0 0 0-5.4 0l-2.6 2.6a3.8 3.8 0 0 0 5.4 5.4l1.3-1.3" />
    </>
  ),
}

export function Icon({ name, size, className, style, strokeWidth = 1.6 }: IconProps) {
  const filled = name === 'whatsapp' || name === 'instagram' || name === 'telegram'

  if (filled) {
    return (
      <svg
        viewBox="0 0 24 24"
        width={size ?? 24}
        height={size ?? 24}
        className={className}
        style={style}
        fill="currentColor"
        aria-hidden="true"
        focusable="false"
      >
        {name === 'whatsapp' && (
          <path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.16-.17.2-.35.22-.64.08-.3-.15-1.26-.47-2.4-1.48-.88-.79-1.48-1.76-1.65-2.06-.17-.3-.02-.46.13-.6.14-.14.3-.35.45-.53.15-.17.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.6-.91-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.21 3.07c.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.7.63.71.22 1.36.19 1.87.11.57-.09 1.75-.72 2-1.41.25-.7.25-1.29.18-1.42-.08-.12-.27-.2-.57-.35M12.05 21.8h-.01a9.87 9.87 0 0 1-5.03-1.38l-.36-.22-3.74.98 1-3.65-.24-.37a9.86 9.86 0 0 1-1.51-5.26c0-5.45 4.44-9.88 9.9-9.88 2.64 0 5.12 1.03 6.98 2.9a9.83 9.83 0 0 1 2.9 6.99c0 5.45-4.44 9.89-9.89 9.89m8.41-18.3A11.82 11.82 0 0 0 12.05 0C5.5 0 .16 5.34.16 11.89c0 2.1.55 4.15 1.59 5.95L.06 24l6.3-1.65a11.88 11.88 0 0 0 5.69 1.45h.01c6.55 0 11.89-5.34 11.89-11.89 0-3.18-1.24-6.17-3.48-8.42" />
        )}
        {name === 'instagram' && (
          <path d="M12 2.16c3.2 0 3.58.01 4.85.07 3.25.15 4.77 1.69 4.92 4.92.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.15 3.23-1.66 4.77-4.92 4.92-1.27.06-1.64.07-4.85.07s-3.58-.01-4.85-.07c-3.26-.15-4.77-1.7-4.92-4.92-.06-1.27-.07-1.65-.07-4.85s.01-3.58.07-4.85C2.38 3.92 3.9 2.38 7.15 2.23 8.42 2.17 8.8 2.16 12 2.16m0-2.16C8.74 0 8.33.01 7.05.07 2.7.27.27 2.69.07 7.05.01 8.33 0 8.74 0 12s.01 3.67.07 4.95c.2 4.36 2.62 6.78 6.98 6.98C8.33 23.99 8.74 24 12 24s3.67-.01 4.95-.07c4.35-.2 6.78-2.62 6.98-6.98.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95C23.73 2.7 21.31.27 16.95.07 15.67.01 15.26 0 12 0m0 5.84a6.16 6.16 0 1 0 0 12.32 6.16 6.16 0 0 0 0-12.32M12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8m6.41-11.85a1.44 1.44 0 1 0 0 2.88 1.44 1.44 0 0 0 0-2.88" />
        )}
        {name === 'telegram' && (
          <path d="M23.91 3.79 20.3 20.84c-.25 1.21-.98 1.5-2 .94l-5.5-4.07-2.66 2.57c-.3.3-.55.56-1.1.56-.72 0-.6-.27-.84-.95L6.3 13.7l-5.45-1.7c-1.18-.35-1.19-1.16.26-1.75l21.26-8.2c.97-.43 1.9.24 1.53 1.73" />
        )}
      </svg>
    )
  }

  return (
    <svg
      viewBox="0 0 24 24"
      width={size ?? 24}
      height={size ?? 24}
      className={className}
      style={style}
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {S[name]}
    </svg>
  )
}

export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true" focusable="false">
      <rect
        x="1.2"
        y="1.2"
        width="29.6"
        height="29.6"
        rx="9.5"
        fill="none"
        stroke="currentColor"
        strokeOpacity="0.35"
        strokeWidth="1.4"
      />
      <path
        d="M9 21.5V10.5a1.4 1.4 0 0 1 1.4-1.4h3.9c2.6 0 4.4 1.5 4.4 3.7 0 1.7-1.1 3-2.8 3.4l3.4 5.3"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="22.4" cy="21.4" r="2.3" fill="currentColor" />
    </svg>
  )
}
