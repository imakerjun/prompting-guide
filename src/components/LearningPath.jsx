export function LearningPath() {
  return (
    <div className="lp-container">
      {/* STEP 1 */}
      <div className="lp-step lp-step--blue">
        <div className="lp-step-header">
          <span className="lp-step-badge lp-step-badge--blue">STEP 1</span>
          <span className="lp-step-title">기초 — What & Why</span>
        </div>
        <div className="lp-nodes">
          <div className="lp-node lp-node--blue">
            <span className="lp-node-num">01</span>
            <span className="lp-node-title">명확하고 직접적으로</span>
            <span className="lp-node-tag">What</span>
          </div>
          <div className="lp-connector lp-connector--blue" />
          <div className="lp-node lp-node--blue">
            <span className="lp-node-num">02</span>
            <span className="lp-node-title">맥락 추가하기</span>
            <span className="lp-node-tag">Why</span>
          </div>
        </div>
      </div>

      <div className="lp-bridge">
        <div className="lp-bridge-line" />
      </div>

      {/* STEP 2 */}
      <div className="lp-step lp-step--amber">
        <div className="lp-step-header">
          <span className="lp-step-badge lp-step-badge--amber">STEP 2</span>
          <span className="lp-step-title">중급 — How, Structure & Who</span>
        </div>
        <div className="lp-nodes">
          <div className="lp-node lp-node--amber">
            <span className="lp-node-num">03</span>
            <span className="lp-node-title">예시 사용하기</span>
            <span className="lp-node-tag">How</span>
          </div>
          <div className="lp-connector lp-connector--amber" />
          <div className="lp-node lp-node--amber">
            <span className="lp-node-num">04</span>
            <span className="lp-node-title">XML 구조화</span>
            <span className="lp-node-tag">Structure</span>
          </div>
          <div className="lp-connector lp-connector--amber" />
          <div className="lp-node lp-node--amber">
            <span className="lp-node-num">05</span>
            <span className="lp-node-title">역할 부여하기</span>
            <span className="lp-node-tag">Who</span>
          </div>
        </div>
      </div>

      <div className="lp-bridge">
        <div className="lp-bridge-line" />
      </div>

      {/* STEP 3 */}
      <div className="lp-step lp-step--green">
        <div className="lp-step-header">
          <span className="lp-step-badge lp-step-badge--green">STEP 3</span>
          <span className="lp-step-title">고급 — Scale & Integration</span>
        </div>
        <div className="lp-nodes">
          <div className="lp-node lp-node--green">
            <span className="lp-node-num">06</span>
            <span className="lp-node-title">긴 컨텍스트</span>
            <span className="lp-node-tag">Scale</span>
          </div>
          <div className="lp-connector lp-connector--green" />
          <div className="lp-node lp-node--green lp-node--final">
            <span className="lp-node-num">07</span>
            <span className="lp-node-title">정체성 설정</span>
            <span className="lp-node-tag lp-node-tag--accent">= 전체 통합</span>
          </div>
        </div>
      </div>
    </div>
  )
}
