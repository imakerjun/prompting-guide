import { SlideDesignSystemShell } from '../../../../components/SlideDesignSystemShell'
import { SystemCard, SystemSection } from '../../../../components/SlideDesignSystemUi'
import { SlideTemplateGallery } from '../../../../components/SlideTemplateGallery'
import { slidePatternCatalog } from '../../../../lib/slide-template-catalog.mjs'

export const metadata = { title: '슬라이드 디자인 시스템 Patterns' }

export default function SlidePatternsPage() {
  return (
    <SlideDesignSystemShell
      activeSection="patterns"
      title="Patterns"
      description="패턴은 컴포넌트 하나로는 전달력이 부족할 때 쓰는 고급 조합입니다. 비교, 연쇄, 매핑처럼 구조 자체가 메시지인 장면에서만 꺼내 쓰고, 그렇지 않으면 components 수준에서 끝내는 편이 더 깔끔합니다."
    >
      <SystemSection
        eyebrow="Escalation Rule"
        title="언제 컴포넌트에서 패턴으로 올라가야 하나"
        description="패턴은 예외 처리가 아니라 구조적 메시지를 표현하기 위한 조합입니다. 아래 세 가지 경우에만 의도적으로 밀도를 높입니다."
      >
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 14 }}>
          <SystemCard
            title="즉시 비교가 필요할 때"
            description="좋음/나쁨, Before/After를 발표자가 설명하기 전에 눈으로 먼저 보여줘야 하면 Compare Board를 씁니다."
          />
          <SystemCard
            title="단계가 곧 메시지일 때"
            description="명령과 결과가 연쇄적으로 변하거나, 단계별 전환이 메시지 자체일 때 Rule Chain을 씁니다."
          />
          <SystemCard
            title="매핑 표가 더 직관적일 때"
            description="상황별 추천 기법, 예전 방식과 새 방식처럼 관계를 구조로 보여줘야 하면 Pair/Migration 계열 패턴을 씁니다."
          />
        </div>
      </SystemSection>

      <SystemSection
        eyebrow="Approved Patterns"
        title="승인된 고급 조합 패턴"
        description="패턴은 raw div 조합을 마음대로 늘리기 위한 통로가 아니라, 자주 반복되는 복합 레이아웃을 승인된 형태로 재사용하기 위한 장치입니다."
      >
        <SlideTemplateGallery templates={slidePatternCatalog} />
      </SystemSection>
    </SlideDesignSystemShell>
  )
}
