export const slideSystemSections = [
  {
    id: 'overview',
    label: 'Overview',
    href: '/studio/templates',
    description: '디자인 시스템의 목적과 빠른 진입 흐름',
  },
  {
    id: 'foundations',
    label: 'Foundations',
    href: '/studio/templates/foundations',
    description: '색, 타이포, 정렬 축, 밀도 같은 공통 기준',
  },
  {
    id: 'components',
    label: 'Components',
    href: '/studio/templates/components',
    description: 'MDX에서 바로 꺼내 쓰는 기본 슬라이드 컴포넌트',
  },
  {
    id: 'patterns',
    label: 'Patterns',
    href: '/studio/templates/patterns',
    description: '비교 보드, 체인 보드 같은 고급 조합 패턴',
  },
  {
    id: 'governance',
    label: 'Governance',
    href: '/studio/templates/governance',
    description: '변경 프로토콜, 검증 규칙, 승인 범위',
  },
]

export const slideDesignPrinciples = [
  {
    title: '한 슬라이드, 한 메시지',
    body: '슬라이드 한 장은 발표자의 한 호흡만 담당합니다. 메시지가 둘 이상이면 두 장으로 나눕니다.',
  },
  {
    title: '정렬 축은 하나로 유지',
    body: '본문이 왼쪽 정렬이면 제목도 같은 축을 따라갑니다. 한 화면 안에서 서로 다른 기준선이 싸우지 않게 합니다.',
  },
  {
    title: '카드보다 서사가 먼저',
    body: '템플릿은 모양이 아니라 전달 리듬을 고르기 위한 장치입니다. 먼저 장면의 역할을 결정한 뒤 컴포넌트를 선택합니다.',
  },
  {
    title: '비교는 클릭 없이 보여주기',
    body: 'Before/After, 좋음/나쁨은 탭보다 한 화면 비교를 우선합니다. 발표자가 설명하기 전에 차이가 보여야 합니다.',
  },
  {
    title: '예외는 카탈로그에 승격',
    body: '반복되는 새 레이아웃이 생기면 임시로 복붙하지 않고, 승인된 패턴으로 끌어올린 뒤 다시 사용합니다.',
  },
]

