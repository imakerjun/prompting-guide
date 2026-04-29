import Link from 'next/link'
import { slideSystemSections } from '../lib/slide-template-catalog.mjs'

export function SlideDesignSystemShell({ activeSection, title, description, children }) {
  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(180deg, #fffaf5 0%, #ffffff 280px)',
        color: '#1a1a1a',
        fontFamily: 'system-ui, -apple-system, sans-serif',
      }}
    >
      <div style={{ maxWidth: 1380, margin: '0 auto', padding: '36px 28px 72px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: 16, alignItems: 'flex-start', flexWrap: 'wrap', marginBottom: 28 }}>
          <div style={{ maxWidth: 920 }}>
            <div style={{ fontSize: 13, fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#9a3412', marginBottom: 12 }}>
              Dev Only / Slide Design System
            </div>
            <h1 style={{ fontSize: 'clamp(2.2rem, 4vw, 3.4rem)', lineHeight: 1.04, margin: 0 }}>{title}</h1>
            <p style={{ margin: '16px 0 0', fontSize: 18, lineHeight: 1.75, color: '#4a4a4a', maxWidth: 900 }}>
              {description}
            </p>
          </div>

          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            <Link
              href="/studio"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '10px 16px',
                borderRadius: 12,
                border: '1px solid #d6d3d1',
                background: '#ffffff',
                color: '#1a1a1a',
                fontWeight: 700,
                textDecoration: 'none',
              }}
            >
              스튜디오로 돌아가기
            </Link>
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '10px 16px',
                borderRadius: 12,
                border: '1px solid #fed7aa',
                background: '#fff7ed',
                color: '#9a3412',
                fontWeight: 800,
              }}
            >
              <code>npm run check:slide-templates</code>
            </span>
          </div>
        </div>

        <div style={{ display: 'flex', gap: 24, alignItems: 'flex-start', flexWrap: 'wrap' }}>
          <aside
            style={{
              width: 260,
              flexShrink: 0,
              position: 'sticky',
              top: 24,
            }}
          >
            <div
              style={{
                padding: 18,
                borderRadius: 20,
                background: '#ffffff',
                border: '1px solid #ecebe7',
                boxShadow: '0 10px 28px rgba(15, 23, 42, 0.04)',
              }}
            >
              <div style={{ fontSize: 12, fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#787774', marginBottom: 12 }}>
                System Map
              </div>
              <nav style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {slideSystemSections.map(section => {
                  const active = section.id === activeSection
                  return (
                    <Link
                      key={section.id}
                      href={section.href}
                      style={{
                        display: 'block',
                        padding: '12px 14px',
                        borderRadius: 14,
                        textDecoration: 'none',
                        border: active ? '1px solid #fdba74' : '1px solid transparent',
                        background: active ? '#fff7ed' : '#f9fafb',
                        color: active ? '#9a3412' : '#1f2937',
                      }}
                    >
                      <div style={{ fontSize: 14, fontWeight: 800 }}>{section.label}</div>
                      <div style={{ fontSize: 12, lineHeight: 1.55, color: active ? '#9a3412' : '#6b7280', marginTop: 4 }}>
                        {section.description}
                      </div>
                    </Link>
                  )
                })}
              </nav>
            </div>
          </aside>

          <main style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 28 }}>
            {children}
          </main>
        </div>
      </div>
    </div>
  )
}
