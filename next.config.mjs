import nextra from 'nextra'

const withNextra = nextra({
  latex: true,
  search: {
    codeblocks: true
  },
  contentDirBasePath: '/docs'
})

export default withNextra({
  reactStrictMode: true
})
