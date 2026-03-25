'use client'

import { useState } from 'react'

export function Quiz({ question, hint, answer, children }) {
  const [userAnswer, setUserAnswer] = useState('')
  const [submitted, setSubmitted] = useState(false)

  return (
    <div className="quiz-block">
      <div className="quiz-question">
        {children}
      </div>

      {hint && (
        <p className="quiz-hint">💡 힌트: {hint}</p>
      )}

      <textarea
        className="quiz-input"
        placeholder="여기에 프롬프트를 작성해보세요..."
        value={userAnswer}
        onChange={(e) => setUserAnswer(e.target.value)}
        rows={4}
      />

      <button
        className="quiz-submit"
        onClick={() => setSubmitted(true)}
        disabled={!userAnswer.trim()}
      >
        정답 확인하기
      </button>

      {submitted && (
        <div className="quiz-answer">
          <div className="quiz-answer-label">✅ 정답 예시</div>
          <div className="quiz-answer-content">
            {answer}
          </div>
          {userAnswer.trim() && (
            <p className="quiz-compare-note">
              내가 작성한 프롬프트와 정답 예시를 비교해보세요. 정답은 하나가 아닙니다 — 핵심 원칙이 반영되었다면 좋은 프롬프트입니다!
            </p>
          )}
        </div>
      )}
    </div>
  )
}
