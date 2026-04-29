import { SlideOnly } from './SlideVisibility'

function normalizeLines(lines, body) {
  if (Array.isArray(lines) && lines.length > 0) return lines
  if (lines) return [lines]
  if (Array.isArray(body)) return body
  if (body) return [body]
  return []
}

export function SlideHero({ label, highlight, body }) {
  return (
    <SlideOnly>
      <div className="keyword-card hero">
        {label ? <h3>{label}</h3> : null}
        <span className="keyword-highlight">{highlight}</span>
        {body ? <p>{body}</p> : null}
      </div>
    </SlideOnly>
  )
}

export function SlideMetric({ label, highlight, body, lines }) {
  const rows = normalizeLines(lines, body)

  return (
    <SlideOnly>
      <div className="keyword-card metric">
        {label ? <h3>{label}</h3> : null}
        {highlight ? <span className="keyword-highlight">{highlight}</span> : null}
        {rows.map((line, index) => (
          <p key={`${index}-${typeof line === 'string' ? line : 'metric'}`}>{line}</p>
        ))}
      </div>
    </SlideOnly>
  )
}

export function SlidePrinciple({ number = '01', title, body }) {
  return (
    <SlideOnly>
      <div className="keyword-card principle">
        <span className="principle-number">{number}</span>
        <div className="principle-body">
          {title ? <h3>{title}</h3> : null}
          {body ? <p>{body}</p> : null}
        </div>
      </div>
    </SlideOnly>
  )
}

export function SlideSummary({ title, items = [], leftTitle = false }) {
  const className = leftTitle ? 'keyword-card summary left-title' : 'keyword-card summary'

  return (
    <SlideOnly>
      <div className={className}>
        {title ? <h3>{title}</h3> : null}
        {items.map((item, index) => (
          <p key={`${index}-${typeof item === 'string' ? item : 'summary'}`}>{item}</p>
        ))}
      </div>
    </SlideOnly>
  )
}

export function SlideSectionTitle({ children, align = 'center' }) {
  const className = align === 'left' ? 'slide-section-title-left' : 'slide-section-title'
  return (
    <SlideOnly>
      <h2 className={className}>{children}</h2>
    </SlideOnly>
  )
}

export function SlideTextCenter({
  children,
  illustrationSrc,
  illustrationAlt = '',
  illustrationClassName = 'slide-illustration',
  padding,
}) {
  const style = padding ? { padding } : undefined

  return (
    <SlideOnly>
      <div className="slide-text-center" style={style}>
        {illustrationSrc ? <img src={illustrationSrc} alt={illustrationAlt} className={illustrationClassName} /> : null}
        {children}
      </div>
    </SlideOnly>
  )
}

export function SlideTitleFollowsBody({ children }) {
  return (
    <SlideOnly>
      <div className="slide-title-follows-body">
        {children}
      </div>
    </SlideOnly>
  )
}

export function SlideIllustrationWithCard({
  illustrationSrc,
  illustrationAlt = '',
  illustrationClassName = 'slide-illustration',
  number = '01',
  title,
  body,
}) {
  return (
    <SlideOnly>
      <div className="slide-illustration-with-card">
        {illustrationSrc ? <img src={illustrationSrc} alt={illustrationAlt} className={illustrationClassName} /> : null}
        <div className="keyword-card principle">
          <span className="principle-number">{number}</span>
          <div className="principle-body">
            {title ? <h3>{title}</h3> : null}
            {body ? <p>{body}</p> : null}
          </div>
        </div>
      </div>
    </SlideOnly>
  )
}
