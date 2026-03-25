import { Footer, Layout, Navbar } from 'nextra-theme-docs'
import { Head } from 'nextra/components'
import { getPageMap } from 'nextra/page-map'
import 'nextra-theme-docs/style.css'
import './globals.css'

export const metadata = {
  title: {
    template: '%s — Prompt Engineering Guide'
  },
  description: 'Anthropic 프롬프트 엔지니어링 공식 가이드 (2026년 3월 아카이브)'
}

export default async function RootLayout({ children }) {
  const navbar = (
    <Navbar
      logo={
        <span style={{ fontWeight: 700 }}>
          Prompt Engineering Guide
          <span style={{ opacity: 0.5, fontWeight: 400, marginLeft: 8, fontSize: '0.85em' }}>
            2026.03
          </span>
        </span>
      }
    />
  )
  const pageMap = await getPageMap()
  return (
    <html lang="ko" dir="ltr" suppressHydrationWarning>
      <Head />
      <body>
        <Layout
          navbar={navbar}
          footer={
            <Footer>
              <div style={{ fontSize: '0.85em', opacity: 0.7 }}>
                이 문서는 Anthropic 프롬프트 엔지니어링 공식문서(2026년 3월 버전)를 교육 목적으로 아카이브한 것입니다.
                문서 UI는 업데이트될 수 있지만, 핵심 원리와 본질은 동일합니다.
              </div>
            </Footer>
          }
          sidebar={{ defaultMenuCollapseLevel: 2 }}
          toc={{ title: '이 페이지에서' }}
          editLink={null}
          feedback={{ content: null }}
          pageMap={pageMap}
        >
          {children}
        </Layout>
      </body>
    </html>
  )
}