export const slideFoundationCollections = [
  {
    id: 'color',
    title: 'Color System',
    description: '강조 색은 한 계열만 밀고, 보조 표면은 그 강조 색의 희석 버전을 씁니다.',
    items: [
      {
        name: 'Primary Accent',
        token: '--slide-accent',
        value: '#d97706',
        role: '키 메시지, 숫자, 규칙 화살표를 강조할 때 씁니다.',
      },
      {
        name: 'Soft Surface',
        token: '--slide-accent-soft',
        value: 'rgba(217, 119, 6, 0.1)',
        role: 'Hero, Focus Board처럼 강조 배경이 필요하지만 과하게 채우면 안 되는 카드에 씁니다.',
      },
      {
        name: 'Accent Border',
        token: '--slide-accent-border',
        value: 'rgba(217, 119, 6, 0.3)',
        role: '카드 외곽선, summary 왼쪽 바, 비교 보드 주변선에 공통으로 사용합니다.',
      },
      {
        name: 'Neutral Surface',
        token: 'var(--notion-bg-secondary)',
        value: '#f7f6f3',
        role: '정보 밀도가 있는 summary, pair, migration 보드의 기본 표면입니다.',
      },
    ],
  },
  {
    id: 'type',
    title: 'Typography Hierarchy',
    description: '타이포 스케일은 역할에 따라 고정합니다. 중요도는 폰트 종류보다 크기와 축으로 만듭니다.',
    items: [
      {
        name: 'Hero Highlight',
        token: '.keyword-card.hero .keyword-highlight',
        value: '3.5em',
        role: '핵심 문장 한 줄을 화면의 주인공으로 만들 때 씁니다.',
      },
      {
        name: 'Metric Highlight',
        token: '.keyword-card.metric .keyword-highlight',
        value: '4em',
        role: '숫자, 공식, 등식처럼 단번에 기억돼야 하는 정보에 씁니다.',
      },
      {
        name: 'Principle Number',
        token: '.principle-number',
        value: '5em',
        role: '단계, 체크, 원리 번호를 시각적 앵커로 만들 때 씁니다.',
      },
      {
        name: 'Narrative Paragraph',
        token: '.slide-text-center > p',
        value: '2em',
        role: '감정선이 있는 짧은 문단이나 비유를 읽히게 할 때 씁니다.',
      },
    ],
  },
  {
    id: 'alignment',
    title: 'Alignment & Axes',
    description: '레이아웃은 가운데 서사형과 왼쪽 정보형 두 축으로 나눕니다. 두 축을 한 장에서 섞지 않습니다.',
    items: [
      {
        name: 'Centered Narrative',
        token: 'slide-text-center',
        value: 'Center Axis',
        role: '공감, 장면, 비유, 감정선이 있는 슬라이드에 씁니다.',
      },
      {
        name: 'Left Information',
        token: 'slide-title-follows-body',
        value: 'Left Axis',
        role: '코드, before/after, 설명형 본문처럼 읽는 방향이 분명해야 할 때 씁니다.',
      },
      {
        name: 'Section Break',
        token: 'slide-section-title / slide-section-title-left',
        value: 'Chapter Axis',
        role: '새 섹션 진입, 연습문제 시작, 정리 섹션 같은 흐름 전환점에 씁니다.',
      },
      {
        name: 'Illustration Pairing',
        token: 'slide-illustration-with-card',
        value: 'Dual Axis',
        role: '상징 이미지와 원리 카드를 같이 보여줘야 하는 비유 장면에 씁니다.',
      },
    ],
  },
  {
    id: 'density',
    title: 'Density Budget',
    description: '카드마다 허용 정보량을 다르게 둡니다. 정보량은 템플릿 선택 단계에서 결정합니다.',
    items: [
      {
        name: 'Hero',
        token: '1 headline + 1 support line',
        value: 'Low Density',
        role: '메시지 하나를 강하게 박는 장면. 설명은 발표자 노트로 넘깁니다.',
      },
      {
        name: 'Summary',
        token: '3 to 6 items',
        value: 'Medium Density',
        role: '아젠다, 요약, 단계 목록처럼 병렬 항목을 한꺼번에 정리할 때 적합합니다.',
      },
      {
        name: 'Compare Board',
        token: '2 columns only',
        value: 'Medium Density',
        role: '비교 대상을 두 개까지만 두고, 설명 문장은 각 칸에서 1~2개만 허용합니다.',
      },
      {
        name: 'Rule / Pair / Migration Boards',
        token: 'structured rows',
        value: 'High Density',
        role: '구조가 이미 정해진 패턴에서만 높은 정보 밀도를 허용합니다.',
      },
    ],
  },
]

export const slideCompositionRecipes = [
  {
    title: 'Opening Sequence',
    flow: 'Hero → Text Center → Hero',
    summary: '문제 인식, 공감, 약속을 짧은 리듬으로 밀어붙일 때 가장 안정적인 초반 구조입니다.',
  },
  {
    title: 'Principle Explanation',
    flow: 'Section Title → Text Center → Principle → Title Follows Body',
    summary: '섹션 전환 후 사례를 보여주고, 원리를 명시한 다음, 구체 예시나 코드로 내려가는 흐름입니다.',
  },
  {
    title: 'Contrast Sequence',
    flow: 'Section Title → Compare Board → Principle / Metric',
    summary: '차이를 먼저 보여주고, 그 뒤에 왜 그런지 원리를 정리하는 비교 중심 구조입니다.',
  },
  {
    title: 'Closing Sequence',
    flow: 'Summary → Metric → Hero',
    summary: '정리, 핵심 한 줄, 다음 행동 촉구를 순서대로 이어갈 때 마무리 힘이 좋아집니다.',
  },
]

