export function UseCaseCard({ emoji, title, description, prompt, children }) {
  return (
    <div className="usecase-card">
      <div className="usecase-header">
        <span className="usecase-emoji">{emoji}</span>
        <strong className="usecase-title">{title}</strong>
      </div>
      <p className="usecase-desc">{description}</p>
      {prompt && (
        <pre className="usecase-prompt"><code>{prompt}</code></pre>
      )}
      {children}
    </div>
  )
}

export function ResourceLink({ href, type, title, description }) {
  const typeEmoji = {
    article: '📝',
    video: '🎬',
    official: '📄',
    cookbook: '🧪',
    tool: '🔧'
  }
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className="resource-link">
      <span className="resource-type">{typeEmoji[type] || '🔗'} {type}</span>
      <span className="resource-title">{title}</span>
      {description && <span className="resource-desc">{description}</span>}
    </a>
  )
}
