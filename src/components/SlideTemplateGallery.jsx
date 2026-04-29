'use client'

import { useState } from 'react'
import {
  SlideHero,
  SlideIllustrationWithCard,
  SlideMetric,
  SlidePrinciple,
  SlideSectionTitle,
  SlideSummary,
  SlideTextCenter,
  SlideTitleFollowsBody,
} from './SlideTemplates'
import { slideTemplateCatalog } from '../lib/slide-template-catalog.mjs'

function SlidePreviewFrame({ children }) {
  return (
    <div
      style={{
        width: '100%',
        aspectRatio: '16 / 9',
        borderRadius: 18,
        overflow: 'hidden',
        border: '1px solid #e9e9e7',
        background: '#ffffff',
        boxShadow: '0 16px 40px rgba(15, 23, 42, 0.08)',
      }}
    >
      <div className="slide-overlay slide-chrome-hidden" style={{ height: '100%', background: '#ffffff' }}>
        <div className="slide-frame" style={{ height: '100%', padding: '28px 32px', overflow: 'hidden' }}>
          {children}
        </div>
      </div>
    </div>
  )
}

function CompareBoardPreview() {
  return (
    <div className="slide-only">
      <div className="slide-compare-board">
        <div className="slide-compare-card bad">
          <span className="slide-compare-label">❌ 비효과적</span>
          <p className="slide-compare-copy">응답에 마크다운을 사용하지 마세요</p>
        </div>
        <div className="slide-compare-card good">
          <span className="slide-compare-label">✅ 효과적</span>
          <p className="slide-compare-copy">응답은 매끄럽게 흐르는 산문 문단으로 구성하세요.</p>
        </div>
      </div>
    </div>
  )
}

function FocusBoardPreview() {
  return (
    <div className="slide-only">
      <div className="slide-focus-board">
        <span className="slide-note-pill">핵심 원리</span>
        <p>하지 말라는 지시보다 <strong>어떻게 할지</strong>를 보여주세요.</p>
        <p className="muted">출력 형식을 제어하는 거의 모든 장면에 통하는 기본 원리입니다.</p>
      </div>
    </div>
  )
}

function RuleChainPreview() {
  return (
    <div className="slide-only">
      <div className="slide-rule-chain">
        <span className="slide-note-pill">부정형 지시의 무한 루프</span>
        <div className="slide-rule-step">
          <strong className="slide-rule-command">&quot;표 넣지 마&quot;</strong>
          <span className="slide-rule-arrow">→</span>
          <span className="slide-rule-result">불릿 포인트</span>
        </div>
        <div className="slide-rule-step">
          <strong className="slide-rule-command">&quot;불릿도 넣지 마&quot;</strong>
          <span className="slide-rule-arrow">→</span>
          <span className="slide-rule-result">번호 목록</span>
        </div>
        <p className="muted">하지 말라는 지시는 다른 형식으로 계속 비껴갑니다.</p>
      </div>
    </div>
  )
}

function PairBoardPreview() {
  return (
    <div className="slide-only">
      <div className="slide-pair-board">
        <div className="slide-pair-row">
          <span className="slide-pair-usage">한 문장 핵심 메시지</span>
          <span className="slide-pair-technique">Hero Card</span>
        </div>
        <div className="slide-pair-row">
          <span className="slide-pair-usage">숫자, 공식, 등식 강조</span>
          <span className="slide-pair-technique">Metric Card</span>
        </div>
        <div className="slide-pair-row">
          <span className="slide-pair-usage">좋음 vs 나쁨 즉시 비교</span>
          <span className="slide-pair-technique">Compare Board</span>
        </div>
      </div>
    </div>
  )
}

function MigrationBoardPreview() {
  return (
    <div className="slide-only">
      <div className="slide-migration-board">
        <span className="slide-note-pill">마이그레이션 흐름</span>
        <div className="slide-migration-grid">
          <div className="slide-migration-card">
            <strong>예전 방식</strong>
            <p>복사한 템플릿을 그대로 붙여넣기</p>
          </div>
          <div className="slide-migration-card">
            <strong>새 기본값</strong>
            <p>디자인 시스템에서 컴포넌트를 먼저 선택</p>
          </div>
          <div className="slide-migration-card">
            <strong>검증</strong>
            <p>check:slide-templates → build 순서로 마무리</p>
          </div>
        </div>
      </div>
    </div>
  )
}