export const slideSelectionMatrix = [
  {
    signal: '한 문장만 강하게 남기고 싶다',
    choose: 'SlideHero',
    avoid: 'Summary나 고급 보드로 정보량을 늘리지 않습니다.',
  },
  {
    signal: '숫자나 공식이 핵심이다',
    choose: 'SlideMetric',
    avoid: '서사형 Text Center로 숫자를 묻어버리지 않습니다.',
  },
  {
    signal: '원리나 체크리스트를 한 장씩 분리하고 싶다',
    choose: 'SlidePrinciple',
    avoid: 'Summary 한 장에 너무 많은 원리를 몰아넣지 않습니다.',
  },
  {
    signal: '항목 3~6개를 병렬로 훑게 하고 싶다',
    choose: 'SlideSummary',
    avoid: 'Hero 카드에 여러 문장을 욱여넣지 않습니다.',
  },
  {
    signal: '비유/상황/감정선이 중요하다',
    choose: 'SlideTextCenter',
    avoid: '정보형 카드로 바꿔 말맛을 잃지 않습니다.',
  },
  {
    signal: '좋은 예 vs 나쁜 예를 바로 보여줘야 한다',
    choose: 'Compare Board',
    avoid: 'Tabs나 여러 장 분리로 차이를 숨기지 않습니다.',
  },
]

export const slideGovernanceChecklist = [
  '새 슬라이드를 만들 때는 overview가 아니라 components 또는 patterns에서 시작합니다.',
  'SlideOnly 내부에 새 className을 추가하면 카탈로그, 거버넌스 문서, 검증 스크립트를 함께 갱신합니다.',
  '하나의 레이아웃이 두 번 이상 반복될 조짐이 보이면 raw markup에서 멈추지 말고 템플릿 또는 패턴으로 승격합니다.',
  '레이아웃 변경 후에는 슬라이드 MDX뿐 아니라 발표자 노트의 화면 설명도 현재 렌더 기준으로 맞춥니다.',
  'Before/After, 비교, 단계 체인은 고급 패턴을 우선 검토하고, 임시 div 조합을 새로 만들지 않습니다.',
  '최종 확인은 `npm run check:slide-templates` 와 `npm run build` 두 단계로 끝냅니다.',
]

export const slideChangeProtocol = [
  {
    step: '1. 문제 정의',
    detail: '기존 템플릿으로 해결되지 않는 레이아웃 문제인지 먼저 문장으로 적습니다.',
  },
  {
    step: '2. 가장 가까운 패턴 탐색',
    detail: 'components와 patterns를 확인해서 기존 디자인 언어 안에서 조합 가능한지 검토합니다.',
  },
  {
    step: '3. 새 패턴 승격',
    detail: '반복 가치가 있으면 카탈로그와 프리뷰, 승인 토큰 목록을 갱신하고 검증 스크립트가 아는 상태로 만듭니다.',
  },
  {
    step: '4. 산출물 반영',
    detail: '실제 강의 MDX와 발표자 노트, 작업 메모를 함께 업데이트합니다.',
  },
]

export const slideValidationCoverage = [
  {
    command: 'npm run check:slide-templates',
    guarantees: [
      'SlideOnly 내부에 승인되지 않은 class 토큰이 섞이지 않았는지 확인합니다.',
      '동적 className으로 검증을 우회하지 않았는지 확인합니다.',
    ],
  },
  {
    command: 'npm run build',
    guarantees: [
      '디자인 시스템 페이지와 MDX 컴포넌트 import가 실제 빌드에서 문제 없는지 확인합니다.',
      'production 빌드 앞단에서도 템플릿 검사가 자동으로 다시 실행됩니다.',
    ],
  },
]

export const slideAllowedTokenGroups = [
  {
    title: 'Core Cards',
    tokens: ['keyword-card', 'keyword-highlight', 'hero', 'metric', 'principle', 'principle-number', 'principle-body', 'summary', 'left-title'],
  },
  {
    title: 'Narrative & Titles',
    tokens: ['slide-text-center', 'slide-section-title', 'slide-section-title-left', 'slide-title-follows-body', 'slide-title-left', 'slide-breadcrumb'],
  },
  {
    title: 'Media & Support',
    tokens: ['slide-illustration', 'slide-illustration-with-card', 'small', 'muted', 'slide-note-pill', 'slide-tag-chip', 'slide-case-marker'],
  },
  {
    title: 'Pattern Boards',
    tokens: [
      'slide-compare-board',
      'slide-compare-card',
      'slide-compare-label',
      'slide-compare-copy',
      'slide-compare-list',
      'slide-comparison-caption',
      'bad',
      'good',
      'slide-focus-board',
      'slide-rule-chain',
      'slide-rule-step',
      'slide-rule-command',
      'slide-rule-arrow',
      'slide-rule-result',
      'slide-pair-board',
      'slide-pair-row',
      'slide-pair-usage',
      'slide-pair-technique',
      'slide-migration-board',
      'slide-migration-grid',
      'slide-migration-card',
      'metric-number',
    ],
  },
]

