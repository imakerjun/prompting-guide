'use client'

import { useSearchParams, useRouter } from 'next/navigation'
import { useState, useEffect, useRef, useCallback, Suspense } from 'react'

const LECTURE_MAP = {
  'orientation': { title: '0강. 강의 소개', script: '00-OT-강의-소개-스크립트.md' },
  'index': { title: '1강. PE 개요', script: '01-프롬프트-엔지니어링-개요-스크립트.md' },
  'best-practices': { title: '2강. 첫 초안', script: '02-첫-초안-프롬프트-스크립트.md' },
  'be-clear-and-direct': { title: '3강. 명확하고 직접적으로', script: '03-명확하고-직접적으로-스크립트.md' },
  'add-context': { title: '4강. 맥락 추가', script: '04-맥락을-추가하여-성능-향상-스크립트.md' },
  'use-examples': { title: '5강. 예시 사용', script: '05-예시를-효과적으로-사용하기-스크립트.md' },
  'xml-tags': { title: '6강. XML 태그', script: '06-XML-태그로-프롬프트-구조화-스크립트.md' },
  'give-a-role': { title: '7강. 역할 부여', script: '07-Claude에게-역할-부여하기-스크립트.md' },
  'long-context': { title: '8강. 긴 컨텍스트', script: '08-긴-컨텍스트-프롬프팅-스크립트.md' },
  'model-self-knowledge': { title: '9강. 정체성 설정', script: '09-AI에게-정체성-설정하기-스크립트.md' },
  'output-and-formatting': { title: '10강. 출력과 형식', script: '10-출력과-형식-스크립트.md' },
  'tool-use': { title: '11강. 도구 사용', script: '11-도구-사용-스크립트.md' },
  'thinking-and-reasoning': { title: '12강. 사고와 추론', script: '12-사고와-추론-스크립트.md' },
  'agentic-systems': { title: '13강. 에이전트 시스템', script: '13-에이전트-시스템-스크립트.md' },
  'capability-tips-and-migration': { title: '14-15강. 기능별 팁 & 마이그레이션', script: '14-기능별-팁-스크립트.md' },
}

const SLUG_TO_DOC_PATH = {
  'orientation': '/docs',
  'index': '/docs',
  'best-practices': '/docs/best-practices',
  'be-clear-and-direct': '/docs/best-practices/general-principles/be-clear-and-direct',
  'add-context': '/docs/best-practices/general-principles/add-context',
  'use-examples': '/docs/best-practices/general-principles/use-examples',
  'xml-tags': '/docs/best-practices/general-principles/xml-tags',
  'give-a-role': '/docs/best-practices/general-principles/give-a-role',
  'long-context': '/docs/best-practices/general-principles/long-context',
  'model-self-knowledge': '/docs/best-practices/general-principles/model-self-knowledge',
  'output-and-formatting': '/docs/best-practices/practical-applications/output-and-formatting',
  'tool-use': '/docs/best-practices/practical-applications/tool-use',
  'thinking-and-reasoning': '/docs/best-practices/practical-applications/thinking-and-reasoning',
  'agentic-systems': '/docs/best-practices/advanced-topics/agentic-systems',
  'capability-tips-and-migration': '/docs/best-practices/advanced-topics/capability-tips-and-migration',
}

// presenter-notes 파일명 매핑
const SLUG_TO_NOTES = {
  'orientation': 'orientation',
  'index': 'prompt-engineering-overview',
  'best-practices': 'first-draft-prompt',
  'be-clear-and-direct': 'be-clear-and-direct',
  'add-context': 'add-context',
  'use-examples': 'use-examples',
  'xml-tags': 'xml-tags',
  'give-a-role': 'give-a-role',
  'long-context': 'long-context',
  'model-self-knowledge': 'model-self-knowledge',
  'output-and-formatting': 'output-and-formatting',
  'tool-use': 'tool-use',
  'thinking-and-reasoning': 'thinking-and-reasoning',
  'agentic-systems': 'agentic-systems',
  'capability-tips-and-migration': 'capability-tips',
}

