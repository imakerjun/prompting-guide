export function OriginalDocLink({ href, children }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="original-doc-link"
    >
      <span style={{ fontSize: '1.1em' }}>📄</span>
      {children || '공식문서에서 보기'}
      <span style={{ fontSize: '0.9em', opacity: 0.5 }}>↗</span>
    </a>
  )
}
