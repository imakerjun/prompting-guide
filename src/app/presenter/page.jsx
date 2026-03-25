'use client'

import { useEffect, useState, useRef, useCallback } from 'react'

function parseNotes(text) {
  const lines = text.split('\n')
  const notes = []
  let current = null

  for (const line of lines) {
    const match = line.match(/^####\s+슬라이드\s+(\d+)(?:~\d+)?:\s*(.*)/)
    if (match) {
      if (current) notes.push(current)
      current = {
        slideNum: parseInt(match[1], 10),
        title: match[2].trim(),
        body: '',
      }
    } else if (current) {
      current.body += line + '\n'
    }
  }
  if (current) notes.push(current)
  return notes
}

// Render presenter notes with paragraph breaks and basic markdown
function renderNoteText(text) {
  if (!text) return ''
  // Split into paragraphs by blank lines
  const paragraphs = text.split(/\n\n+/)
  return paragraphs.map(para => {
    let html = para.trim()
    if (!html) return ''
    // Bold
    html = html.replace(/\*\*(.+?)\*\*/g, '<strong style="color:#fff">$1</strong>')
    // Inline code
    html = html.replace(/`(.+?)`/g, '<code style="background:#333;padding:1px 4px;border-radius:3px;font-size:0.9em">$1</code>')
    // Bullet list items
    html = html.replace(/^- (.+)$/gm, '<span style="display:block;padding-left:16px;text-indent:-12px">• $1</span>')
    // Section headers like [오프닝 — ...]
    html = html.replace(/^\[(.+?)\]$/gm, '<span style="display:block;color:#6b9fff;font-size:0.85em;font-weight:600;margin-top:4px">$1</span>')
    // Screen cues
    html = html.replace(/^(📌.+)$/gm, '<span style="display:block;color:#e8a838;font-size:0.85em">$1</span>')
    // Preserve line breaks within a paragraph
    html = html.replace(/\n/g, '<br>')
    return `<div style="margin-bottom:14px">${html}</div>`
  }).join('')
}

function formatTime(seconds) {
  const m = Math.floor(seconds / 60)
  const s = seconds % 60
  return `${m}:${s.toString().padStart(2, '0')}`
}

export default function PresenterPage() {
  const [notes, setNotes] = useState([])
  const [currentSlide, setCurrentSlide] = useState(1)
  const [totalSlides, setTotalSlides] = useState(0)
  const [pageSlug, setPageSlug] = useState('')
  const [elapsed, setElapsed] = useState(0)
  const [timerRunning, setTimerRunning] = useState(false)
  const currentRef = useRef(null)
  const bcRef = useRef(null)

  // Read page slug from URL param on mount as fallback
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const page = params.get('page')
    if (page && !pageSlug) setPageSlug(page)
  }, [])

  // Load notes when pageSlug changes
  useEffect(() => {
    if (!pageSlug) return
    fetch(`/presenter-notes/${pageSlug}.md`)
      .then(r => {
        if (!r.ok) throw new Error('not found')
        return r.text()
      })
      .then(text => setNotes(parseNotes(text)))
      .catch(() => setNotes([]))
  }, [pageSlug])

  // BroadcastChannel + request current state on mount
  useEffect(() => {
    const bc = new BroadcastChannel('slide-sync')
    bcRef.current = bc
    bc.onmessage = (e) => {
      if (e.data.type === 'slide-change') {
        setCurrentSlide(e.data.slideNumber)
        setTotalSlides(e.data.totalSlides || 0)
        if (e.data.pageSlug) setPageSlug(e.data.pageSlug)
        setTimerRunning(true)
      }
    }
    // Request current state from the slide window
    bc.postMessage({ type: 'request-state' })
    return () => bc.close()
  }, [])

  // Timer
  useEffect(() => {
    if (!timerRunning) return
    const interval = setInterval(() => setElapsed(p => p + 1), 1000)
    return () => clearInterval(interval)
  }, [timerRunning])

  // Keyboard nav from presenter window
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown' || e.key === ' ') {
        e.preventDefault()
        bcRef.current?.postMessage({ type: 'slide-nav', direction: 'next' })
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault()
        bcRef.current?.postMessage({ type: 'slide-nav', direction: 'prev' })
      } else if (e.key.toLowerCase() === 'r') {
        setElapsed(0)
        setTimerRunning(true)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  // Auto-scroll to current note
  useEffect(() => {
    currentRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [currentSlide])

  const findNote = useCallback((slideNum) => {
    const exact = notes.find(n => n.slideNum === slideNum)
    if (exact) return exact
    let closest
    for (const n of notes) {
      if (n.slideNum <= slideNum) closest = n
    }
    return closest
  }, [notes])

  const currentNote = findNote(currentSlide)
  const nextNote = findNote(currentSlide + 1)

  return (
    <div style={{
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      background: '#1a1a1a',
      color: '#e0e0e0',
      minHeight: '100vh',
      padding: '20px 32px',
    }}>
      {/* Header */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottom: '1px solid #333',
        paddingBottom: '12px',
        marginBottom: '24px',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <h1 style={{ fontSize: '14px', fontWeight: 600, color: '#888', margin: 0 }}>
            발표자 노트
          </h1>
          <span style={{
            fontSize: '16px',
            fontWeight: 600,
            color: timerRunning ? '#6b9fff' : '#555',
            fontVariantNumeric: 'tabular-nums',
            cursor: 'pointer',
          }}
            onClick={() => { setElapsed(0); setTimerRunning(true) }}
            title="클릭하여 리셋 (R키)"
          >
            {formatTime(elapsed)}
          </span>
        </div>
        <span style={{
          fontSize: '20px',
          fontWeight: 700,
          color: '#fff',
          fontVariantNumeric: 'tabular-nums',
        }}>
          {currentSlide} / {totalSlides}
        </span>
      </div>

      {/* Current slide notes */}
      <div ref={currentRef} style={{ marginBottom: '32px' }}>
        <div style={{
          fontSize: '12px',
          fontWeight: 600,
          color: '#6b9fff',
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
          marginBottom: '8px',
        }}>
          현재 슬라이드 {currentSlide}
        </div>
        <div style={{
          fontSize: '13px',
          fontWeight: 600,
          color: '#aaa',
          marginBottom: '12px',
        }}>
          {currentNote?.title || '(노트 없음)'}
        </div>
        <div
          style={{
            fontSize: '16px',
            lineHeight: 1.65,
            color: '#ddd',
          }}
          dangerouslySetInnerHTML={{
            __html: renderNoteText(currentNote?.body.trim() || '')
          }}
        />
      </div>

      {/* Next slide notes */}
      <div style={{
        borderTop: '1px solid #333',
        paddingTop: '20px',
        marginTop: '20px',
      }}>
        <div style={{
          fontSize: '12px',
          fontWeight: 600,
          color: '#666',
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
          marginBottom: '8px',
        }}>
          다음 슬라이드
        </div>
        <div style={{
          fontSize: '13px',
          fontWeight: 600,
          color: '#555',
          marginBottom: '8px',
        }}>
          {nextNote?.title || ''}
        </div>
        <div
          style={{
            fontSize: '13px',
            lineHeight: 1.55,
            color: '#666',
          }}
          dangerouslySetInnerHTML={{
            __html: renderNoteText(nextNote?.body.trim() || '')
          }}
        />
      </div>

      {/* Keyboard hints */}
      <div style={{
        position: 'fixed',
        bottom: '12px',
        left: '32px',
        fontSize: '11px',
        color: '#444',
      }}>
        ← → 슬라이드 이동 &nbsp;|&nbsp; R 타이머 리셋
      </div>
    </div>
  )
}