const previewMap = {
  'hero-card': (
    <SlideHero
      label="약속 하나"
      highlight="원리를 이해하면 시행착오가 줄어듭니다"
      body="그 원리가 의외로 가까운 곳에 있거든요"
    />
  ),
  'metric-card': (
    <SlideMetric
      label="거울 효과"
      highlight="프롬프트 스타일 = 출력 스타일"
      body="마크다운 없는 답변을 원하면 프롬프트에서도 마크다운을 빼세요"
    />
  ),
  'principle-card': (
    <SlidePrinciple
      number="!"
      title="같은 목적, 다른 접근"
      body={'둘 다 "마크다운 없는 답변"을 원하지만 하나는 "하지 마", 하나는 "이렇게 해"입니다'}
    />
  ),
  'summary-card': (
    <SlideSummary
      title="오늘 OT의 여정"
      items={[
        '1. 공감 — "AI 답이 너무 뻔해서" 문제',
        '2. 약속 — 원리를 이해하면 달라지는 것',
        '3. Before / After 맛보기',
        '4. 차별점 — 원전 · 가추법 · 순서',
      ]}
    />
  ),
  'section-title': (
    <SlideSectionTitle>
      같은 요청인데, 결과가 왜 달라질까요?
    </SlideSectionTitle>
  ),
  'text-center': (
    <SlideTextCenter
      illustrationSrc="/illustrations/07-give-a-role/confused-worker.png"
      illustrationAlt="뻔한 답변에 답답한 직장인"
    >
      <p>
        AI한테 뭔가를 물어봤는데
        <br />
        <strong>답이 너무 뻔한 거예요.</strong>
      </p>
    </SlideTextCenter>
  ),
  'title-follows-body': (
    <SlideTitleFollowsBody>
      <h2>❌ Before — &quot;보고서 써줘&quot;</h2>
      <pre>{`보고서 써줘.`}</pre>
      <p>교과서를 펼쳐놓은 것 같은 일반적인 보고서가 나옵니다.</p>
    </SlideTitleFollowsBody>
  ),
  'illustration-with-card': (
    <SlideIllustrationWithCard
      illustrationSrc="/illustrations/07-give-a-role/bunshin.png"
      illustrationAlt="분신술"
      number="01"
      title="한 역할 = 한 프레임"
      body="역할을 주면 AI가 무엇을 우선해야 하는지 빠르게 정렬됩니다"
    />
  ),
  'compare-board': <CompareBoardPreview />,
  'focus-board': <FocusBoardPreview />,
  'rule-chain': <RuleChainPreview />,
  'pair-board': <PairBoardPreview />,
  'migration-board': <MigrationBoardPreview />,
}

function statusLabel(status) {
  if (status === 'advanced') return '고급'
  return '권장'
}

function statusStyles(status) {
  if (status === 'advanced') {
    return {
      background: '#fff7ed',
      color: '#9a3412',
      border: '1px solid #fdba74',
    }
  }

  return {
    background: '#ecfdf5',
    color: '#166534',
    border: '1px solid #86efac',
  }
}

function TemplateCard({ template, copiedId, onCopy }) {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: 24,
        padding: 24,
        borderRadius: 22,
        border: '1px solid #e9e9e7',
        background: '#ffffff',
        boxShadow: '0 12px 32px rgba(15, 23, 42, 0.05)',
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
          <span
            style={{
              padding: '4px 10px',
              borderRadius: 999,
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: '0.02em',
              ...statusStyles(template.status),
            }}
          >
            {statusLabel(template.status)}
          </span>
          <span style={{ fontSize: 12, color: '#787774', fontWeight: 600 }}>{template.group}</span>
        </div>

        <div>
          <h2 style={{ margin: 0, fontSize: 28, lineHeight: 1.2, color: '#1a1a1a' }}>{template.name}</h2>
          <p style={{ margin: '10px 0 0', fontSize: 16, lineHeight: 1.7, color: '#4a4a4a' }}>
            {template.description}
          </p>
        </div>

        <div
          style={{
            padding: '14px 16px',
            borderRadius: 14,
            background: '#f7f6f3',
            border: '1px solid #ecebe7',
          }}
        >
          <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.04em', color: '#787774', textTransform: 'uppercase' }}>
            언제 쓰나요
          </div>
          <p style={{ margin: '8px 0 0', fontSize: 15, lineHeight: 1.65, color: '#37352f' }}>
            {template.useWhen}
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <div style={{ fontSize: 13, color: '#787774' }}>
            루트 시그니처: <code>{template.rootSignature}</code>
          </div>
          {template.componentName ? (
            <div style={{ fontSize: 13, color: '#787774' }}>
              권장 호출: <code>{template.componentName}</code>
            </div>
          ) : (
            <div style={{ fontSize: 13, color: '#787774' }}>
              권장 호출: <code>SlideOnly + 승인된 raw class 조합</code>
            </div>
          )}
        </div>

        <div
          style={{
            padding: 16,
            borderRadius: 16,
            background: '#111827',
            color: '#f9fafb',
            position: 'relative',
          }}
        >
          <button
            type="button"
            onClick={() => onCopy(template.id, template.snippet)}
            style={{
              position: 'absolute',
              top: 12,
              right: 12,
              border: '1px solid rgba(255,255,255,0.12)',
              background: copiedId === template.id ? '#d97706' : 'rgba(255,255,255,0.08)',
              color: '#fff',
              borderRadius: 10,
              padding: '6px 10px',
              fontSize: 12,
              fontWeight: 700,
              cursor: 'pointer',
            }}
          >
            {copiedId === template.id ? '복사됨' : '스니펫 복사'}
          </button>
          <pre
            style={{
              margin: 0,
              overflowX: 'auto',
              fontSize: 13,
              lineHeight: 1.6,
              fontFamily: "'SFMono-Regular', Menlo, monospace",
            }}
          >
            <code>{template.snippet}</code>
          </pre>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.04em', color: '#787774', textTransform: 'uppercase' }}>
          미리보기
        </div>
        <SlidePreviewFrame>{previewMap[template.id]}</SlidePreviewFrame>
      </div>
    </div>
  )
}

export function SlideTemplateGallery({ templates = slideTemplateCatalog }) {
  const [copiedId, setCopiedId] = useState(null)

  const handleCopy = async (id, text) => {
    await navigator.clipboard.writeText(text)
    setCopiedId(id)
    window.setTimeout(() => {
      setCopiedId(current => (current === id ? null : current))
    }, 1600)
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
      {templates.map(template => (
        <TemplateCard
          key={template.id}
          template={template}
          copiedId={copiedId}
          onCopy={handleCopy}
        />
      ))}
    </div>
  )
}
