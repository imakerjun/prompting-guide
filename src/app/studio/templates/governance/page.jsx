import { SlideDesignSystemShell } from '../../../../components/SlideDesignSystemShell'
import { SystemCard, SystemSection, SystemChip } from '../../../../components/SlideDesignSystemUi'
import {
  slideAllowedTokenGroups,
  slideAuthoringRules,
  slideChangeProtocol,
  slideGovernanceChecklist,
  slideValidationCoverage,
} from '../../../../lib/slide-template-catalog.mjs'

export const metadata = { title: '슬라이드 디자인 시스템 Governance' }

export default function SlideGovernancePage() {
  return (
    <SlideDesignSystemShell
      activeSection="governance"
      title="Governance"
      description="디자인 시스템이 문서로만 끝나지 않도록, 실제 작업 절차와 검증 기준을 이 페이지에서 관리합니다. 새 패턴을 추가하거나 레이아웃을 바꿀 때 무엇을 같이 업데이트해야 하는지, 어떤 범위까지 자동으로 보호되는지를 여기서 명시합니다."
    >
      <SystemSection
        eyebrow="Authoring Rules"
        title="기본 작업 규칙"
        description="작업자가 바뀌어도 같은 기준으로 움직이도록, 가장 자주 잊히는 규칙만 짧게 고정해둔 목록입니다."
      >
        <SystemCard tone="warm">
          <ul style={{ margin: 0, paddingLeft: 20, color: '#7c2d12', lineHeight: 1.85, fontSize: 15 }}>
            {slideAuthoringRules.concat(slideGovernanceChecklist).map(rule => (
              <li key={rule}>{rule}</li>
            ))}
          </ul>
        </SystemCard>
      </SystemSection>

      <SystemSection
        eyebrow="Change Protocol"
        title="새 패턴을 추가할 때의 순서"
        description="이 순서를 밟으면 일회성 레이아웃이 난립하지 않고, 정말 반복 가치가 있는 것만 시스템으로 승격시킬 수 있습니다."
      >
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 14 }}>
          {slideChangeProtocol.map(item => (
            <SystemCard key={item.step} title={item.step} description={item.detail} />
          ))}
        </div>
      </SystemSection>

      <SystemSection
        eyebrow="Validation"
        title="지금 자동으로 보호되는 범위"
        description="검증 스크립트는 단순히 명령 한 줄이 아니라, 어떤 변경이 시스템 밖으로 새는지를 빠르게 잡아내는 안전장치입니다."
      >
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 14 }}>
          {slideValidationCoverage.map(item => (
            <SystemCard key={item.command} title={item.command}>
              <ul style={{ margin: 0, paddingLeft: 20, color: '#4b5563', lineHeight: 1.8, fontSize: 15 }}>
                {item.guarantees.map(guarantee => (
                  <li key={guarantee}>{guarantee}</li>
                ))}
              </ul>
            </SystemCard>
          ))}
        </div>
      </SystemSection>

      <SystemSection
        eyebrow="Approved Token Space"
        title="승인된 SlideOnly class 토큰 영역"
        description="검증 스크립트는 아래 그룹에 있는 토큰만 승인합니다. 새 class를 추가하려면 이 그룹 정의와 카탈로그를 함께 갱신해야 합니다."
      >
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 14 }}>
          {slideAllowedTokenGroups.map(group => (
            <SystemCard key={group.title} title={group.title}>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {group.tokens.map(token => (
                  <SystemChip key={token}>{token}</SystemChip>
                ))}
              </div>
            </SystemCard>
          ))}
        </div>
      </SystemSection>
    </SlideDesignSystemShell>
  )
}
