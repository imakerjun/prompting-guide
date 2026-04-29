export function SystemSection({ eyebrow, title, description, children }) {
  return (
    <section style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div>
        {eyebrow ? (
          <div
            style={{
              fontSize: 12,
              fontWeight: 800,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: '#9a3412',
              marginBottom: 8,
            }}
          >
            {eyebrow}
          </div>
        ) : null}
        <h2 style={{ margin: 0, fontSize: 'clamp(1.5rem, 2vw, 2rem)', lineHeight: 1.15, color: '#111827' }}>{title}</h2>
        {description ? (
          <p style={{ margin: '10px 0 0', fontSize: 16, lineHeight: 1.7, color: '#4b5563', maxWidth: 880 }}>
            {description}
          </p>
        ) : null}
      </div>
      {children}
    </section>
  )
}

export function SystemCard({ title, description, children, tone = 'default' }) {
  const tones = {
    default: {
      background: '#ffffff',
      border: '1px solid #ecebe7',
    },
    warm: {
      background: '#fff7ed',
      border: '1px solid #fed7aa',
    },
    dark: {
      background: '#111827',
      border: '1px solid #1f2937',
    },
  }

  const palette = tones[tone] || tones.default
  const headingColor = tone === 'dark' ? '#f9fafb' : '#111827'
  const copyColor = tone === 'dark' ? '#d1d5db' : '#4b5563'

  return (
    <div
      style={{
        padding: 20,
        borderRadius: 20,
        boxShadow: tone === 'dark' ? 'none' : '0 10px 28px rgba(15, 23, 42, 0.04)',
        ...palette,
      }}
    >
      {title ? <h3 style={{ margin: 0, fontSize: 20, lineHeight: 1.2, color: headingColor }}>{title}</h3> : null}
      {description ? (
        <p style={{ margin: title ? '10px 0 0' : 0, fontSize: 15, lineHeight: 1.7, color: copyColor }}>
          {description}
        </p>
      ) : null}
      {children ? <div style={{ marginTop: title || description ? 16 : 0 }}>{children}</div> : null}
    </div>
  )
}

export function SystemMetricCard({ label, value, hint }) {
  return (
    <div
      style={{
        padding: 18,
        borderRadius: 18,
        background: '#ffffff',
        border: '1px solid #ecebe7',
        boxShadow: '0 10px 28px rgba(15, 23, 42, 0.04)',
      }}
    >
      <div style={{ fontSize: 12, color: '#787774', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{label}</div>
      <div style={{ fontSize: 32, fontWeight: 800, marginTop: 8, color: '#111827' }}>{value}</div>
      {hint ? <div style={{ fontSize: 14, lineHeight: 1.6, color: '#6b7280', marginTop: 8 }}>{hint}</div> : null}
    </div>
  )
}

export function SystemChip({ children, tone = 'neutral' }) {
  const tones = {
    neutral: {
      background: '#f7f6f3',
      border: '1px solid #ecebe7',
      color: '#44403c',
    },
    accent: {
      background: '#fff7ed',
      border: '1px solid #fdba74',
      color: '#9a3412',
    },
    success: {
      background: '#ecfdf5',
      border: '1px solid #86efac',
      color: '#166534',
    },
  }

  const palette = tones[tone] || tones.neutral

  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        padding: '6px 10px',
        borderRadius: 999,
        fontSize: 12,
        fontWeight: 700,
        letterSpacing: '0.02em',
        ...palette,
      }}
    >
      {children}
    </span>
  )
}
