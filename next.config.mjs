import nextra from 'nextra'

const withNextra = nextra({
  latex: true,
  search: {
    codeblocks: true
  },
  contentDirBasePath: '/docs'
})

export default withNextra({
  reactStrictMode: true,
  devIndicators: false,
  async redirects() {
    return [
      {
        source: '/docs/roadmap',
        destination: '/docs/orientation',
        permanent: true
      },
      {
        source: '/docs/best-practices/output-and-formatting',
        destination: '/docs/best-practices/practical-applications/output-and-formatting',
        permanent: true
      },
      {
        source: '/docs/best-practices/tool-use',
        destination: '/docs/best-practices/practical-applications/tool-use',
        permanent: true
      },
      {
        source: '/docs/best-practices/thinking-and-reasoning',
        destination: '/docs/best-practices/practical-applications/thinking-and-reasoning',
        permanent: true
      },
      {
        source: '/docs/best-practices/agentic-systems',
        destination: '/docs/best-practices/advanced-topics/agentic-systems',
        permanent: true
      },
      {
        source: '/docs/best-practices/capability-tips-and-migration',
        destination: '/docs/best-practices/advanced-topics/capability-tips-and-migration',
        permanent: true
      }
    ]
  }
})