function parseScript(text) {
  const sections = []
  let current = null
  for (const line of text.split('\n')) {
    const match = line.match(/^## 슬라이드\s+(\d+)(?:~\d+)?:\s*(.*)/)
    if (match) {
      if (current) sections.push(current)
      current = { num: parseInt(match[1]), title: match[2].trim(), body: '' }
    } else if (current) {
      current.body += line + '\n'
    }
  }
  if (current) sections.push(current)
  return sections
}

function parseNotes(text) {
  const sections = []
  let current = null
  for (const line of text.split('\n')) {
    const match = line.match(/^####\s+슬라이드\s+(\d+)(?:~\d+)?:\s*(.*)/)
    if (match) {
      if (current) sections.push(current)
      current = { num: parseInt(match[1]), title: match[2].trim(), body: '' }
    } else if (current) {
      current.body += line + '\n'
    }
  }
  if (current) sections.push(current)
  return sections
}

function renderMarkdownLine(line) {
  // 화면 큐 — 주황색
  if (line.match(/^>\s*📌\s*화면:/)) {
    return <div key={line} style={{ padding: '6px 10px', margin: '4px 0', background: '#44310a', borderLeft: '3px solid #d97706', borderRadius: 4, fontSize: '0.85em', color: '#fbbf24' }}>{line.replace(/^>\s*/, '')}</div>
  }
  // 강사 가이드 — 파란색
  if (line.match(/^>\s*\*\*🎯\s*강사\s*가이드\*\*:/)) {
    return <div key={line} style={{ padding: '6px 10px', margin: '4px 0', background: '#0c2d48', borderLeft: '3px solid #3b82f6', borderRadius: 4, fontSize: '0.85em', color: '#93c5fd' }}>{line.replace(/^>\s*/, '').replace(/\*\*/g, '')}</div>
  }
  // 일반 blockquote
  if (line.startsWith('> ')) {
    return <div key={line} style={{ padding: '4px 10px', margin: '2px 0', borderLeft: '2px solid #555', color: '#aaa', fontSize: '0.9em' }}>{line.replace(/^>\s*/, '')}</div>
  }
  // 구분선
  if (line.match(/^---\s*$/)) {
    return <hr key={line + Math.random()} style={{ border: 'none', borderTop: '1px solid #333', margin: '12px 0' }} />
  }
  // 빈 줄
  if (!line.trim()) {
    return <div key={Math.random()} style={{ height: 8 }} />
  }
  // 일반 텍스트
  return <div key={Math.random()} style={{ lineHeight: 1.7 }}>{line}</div>
}

function ScriptSection({ section, isActive, onClick }) {
  const ref = useRef(null)

  useEffect(() => {
    if (isActive && ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
  }, [isActive])

  return (
    <div
      ref={ref}
      onClick={onClick}
      style={{
        padding: '12px 16px',
        marginBottom: 2,
        cursor: 'pointer',
        background: isActive ? '#2a2318' : 'transparent',
        borderLeft: isActive ? '3px solid #d97706' : '3px solid transparent',
        transition: 'all 0.2s',
      }}
    >
      <div style={{ fontSize: '0.75em', fontWeight: 600, color: isActive ? '#d97706' : '#666', marginBottom: 4, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
        슬라이드 {section.num} {section.title && `— ${section.title}`}
      </div>
      <div style={{ fontSize: '0.85em', color: isActive ? '#e5e5e5' : '#888' }}>
        {section.body.split('\n').map((line, i) => renderMarkdownLine(line))}
      </div>
    </div>
  )
}

function NotesSection({ section, isActive }) {
  const ref = useRef(null)

  useEffect(() => {
    if (isActive && ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
  }, [isActive])

  return (
    <div
      ref={ref}
      style={{
        padding: '12px 16px',
        marginBottom: 2,
        background: isActive ? '#1a2332' : 'transparent',
        borderLeft: isActive ? '3px solid #3b82f6' : '3px solid transparent',
        transition: 'all 0.2s',
      }}
    >
      <div style={{ fontSize: '0.75em', fontWeight: 600, color: isActive ? '#3b82f6' : '#666', marginBottom: 4, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
        슬라이드 {section.num} {section.title && `— ${section.title}`}
      </div>
      <div style={{ fontSize: '0.85em', color: isActive ? '#e5e5e5' : '#888' }}>
        {section.body.split('\n').map((line, i) => renderMarkdownLine(line))}
      </div>
    </div>
  )
}

function StudioContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const page = searchParams.get('page') || 'xml-tags'
  const lecture = LECTURE_MAP[page]

  const [scriptSections, setScriptSections] = useState([])
  const [notesSections, setNotesSections] = useState([])
  const [currentSlide, setCurrentSlide] = useState(0)
  const [loading, setLoading] = useState(true)
  const [expanded, setExpanded] = useState(false)
  const iframeRef = useRef(null)

  // fetch 스크립트 + 발표자 노트
  useEffect(() => {
    if (!lecture) return
    setLoading(true)
    setCurrentSlide(0)

    const scriptFile = lecture.script
    const notesSlug = SLUG_TO_NOTES[page] || page

    Promise.all([
      fetch(`/api/script?file=${encodeURIComponent(scriptFile)}`).then(r => r.ok ? r.text() : ''),
      fetch(`/presenter-notes/${notesSlug}.md`).then(r => r.ok ? r.text() : '').catch(() => ''),
    ]).then(([scriptText, notesText]) => {
      setScriptSections(parseScript(scriptText))
      setNotesSections(parseNotes(notesText))
      setLoading(false)
    })
  }, [page, lecture])

  // iframe 슬라이드 해시 동기
  useEffect(() => {
    if (!iframeRef.current || scriptSections.length === 0) return
    const slideNum = scriptSections[currentSlide]?.num
    if (slideNum == null) return
    try {
      const docPath = SLUG_TO_DOC_PATH[page] || '/docs'
      iframeRef.current.src = `${docPath}?presenter=true&hideChrome=true#slide-${slideNum}`
    } catch {}
  }, [currentSlide, scriptSections, page])

  // 키보드 네비게이션
  const handleKeyDown = useCallback((e) => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault()
      setCurrentSlide(prev => Math.min(prev + 1, scriptSections.length - 1))
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault()
      setCurrentSlide(prev => Math.max(prev - 1, 0))
    } else if (e.key === 'P' && e.shiftKey) {
      e.preventDefault()
      const docPath = SLUG_TO_DOC_PATH[page] || '/docs'
      const slideNum = scriptSections[currentSlide]?.num || 1
      window.open(`${docPath}?presenter=true#slide-${slideNum}`, '_blank')
    } else if (e.key.toLowerCase() === 'f' && !e.shiftKey && !e.metaKey && !e.ctrlKey) {
      e.preventDefault()
      setExpanded(prev => !prev)
    }
  }, [scriptSections, currentSlide, page])

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [handleKeyDown])

  if (!lecture) {
    return (
      <div style={{ background: '#1a1a1a', color: '#e5e5e5', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'system-ui, sans-serif' }}>
        <div style={{ textAlign: 'center' }}>
          <h1 style={{ fontSize: '1.5em', marginBottom: 16 }}>강의를 찾을 수 없습니다</h1>
          <p style={{ color: '#888' }}>?page= 파라미터를 확인하세요.</p>
          <div style={{ marginTop: 24 }}>
            {Object.entries(LECTURE_MAP).map(([slug, info]) => (
              <div key={slug} style={{ margin: '4px 0' }}>
                <a href={`/studio?page=${slug}`} style={{ color: '#d97706', textDecoration: 'none' }}>{info.title}</a>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  const docPath = SLUG_TO_DOC_PATH[page] || '/docs'
  const totalSlides = scriptSections.length
  const currentSection = scriptSections[currentSlide]

  return (
    <div style={{ background: '#1a1a1a', color: '#e5e5e5', height: '100vh', display: 'flex', flexDirection: 'column', fontFamily: 'system-ui, -apple-system, sans-serif', overflow: 'hidden' }}>
      {/* 헤더 */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 16px', borderBottom: '1px solid #333', flexShrink: 0, background: '#111' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ fontSize: '1.1em' }}>🎬</span>
          <span style={{ fontWeight: 700, fontSize: '0.95em' }}>강의 제작 스튜디오</span>
          <span style={{ color: '#d97706', fontWeight: 600, fontSize: '0.95em' }}>— {lecture.title}</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <a
            href="/studio/templates"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: '#1f2937',
              color: '#f9fafb',
              border: '1px solid #374151',
              borderRadius: 6,
              padding: '4px 10px',
              fontSize: '0.8em',
              fontWeight: 700,
              textDecoration: 'none',
            }}
          >
            디자인 시스템
          </a>
          <select
            value={page}
            onChange={e => router.push(`/studio?page=${e.target.value}`)}
            style={{
              background: '#333', color: '#e5e5e5', border: '1px solid #555', borderRadius: 6, padding: '4px 10px', fontSize: '0.85em', cursor: 'pointer',
            }}
          >
            {Object.entries(LECTURE_MAP).map(([slug, info]) => (
              <option key={slug} value={slug}>{info.title}</option>
            ))}
          </select>
        </div>
      </div>

      {/* 3패널 */}
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        {/* 왼쪽: 스크립트 */}
        <div style={{ width: expanded ? '0' : '30%', borderRight: expanded ? 'none' : '1px solid #333', overflow: 'hidden', display: expanded ? 'none' : 'flex', flexDirection: 'column', transition: 'width 0.2s' }}>
          <div style={{ padding: '8px 16px', borderBottom: '1px solid #2a2a2a', flexShrink: 0, background: '#111' }}>
            <span style={{ fontSize: '0.8em', fontWeight: 600, color: '#888', letterSpacing: '0.05em' }}>📋 스크립트</span>
          </div>
          <div style={{ flex: 1, overflowY: 'auto' }}>
            {loading ? (
              <div style={{ padding: 24, textAlign: 'center', color: '#666' }}>불러오는 중...</div>
            ) : scriptSections.length === 0 ? (
              <div style={{ padding: 24, textAlign: 'center', color: '#666' }}>스크립트가 없습니다.</div>
            ) : (
              scriptSections.map((section, idx) => (
                <ScriptSection
                  key={section.num}
                  section={section}
                  isActive={idx === currentSlide}
                  onClick={() => setCurrentSlide(idx)}
                />
              ))
            )}
          </div>
        </div>

        {/* 가운데: 슬라이드 프리뷰 */}
        <div style={{ width: expanded ? '100%' : '40%', borderRight: expanded ? 'none' : '1px solid #333', overflow: 'hidden', display: 'flex', flexDirection: 'column', transition: 'width 0.2s' }}>
          <div style={{ padding: '8px 16px', borderBottom: '1px solid #2a2a2a', flexShrink: 0, background: '#111', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.8em', fontWeight: 600, color: '#888', letterSpacing: '0.05em' }}>🖥 슬라이드 프리뷰</span>
            <div style={{ display: 'flex', gap: 6 }}>
              <button
                onClick={() => setExpanded(prev => !prev)}
                style={{ background: '#333', color: '#e5e5e5', border: '1px solid #555', borderRadius: 4, padding: '3px 10px', fontSize: '0.75em', cursor: 'pointer', fontWeight: 600 }}
              >
                {expanded ? '⊟ 축소' : '⊞ 확장'}
              </button>
              <button
                onClick={() => {
                  const slideNum = currentSection?.num || 1
                  window.open(`${docPath}?presenter=true#slide-${slideNum}`, '_blank')
                }}
                style={{ background: '#d97706', color: '#fff', border: 'none', borderRadius: 4, padding: '3px 10px', fontSize: '0.75em', cursor: 'pointer', fontWeight: 600 }}
              >
                새 창
              </button>
            </div>
          </div>
          <div style={{ flex: 1, position: 'relative' }}>
            <iframe
              ref={iframeRef}
              src={`${docPath}?presenter=true&hideChrome=true#slide-${currentSection?.num || 1}`}
              style={{ width: '100%', height: '100%', border: 'none', background: '#fff' }}
              title="슬라이드 프리뷰"
            />
          </div>
        </div>

        {/* 오른쪽: 발표자 노트 */}
        <div style={{ width: expanded ? '0' : '30%', overflow: 'hidden', display: expanded ? 'none' : 'flex', flexDirection: 'column', transition: 'width 0.2s' }}>
          <div style={{ padding: '8px 16px', borderBottom: '1px solid #2a2a2a', flexShrink: 0, background: '#111' }}>
            <span style={{ fontSize: '0.8em', fontWeight: 600, color: '#888', letterSpacing: '0.05em' }}>📖 발표자 노트</span>
          </div>
          <div style={{ flex: 1, overflowY: 'auto' }}>
            {loading ? (
              <div style={{ padding: 24, textAlign: 'center', color: '#666' }}>불러오는 중...</div>
            ) : notesSections.length === 0 ? (
              <div style={{ padding: 24, textAlign: 'center', color: '#666' }}>발표자 노트가 없습니다.</div>
            ) : (
              notesSections.map((section, idx) => {
                const isActive = currentSection && section.num === currentSection.num
                return <NotesSection key={section.num} section={section} isActive={isActive} />
              })
            )}
          </div>
        </div>
      </div>

      {/* 하단 네비게이션 */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 24, padding: '8px 16px', borderTop: '1px solid #333', flexShrink: 0, background: '#111' }}>
        <button
          onClick={() => setCurrentSlide(prev => Math.max(prev - 1, 0))}
          disabled={currentSlide === 0}
          style={{ background: 'none', border: '1px solid #555', borderRadius: 4, color: currentSlide === 0 ? '#444' : '#e5e5e5', padding: '4px 16px', cursor: currentSlide === 0 ? 'default' : 'pointer', fontSize: '0.85em' }}
        >
          ← Prev
        </button>
        <span style={{ fontSize: '0.85em', color: '#888', minWidth: 120, textAlign: 'center' }}>
          Slide {currentSlide + 1} / {totalSlides || '—'}
        </span>
        <button
          onClick={() => setCurrentSlide(prev => Math.min(prev + 1, totalSlides - 1))}
          disabled={currentSlide >= totalSlides - 1}
          style={{ background: 'none', border: '1px solid #555', borderRadius: 4, color: currentSlide >= totalSlides - 1 ? '#444' : '#e5e5e5', padding: '4px 16px', cursor: currentSlide >= totalSlides - 1 ? 'default' : 'pointer', fontSize: '0.85em' }}
        >
          Next →
        </button>
        <span style={{ fontSize: '0.75em', color: '#555', marginLeft: 16 }}>
          ←→ 이동 &nbsp;|&nbsp; F 확장/축소 &nbsp;|&nbsp; Shift+P 새 창 &nbsp;|&nbsp; /studio/templates
        </span>
      </div>
    </div>
  )
}

export default function StudioPage() {
  return (
    <Suspense fallback={
      <div style={{ background: '#1a1a1a', color: '#666', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'system-ui, sans-serif' }}>
        불러오는 중...
      </div>
    }>
      <StudioContent />
    </Suspense>
  )
}
