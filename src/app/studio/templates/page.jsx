import Link from 'next/link'
import { SlideDesignSystemShell } from '../../../components/SlideDesignSystemShell'
import { SystemCard, SystemMetricCard, SystemSection, SystemChip } from '../../../components/SlideDesignSystemUi'
import {
  allowedSlideClassTokens,
  slideComponentCatalog,
  slideDesignPrinciples,
  slideGovernanceChecklist,
  slidePatternCatalog,
  slideSystemSections,
} from '../../../lib/slide-template-catalog.mjs'

export const metadata = { title: '슬라이드 디자인 시스템' }

export default function SlideDesignSystemOverviewPage() {
  return (
    <SlideDesignSystemShell
      activeSection="overview"
      title="슬라이드 디자인 시스템"
      description="슬라이드를 개별 장표가 아니라 시스템으로 관리하기 위한 개발 전용 허브입니다. foundations에서 기준을 보고, components와 patterns에서 승인된 화면 조합을 고른 뒤, governance 규칙으로 검증까지 닫는 흐름으로 맞춥니다."
    >
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: 14,
        }}
      >
        <SystemMetricCard label="Foundations" value="4" hint="색, 타이포, 정렬 축, 밀도 예산" />
        <SystemMetricCard label="Components" value={String(slideComponentCatalog.length)} hint="MDX에서 바로 쓰는 기본 컴포넌트" />
        <SystemMetricCard label="Patterns" value={String(slidePatternCatalog.length)} hint="비교, 체인, 마이그레이션 같은 고급 조합" />
        <SystemMetricCard label="Allowed Tokens" value={String(allowedSlideClassTokens.length)} hint="검증 스크립트가 승인한 SlideOnly 클래스 토큰 수" />
      </div>

      <SystemSection
        eyebrow="Quick Start"
        title="이제는 템플릿 페이지가 아니라 설계된 진입 순서로 봅니다"
        description="슬라이드를 새로 만들 때마다 먼저 어디서 판단해야 하는지를 고정해두면, 작업자에 따라 화면 리듬이 흔들리는 일을 많이 줄일 수 있습니다."
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: 14,
          }}
        >
          <SystemCard
            title="1. Foundations"
            description="이 장면이 가운데 서사형인지, 왼쪽 정보형인지 먼저 결정합니다. 이 단계에서 밀도와 정렬 축이 정해집니다."
          >
            <Link href="/studio/templates/foundations" style={{ color: '#d97706', fontWeight: 800, textDecoration: 'none' }}>
              Foundations 보기 →
            </Link>
          </SystemCard>
          <SystemCard
            title="2. Components / Patterns"
            description="메시지 하나면 component, 비교나 단계 구조가 필요하면 pattern으로 올라갑니다. 여기서 실제 화면 조합을 선택합니다."
          >
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              <Link href="/studio/templates/components" style={{ color: '#d97706', fontWeight: 800, textDecoration: 'none' }}>
                Components →
              </Link>
              <Link href="/studio/templates/patterns" style={{ color: '#d97706', fontWeight: 800, textDecoration: 'none' }}>
                Patterns →
              </Link>
            </div>
          </SystemCard>
          <SystemCard
            title="3. Governance"
            description="새 패턴이 필요한지, 검증 스크립트는 무엇을 보장하는지, 어떤 변경을 함께 남겨야 하는지 마지막에 점검합니다."
          >
            <Link href="/studio/templates/governance" style={{ color: '#d97706', fontWeight: 800, textDecoration: 'none' }}>
              Governance 보기 →
            </Link>
          </SystemCard>
        </div>
      </SystemSection>

      <SystemSection
        eyebrow="Principles"
        title="이 시스템이 지키려는 핵심 원칙"
        description="컴포넌트 개수가 많아져도 결국 이 원칙을 보호하기 위한 도구여야 합니다. 새 패턴을 추가할 때도 먼저 이 다섯 가지를 기준으로 봅니다."
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: 14,
          }}
        >
          {slideDesignPrinciples.map(principle => (
            <SystemCard key={principle.title} title={principle.title} description={principle.body} />
          ))}
        </div>
      </SystemSection>

      <SystemSection
        eyebrow="System Map"
        title="페이지별 책임 분리"
        description="한 페이지에 다 몰아두지 않고, 의사결정 종류에 따라 역할을 분리했습니다. 그래서 작업 중에도 어떤 질문을 어디서 해결해야 하는지 바로 찾을 수 있습니다."
      >
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 14 }}>
          {slideSystemSections.map(section => (
            <SystemCard key={section.id} title={section.label} description={section.description}>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                <SystemChip tone={section.id === 'overview' ? 'accent' : 'neutral'}>
                  {section.id === 'overview' ? '현재 페이지' : section.id}
                </SystemChip>
                {section.id !== 'overview' ? (
                  <Link href={section.href} style={{ color: '#d97706', fontWeight: 800, textDecoration: 'none' }}>
                    열기 →
                  </Link>
                ) : null}
              </div>
            </SystemCard>
          ))}
        </div>
      </SystemSection>

      <SystemSection
        eyebrow="Guardrails"
        title="작업자가 바뀌어도 흔들리지 않게 하는 장치"
        description="지금 이 시스템은 화면 카탈로그와 검증 스크립트가 서로 같은 승인 범위를 공유하도록 맞춰져 있습니다."
      >
        <SystemCard
          title="거버넌스 핵심 체크"
          description="디자인 시스템이 그냥 문서가 아니라 실제 작업 프로세스로 작동하려면, 화면 선택과 검증이 같은 언어를 써야 합니다."
          tone="warm"
        >
          <ul style={{ margin: 0, paddingLeft: 20, color: '#7c2d12', lineHeight: 1.8, fontSize: 15 }}>
            {slideGovernanceChecklist.slice(0, 4).map(rule => (
              <li key={rule}>{rule}</li>
            ))}
          </ul>
        </SystemCard>
      </SystemSection>
    </SlideDesignSystemShell>
  )
}
