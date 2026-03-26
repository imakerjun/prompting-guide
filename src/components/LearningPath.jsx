export function LearningPath() {
  const stepStyle = (bg, border) => ({
    background: bg,
    border: `2px solid ${border}`,
    borderRadius: 12,
    padding: '16px 20px',
    marginBottom: 8,
  })
  const labelStyle = (color) => ({
    fontSize: 12,
    fontWeight: 700,
    color: color,
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    marginBottom: 12,
  })
  const nodeStyle = (bg) => ({
    background: bg,
    borderRadius: 8,
    padding: '10px 16px',
    fontWeight: 600,
    fontSize: 15,
  })
  const tag = {
    fontWeight: 400,
    fontStyle: 'italic',
    opacity: 0.7,
  }
  const arrow = (color) => ({
    textAlign: 'center',
    fontSize: 18,
    color: color,
    lineHeight: '28px',
  })
  const bigArrow = {
    textAlign: 'center',
    fontSize: 20,
    color: '#999',
    lineHeight: '28px',
  }

  return (
    <div style={{ maxWidth: 480, margin: '0 auto' }}>
      {/* STEP 1 */}
      <div style={stepStyle('#f0f4ff', '#4a6fa5')}>
        <div style={labelStyle('#4a6fa5')}>STEP 1. 기초 — What & Why</div>
        <div style={nodeStyle('#dbe4f0')}>
          01 명확하고 직접적으로 <span style={tag}>What</span>
        </div>
        <div style={arrow('#4a6fa5')}>↓</div>
        <div style={nodeStyle('#dbe4f0')}>
          02 맥락 추가하기 <span style={tag}>Why</span>
        </div>
      </div>

      <div style={bigArrow}>↓</div>

      {/* STEP 2 */}
      <div style={stepStyle('#fff8f0', '#c47f17')}>
        <div style={labelStyle('#c47f17')}>STEP 2. 중급 — How, Structure & Who</div>
        <div style={nodeStyle('#ffecd2')}>
          03 예시 사용하기 <span style={tag}>How</span>
        </div>
        <div style={arrow('#c47f17')}>↓</div>
        <div style={nodeStyle('#ffecd2')}>
          04 XML 구조화 <span style={tag}>Structure</span>
        </div>
        <div style={arrow('#c47f17')}>↓</div>
        <div style={nodeStyle('#ffecd2')}>
          05 역할 부여하기 <span style={tag}>Who</span>
        </div>
      </div>

      <div style={bigArrow}>↓</div>

      {/* STEP 3 */}
      <div style={stepStyle('#f0fff4', '#2d7d46')}>
        <div style={labelStyle('#2d7d46')}>STEP 3. 고급 — Scale & Integration</div>
        <div style={nodeStyle('#d4edda')}>
          06 긴 컨텍스트 <span style={tag}>Scale</span>
        </div>
        <div style={arrow('#2d7d46')}>↓</div>
        <div style={nodeStyle('#d4edda')}>
          07 정체성 설정 <span style={tag}>= 전체 통합</span>
        </div>
      </div>
    </div>
  )
}