export const slideAuthoringRules = [
  '새 SlideOnly 블록은 이 디자인 시스템에서 승인된 컴포넌트 또는 패턴에서 시작합니다.',
  'SlideOnly 안에 새로운 className을 추가하려면 카탈로그와 검증 스크립트를 함께 갱신합니다.',
  '저장 후에는 `cd site && npm run check:slide-templates` 로 승인되지 않은 레이아웃이 섞이지 않았는지 확인합니다.',
]

export const slideTemplateCatalog = [
  {
    id: 'hero-card',
    kind: 'component',
    group: '핵심 카드',
    status: 'recommended',
    name: 'Hero Card',
    componentName: 'SlideHero',
    rootSignature: 'div.keyword-card.hero',
    description: '한 문장 핵심 메시지를 크게 밀어 올리는 대표 카드입니다.',
    useWhen: '도입, 전환, 약속, 결론처럼 메시지 하나가 화면을 지배해야 할 때',
    snippet: `<SlideHero
  label="약속 하나"
  highlight="원리를 이해하면 시행착오가 줄어듭니다"
  body="그 원리가 의외로 가까운 곳에 있거든요"
/>`,
  },
  {
    id: 'metric-card',
    kind: 'component',
    group: '핵심 카드',
    status: 'recommended',
    name: 'Metric Card',
    componentName: 'SlideMetric',
    rootSignature: 'div.keyword-card.metric',
    description: '숫자, 공식, 핵심 문장처럼 단번에 박혀야 하는 메시지를 강조합니다.',
    useWhen: '숫자 강조, 원리 공식, 핵심 takeaway를 단호하게 못 박을 때',
    snippet: `<SlideMetric
  label="거울 효과"
  highlight="프롬프트 스타일 = 출력 스타일"
  body="마크다운 없는 답변을 원하면 프롬프트에서도 마크다운을 빼세요"
/>`,
  },
  {
    id: 'principle-card',
    kind: 'component',
    group: '핵심 카드',
    status: 'recommended',
    name: 'Principle Card',
    componentName: 'SlidePrinciple',
    rootSignature: 'div.keyword-card.principle',
    description: '번호, 기호, 체크 표시와 함께 원리 하나를 또렷하게 소개합니다.',
    useWhen: '원칙, 단계, 추천 대상, 체크리스트 항목을 한 장씩 분리할 때',
    snippet: `<SlidePrinciple
  number="!"
  title="같은 목적, 다른 접근"
  body={'둘 다 "마크다운 없는 답변"을 원하지만 하나는 "하지 마", 하나는 "이렇게 해"입니다'}
/>`,
  },
  {
    id: 'summary-card',
    kind: 'component',
    group: '핵심 카드',
    status: 'recommended',
    name: 'Summary Card',
    componentName: 'SlideSummary',
    rootSignature: 'div.keyword-card.summary',
    description: '복수 항목을 같은 리듬으로 정리할 때 쓰는 리스트형 카드입니다.',
    useWhen: '아젠다, 정리, 단계 요약처럼 3~6개 항목을 한 화면에 묶을 때',
    snippet: `<SlideSummary
  title="오늘 OT의 여정"
  items={[
    '1. 공감 — "AI 답이 너무 뻔해서" 문제',
    '2. 약속 — 원리를 이해하면 달라지는 것',
    '3. Before / After 맛보기',
    '4. 차별점 — 원전 · 가추법 · 순서',
  ]}
/>`,
  },
  {
    id: 'section-title',
    kind: 'component',
    group: '서사 레이아웃',
    status: 'recommended',
    name: 'Section Title',
    componentName: 'SlideSectionTitle',
    rootSignature: 'h2.slide-section-title',
    description: '새 섹션의 시작을 크게 끊어주는 챕터 전환용 제목입니다.',
    useWhen: '섹션 시작, 챕터 전환, 분위기 리셋이 필요할 때',
    snippet: `<SlideSectionTitle>
  같은 요청인데, 결과가 왜 달라질까요?
</SlideSectionTitle>`,
  },
  {
    id: 'text-center',
    kind: 'component',
    group: '서사 레이아웃',
    status: 'recommended',
    name: 'Centered Statement',
    componentName: 'SlideTextCenter',
    rootSignature: 'div.slide-text-center',
    description: '이미지와 짧은 문장을 조합해 감정이나 상황을 서사적으로 전달합니다.',
    useWhen: '문제 제기, 공감, 비유, 사례 도입처럼 말맛이 중요한 장면',
    snippet: `<SlideTextCenter
  illustrationSrc="/illustrations/07-give-a-role/confused-worker.png"
  illustrationAlt="뻔한 답변에 답답한 직장인"
>
  <p>
    AI한테 뭔가를 물어봤는데<br />
    <strong>답이 너무 뻔한 거예요.</strong>
  </p>
</SlideTextCenter>`,
  },
  {
    id: 'title-follows-body',
    kind: 'component',
    group: '서사 레이아웃',
    status: 'recommended',
    name: 'Title Follows Body',
    componentName: 'SlideTitleFollowsBody',
    rootSignature: 'div.slide-title-follows-body',
    description: '제목과 본문을 같은 왼쪽 축으로 맞춰 코드, 예문, before/after를 설명합니다.',
    useWhen: '코드 블록, 프롬프트 비교, 본문 카드가 왼쪽 정렬이어야 하는 장면',
    snippet: `<SlideTitleFollowsBody>
  <h2>❌ Before — "보고서 써줘"</h2>
  <pre>{\`\`\`
보고서 써줘.
\`\`\`}</pre>
  <p>교과서를 펼쳐놓은 것 같은 일반적인 보고서가 나옵니다.</p>
</SlideTitleFollowsBody>`,
  },
  {
    id: 'illustration-with-card',
    kind: 'component',
    group: '서사 레이아웃',
    status: 'recommended',
    name: 'Illustration + Card',
    componentName: 'SlideIllustrationWithCard',
    rootSignature: 'div.slide-illustration-with-card',
    description: '캐릭터 일러스트와 principle 카드를 나란히 두어 은유를 강하게 만듭니다.',
    useWhen: '비유, 캐릭터 중심 설명, 상징적 장면이 필요한 원리 소개',
    snippet: `<SlideIllustrationWithCard
  illustrationSrc="/illustrations/07-give-a-role/bunshin.png"
  illustrationAlt="분신술"
  number="01"
  title="한 역할 = 한 프레임"
  body="역할을 주면 AI가 무엇을 우선해야 하는지 빠르게 정렬됩니다"
/>`,
  },
  {
    id: 'compare-board',
    kind: 'pattern',
    group: '비교 패턴',
    status: 'advanced',
    name: 'Compare Board',
    componentName: null,
    rootSignature: 'div.slide-compare-board',
    description: '좋은 예와 나쁜 예를 한 화면에서 즉시 비교하게 만드는 2열 보드입니다.',
    useWhen: 'Before / After, 비효율 / 효율, 실수 / 개선안을 즉시 대비시킬 때',
    snippet: `<SlideOnly>
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
</SlideOnly>`,
  },
  {
    id: 'focus-board',
    kind: 'pattern',
    group: '강조 패턴',
    status: 'advanced',
    name: 'Focus Board',
    componentName: null,
    rootSignature: 'div.slide-focus-board',
    description: '짧은 규칙과 보조 설명을 한 덩어리로 집중시켜 보여주는 보드입니다.',
    useWhen: '원리 하나를 짧고 크게 강조하되, 보조 문장 한 줄이 꼭 필요할 때',
    snippet: `<SlideOnly>
  <div className="slide-focus-board">
    <span className="slide-note-pill">핵심 원리</span>
    <p>하지 말라는 지시보다 <strong>어떻게 할지</strong>를 보여주세요.</p>
    <p className="muted">출력 형식을 제어하는 거의 모든 장면에 통하는 기본 원리입니다.</p>
  </div>
</SlideOnly>`,
  },
  {
    id: 'rule-chain',
    kind: 'pattern',
    group: '흐름 패턴',
    status: 'advanced',
    name: 'Rule Chain',
    componentName: null,
    rootSignature: 'div.slide-rule-chain',
    description: '명령과 결과가 연쇄적으로 바뀌는 구조를 단계 보드로 보여주는 패턴입니다.',
    useWhen: '부정형 지시의 함정, 단계별 결과 변화, 규칙 전개를 설명할 때',
    snippet: `<SlideOnly>
  <div className="slide-rule-chain">
    <span className="slide-note-pill">부정형 지시의 무한 루프</span>
    <div className="slide-rule-step">
      <strong className="slide-rule-command">"표 넣지 마"</strong>
      <span className="slide-rule-arrow">→</span>
      <span className="slide-rule-result">불릿 포인트</span>
    </div>
    <div className="slide-rule-step">
      <strong className="slide-rule-command">"불릿도 넣지 마"</strong>
      <span className="slide-rule-arrow">→</span>
      <span className="slide-rule-result">번호 목록</span>
    </div>
    <p className="muted">하지 말라는 지시는 다른 형식으로 계속 비껴갑니다.</p>
  </div>
</SlideOnly>`,
  },
  {
    id: 'pair-board',
    kind: 'pattern',
    group: '매핑 패턴',
    status: 'advanced',
    name: 'Pair Board',
    componentName: null,
    rootSignature: 'div.slide-pair-board',
    description: '사용 상황과 추천 기법을 짝지어 보여주는 2열 매핑 패턴입니다.',
    useWhen: '상황별 기법 매핑, 무엇을 언제 쓸지 표처럼 비교할 때',
    snippet: `<SlideOnly>
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
</SlideOnly>`,
  },
  {
    id: 'migration-board',
    kind: 'pattern',
    group: '매핑 패턴',
    status: 'advanced',
    name: 'Migration Board',
    componentName: null,
    rootSignature: 'div.slide-migration-board',
    description: '기존 방식과 새 방식을 단계별 카드로 정리하는 마이그레이션 전용 패턴입니다.',
    useWhen: '구버전 → 신버전, 기존 습관 → 새 원칙 전환을 안내할 때',
    snippet: `<SlideOnly>
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
</SlideOnly>`,
  },
]

