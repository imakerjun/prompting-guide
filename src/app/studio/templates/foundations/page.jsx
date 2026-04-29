import { SlideDesignSystemShell } from '../../../../components/SlideDesignSystemShell'
import { SystemCard, SystemSection, SystemChip } from '../../../../components/SlideDesignSystemUi'
import {
  slideCompositionRecipes,
  slideFoundationCollections,
} from '../../../../lib/slide-template-catalog.mjs'

export const metadata = { title: '슬라이드 디자인 시스템 Foundations' }

export default function SlideFoundationsPage() {
  return (
    <SlideDesignSystemShell
      activeSection="foundations"
      title="Foundations"
      description="이 페이지는 레이아웃을 고르기 전에 먼저 합의해야 하는 기준을 모아둔 곳입니다. 색, 타이포, 정렬 축, 정보 밀도 같은 기반 규칙을 먼저 고정해두면, 이후 컴포넌트를 골라도 결과가 훨씬 일관됩니다."
    >
      <SystemSection
        eyebrow="Foundation Sets"
        title="공통으로 고정해야 하는 네 가지 기반"
        description="카드 디자인보다 더 먼저 결정해야 하는 기준입니다. 같은 템플릿을 써도 이 기반이 흔들리면 최종 화면은 금방 달라집니다."
      >
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 14 }}>
          {slideFoundationCollections.map(collection => (
            <SystemCard key={collection.id} title={collection.title} description={collection.description}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {collection.items.map(item => (
                  <div key={item.name} style={{ padding: 14, borderRadius: 14, background: '#f9fafb', border: '1px solid #ecebe7' }}>
                    <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap', marginBottom: 6 }}>
                      <strong style={{ fontSize: 14, color: '#111827' }}>{item.name}</strong>
                      <SystemChip tone="accent">{item.value}</SystemChip>
                    </div>
                    <div style={{ fontSize: 13, color: '#9a3412', fontWeight: 700, marginBottom: 6 }}>
                      {item.token}
                    </div>
                    <p style={{ margin: 0, fontSize: 14, lineHeight: 1.65, color: '#4b5563' }}>{item.role}</p>
                  </div>
                ))}
              </div>
            </SystemCard>
          ))}
        </div>
      </SystemSection>

      <SystemSection
        eyebrow="Recipes"
        title="권장 슬라이드 리듬"
        description="디자인 시스템은 개별 장표뿐 아니라 장표 간 연결 리듬도 다룹니다. 아래 레시피는 실제 강의 흐름에서 자주 반복되는 안정적인 조합입니다."
      >
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 14 }}>
          {slideCompositionRecipes.map(recipe => (
            <SystemCard key={recipe.title} title={recipe.title} description={recipe.summary}>
              <SystemChip tone="success">{recipe.flow}</SystemChip>
            </SystemCard>
          ))}
        </div>
      </SystemSection>

      <SystemSection
        eyebrow="Decision Rule"
        title="가운데 축과 왼쪽 축을 먼저 결정하세요"
        description="실무에서 가장 자주 깨지는 부분이 바로 정렬 축입니다. 섹션 제목, 카드, 코드 블록, 설명 문단이 한 슬라이드 안에서 서로 다른 기준선을 잡기 시작하면 화면이 급격히 산만해집니다."
      >
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 14 }}>
          <SystemCard
            title="가운데 축"
            description="문제 제기, 공감, 비유, 감정선이 중요한 장면은 가운데 축으로 갑니다. 대표 컴포넌트는 Hero와 Text Center입니다."
          />
          <SystemCard
            title="왼쪽 축"
            description="코드, 비교, 설명형 정보처럼 읽는 방향이 분명해야 하는 장면은 왼쪽 축으로 갑니다. 대표 컴포넌트는 Title Follows Body와 Summary입니다."
          />
          <SystemCard
            title="혼합 금지"
            description="본문 카드가 왼쪽인데 제목만 가운데 두는 식의 혼합은 피합니다. 같은 축으로 정렬되도록 먼저 foundation에서 결정하고 내려갑니다."
            tone="warm"
          />
        </div>
      </SystemSection>
    </SlideDesignSystemShell>
  )
}
