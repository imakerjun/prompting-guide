import { SlideDesignSystemShell } from '../../../../components/SlideDesignSystemShell'
import { SystemCard, SystemSection } from '../../../../components/SlideDesignSystemUi'
import { SlideTemplateGallery } from '../../../../components/SlideTemplateGallery'
import {
  slideComponentCatalog,
  slideSelectionMatrix,
} from '../../../../lib/slide-template-catalog.mjs'

export const metadata = { title: '슬라이드 디자인 시스템 Components' }

export default function SlideComponentsPage() {
  return (
    <SlideDesignSystemShell
      activeSection="components"
      title="Components"
      description="컴포넌트는 새 슬라이드를 만들 때 가장 먼저 손에 쥐어야 하는 기본 단위입니다. 메시지 하나, 숫자 하나, 원리 하나처럼 한 장의 역할이 분명할 때는 여기서 끝내는 것이 가장 안정적입니다."
    >
      <SystemSection
        eyebrow="Selection Matrix"
        title="어떤 장면에 어떤 컴포넌트를 고를지 빠르게 결정하기"
        description="템플릿 이름이 아니라 장면의 의도를 기준으로 고릅니다. 먼저 아래 표에서 가장 가까운 신호를 찾고, 그다음 해당 컴포넌트로 내려가면 됩니다."
      >
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 14 }}>
          {slideSelectionMatrix.map(item => (
            <SystemCard key={item.signal} title={item.signal} description={item.avoid}>
              <div style={{ fontSize: 14, fontWeight: 800, color: '#9a3412' }}>추천: {item.choose}</div>
            </SystemCard>
          ))}
        </div>
      </SystemSection>

      <SystemSection
        eyebrow="Approved Components"
        title="승인된 기본 컴포넌트"
        description="이 컴포넌트들은 MDX에서 바로 호출할 수 있도록 열어둔 기본값입니다. 반복되는 raw markup 대신 여기서 시작해도 충분하도록 역할을 잘게 나눠두었습니다."
      >
        <SlideTemplateGallery templates={slideComponentCatalog} />
      </SystemSection>
    </SlideDesignSystemShell>
  )
}