export const slideComponentCatalog = slideTemplateCatalog.filter(template => template.kind === 'component')
export const slidePatternCatalog = slideTemplateCatalog.filter(template => template.kind === 'pattern')

export const allowedSlideClassTokens = [
  'bad',
  'good',
  'hero',
  'keyword-card',
  'keyword-highlight',
  'left-title',
  'metric',
  'metric-number',
  'muted',
  'principle',
  'principle-body',
  'principle-number',
  'slide-breadcrumb',
  'slide-case-marker',
  'slide-compare-board',
  'slide-compare-card',
  'slide-compare-copy',
  'slide-compare-label',
  'slide-compare-list',
  'slide-comparison-caption',
  'slide-focus-board',
  'slide-illustration',
  'slide-illustration-with-card',
  'slide-migration-board',
  'slide-migration-card',
  'slide-migration-grid',
  'slide-note-pill',
  'slide-pair-board',
  'slide-pair-row',
  'slide-pair-technique',
  'slide-pair-usage',
  'slide-rule-arrow',
  'slide-rule-chain',
  'slide-rule-command',
  'slide-rule-result',
  'slide-rule-step',
  'slide-section-title',
  'slide-section-title-left',
  'slide-tag-chip',
  'slide-text-center',
  'slide-title-follows-body',
  'slide-title-left',
  'small',
  'summary',
]
