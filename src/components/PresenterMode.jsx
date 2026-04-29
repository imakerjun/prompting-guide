'use client'

import { useEffect, useState, useCallback, useRef } from 'react'

function getSlideFromHash() {
  if (typeof window === 'undefined') return null
  const match = window.location.hash.match(/^#slide-(\d+)$/)
  return match ? parseInt(match[1], 10) : null
}

function setSlideHash(slideNumber) {
  const newHash = `#slide-${slideNumber}`
  if (window.location.hash !== newHash) {
    history.replaceState(null, '', newHash)
  }
}

function getPageSlug() {
  const path = window.location.pathname
  const parts = path.split('/').filter(Boolean)
  return parts[parts.length - 1] || 'index'
}

/**
 * Split the page content into slides.
 * Strategy: find the deepest content container (article > main, or article),
 * then split children by <h2> headings. Everything before the first <h2> is slide 1.
 * Additionally, if a <hr> appears, it also creates a split.
 */
function extractSlidesFromDOM() {
  // Nextra 4 renders: <article> <main data-pagefind-body> ...content... </main> </article>
  const container =
    document.querySelector('main[data-pagefind-body]') ||
    document.querySelector('article main') ||
    document.querySelector('article') ||
    document.querySelector('main')
  if (!container) return { groups: [], sections: [], allSections: [] }

  const cleanHeading = (text) =>
    text.replace(/Permalink.*$/, '').replace(/#$/, '').trim()

  const elements = Array.from(container.children)
  const groups = []
  const sectionNames = []
  const allSections = new Set(['']) // intro section (before first h2)
  let currentGroup = []
  let activeSection = ''

  const flushGroup = () => {
    if (currentGroup.length === 0) return
    groups.push(currentGroup)
    sectionNames.push(activeSection)
    currentGroup = []
  }

  for (const el of elements) {
    const tag = el.tagName
    const docOnlyHeading =
      el.classList?.contains('doc-only') ? el.querySelector('h2') : null
    const sectionHeading = tag === 'H2' ? el : docOnlyHeading

    // Section headings define the current header label,
    // but they should not become slides by themselves.
    if (sectionHeading) {
      flushGroup()
      activeSection = cleanHeading(sectionHeading.textContent)
      allSections.add(activeSection)
      continue
    }

    if (tag === 'HR') {
      flushGroup()
      continue
    }

    // Split on UseCase cards — each card gets its own slide
    if (el.classList?.contains('usecase-card')) {
      const hasCard = currentGroup.some(e => e.classList?.contains('usecase-card'))
      if (hasCard) flushGroup()
      currentGroup.push(el)
      continue
    }

    currentGroup.push(el)
  }

  flushGroup()

  return { groups, sections: sectionNames, allSections: [...allSections] }
}

// Highlight color presets
const HIGHLIGHT_COLORS = [
  { key: '0', name: 'Off', color: null },
  { key: '1', name: 'Yellow', color: 'rgba(250, 204, 21, 0.4)' },
  { key: '2', name: 'Red', color: 'rgba(239, 68, 68, 0.35)' },
  { key: '3', name: 'Green', color: 'rgba(34, 197, 94, 0.3)' },
  { key: '4', name: 'Blue', color: 'rgba(59, 130, 246, 0.3)' },
  { key: '5', name: 'Purple', color: 'rgba(168, 85, 247, 0.3)' },
]

export function PresenterMode() {
  const [isSlideMode, setIsSlideMode] = useState(false)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [slideCount, setSlideCount] = useState(0)
  const [chromeHidden, setChromeHidden] = useState(false)
  const [isDark, setIsDark] = useState(false)
  const [slides, setSlides] = useState([])
  const [slideSections, setSlideSections] = useState([])
  const [allSections, setAllSections] = useState([])
  const [highlightIdx, setHighlightIdx] = useState(0)
  const slideRef = useRef(null)
  const notesWindowRef = useRef(null)
  const bcRef = useRef(null)
  const slideCountRef = useRef(0)
  const currentSlideRef = useRef(0)

  useEffect(() => { slideCountRef.current = slideCount }, [slideCount])
  useEffect(() => { currentSlideRef.current = currentSlide }, [currentSlide])

  useEffect(() => {
    setIsDark(document.documentElement.classList.contains('dark'))
  }, [])

  // Auto-enter slide mode if ?presenter=true in URL
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    if (params.get('presenter') === 'true') {
      // Immediately hide Nextra chrome while loading
      if (params.get('hideChrome') === 'true') {
        document.documentElement.style.setProperty('--nextra-chrome-display', 'none')
        const style = document.createElement('style')
        style.textContent = 'nav, aside, header, footer, [class*="nextra"] > nav, [class*="nextra"] > aside { display: none !important; } article { margin: 0 !important; padding: 0 !important; max-width: 100% !important; }'
        document.head.appendChild(style)
      }
      const h = getSlideFromHash()
      const timer = setTimeout(() => {
        const { groups, sections, allSections: secs } = extractSlidesFromDOM()
        if (groups.length === 0) return
        const cloned = groups.map(group => group.map(el => el.cloneNode(true)))
        setSlides(cloned)
        setSlideSections(sections)
        setAllSections(secs)
        setSlideCount(cloned.length)
        setCurrentSlide(Math.min(h ? h - 1 : 0, cloned.length - 1))
        setIsSlideMode(true)
        setHighlightIdx(0)
      }, 300)
      return () => clearTimeout(timer)
    }
  }, [])

  useEffect(() => {
    if (!isSlideMode) return
    const html = document.documentElement
    if (isDark) html.classList.add('dark')
    else html.classList.remove('dark')
  }, [isDark, isSlideMode])

  // Apply highlight color as CSS variable
  useEffect(() => {
    if (!isSlideMode) return
    const color = HIGHLIGHT_COLORS[highlightIdx].color
    const overlay = document.querySelector('.slide-overlay')
    if (overlay && color) {
      overlay.style.setProperty('--highlight-color', color)
    }
  }, [highlightIdx, isSlideMode])

  const enterSlideMode = useCallback((startSlide = 0) => {
    const { groups, sections, allSections: secs } = extractSlidesFromDOM()
    if (groups.length === 0) return
    const cloned = groups.map(group =>
      group.map(el => el.cloneNode(true))
    )
    setSlides(cloned)
    setSlideSections(sections)
    setAllSections(secs)
    setSlideCount(cloned.length)
    setCurrentSlide(Math.min(startSlide, cloned.length - 1))
    setIsSlideMode(true)
    setHighlightIdx(0)
  }, [])

  const exitSlideMode = useCallback(() => {
    setIsSlideMode(false)
    setChromeHidden(false)
    setSlides([])
    setHighlightIdx(0)
    history.replaceState(null, '', window.location.pathname)
  }, [])

  // Re-wire HeadlessUI Tabs in cloned DOM so they are clickable
  // DOM structure: <button sentinel/> <div role="tablist">buttons</div> <div>panels</div>
  const wireTabsInFrame = useCallback((frame) => {
    const tabGroups = frame.querySelectorAll('[role="tablist"]')
    tabGroups.forEach(tablist => {
      const buttons = tablist.querySelectorAll('[role="tab"]')
      // Panels are inside a wrapper div that is the next sibling of tablist
      const panelWrapper = tablist.nextElementSibling
      const panels = panelWrapper
        ? panelWrapper.querySelectorAll('[role="tabpanel"]')
        : []

      // Store original class names per button for clean toggling
      const selectedClass = 'x:border-current x:outline-none x:text-primary-600'
      const unselectedClass = 'x:border-transparent x:text-gray-600 x:dark:text-gray-200'

      buttons.forEach((btn, i) => {
        btn.style.cursor = 'pointer'
        btn.addEventListener('click', () => {
          // Toggle buttons
          buttons.forEach((b, j) => {
            const isActive = j === i
            b.setAttribute('aria-selected', String(isActive))
            b.setAttribute('tabindex', isActive ? '0' : '-1')
            if (isActive) {
              b.setAttribute('data-selected', '')
              b.setAttribute('data-headlessui-state', 'selected')
            } else {
              b.removeAttribute('data-selected')
              b.setAttribute('data-headlessui-state', '')
            }
            // Swap visual classes
            const base = b.className
              .replace(/x:border-current/g, '').replace(/x:border-transparent/g, '')
              .replace(/x:outline-none/g, '')
              .replace(/x:text-primary-600/g, '').replace(/x:text-gray-600/g, '')
              .replace(/x:dark:text-gray-200/g, '')
              .replace(/\s+/g, ' ').trim()
            b.className = base + ' ' + (isActive ? selectedClass : unselectedClass)
          })
          // Toggle panels
          panels.forEach((p, j) => {
            const isActive = j === i
            if (isActive) {
              p.removeAttribute('hidden')
              p.style.display = ''
              p.setAttribute('data-selected', '')
              p.setAttribute('data-headlessui-state', 'selected')
            } else {
              p.setAttribute('hidden', '')
              p.style.display = 'none'
              p.removeAttribute('data-selected')
              p.setAttribute('data-headlessui-state', '')
            }
          })
        })
      })
    })
  }, [])

  // Render current slide into frame
  useEffect(() => {
    if (!isSlideMode || !slideRef.current || !slides[currentSlide]) return
    const frame = slideRef.current
    while (frame.firstChild) frame.removeChild(frame.firstChild)
    for (const el of slides[currentSlide]) {
      frame.appendChild(el.cloneNode(true))
    }
    // Reset Nextra/Tailwind centering — but preserve intentional inline styles
    frame.querySelectorAll('p, ul, ol, blockquote, table').forEach(el => {
      // Only reset if element doesn't have explicit inline maxWidth from JSX
      const hasInlineMaxWidth = el.getAttribute('style')?.includes('max-width')
      if (!hasInlineMaxWidth) {
        el.style.maxWidth = 'none'
      }
      el.style.marginLeft = '0'
      el.style.marginRight = '0'
    })
    // Auto-fit text: if slide content is short text, scale up to fill the slide
    const autoFitText = () => {
      const frameHeight = frame.clientHeight
      const contentHeight = frame.scrollHeight
      // Only auto-fit if content is much shorter than frame (text-only slides)
      if (contentHeight > 0 && contentHeight < frameHeight * 0.5) {
        const hasCard = frame.querySelector('.keyword-card')
        const hasCode = frame.querySelector('pre, code')
        const hasTab = frame.querySelector('[role="tablist"]')
        const hasImg = frame.querySelector('img')
        const hasTable = frame.querySelector('table')
        // Only scale text-only slides (no cards, code, tabs, images, tables)
        if (!hasCard && !hasCode && !hasTab && !hasImg && !hasTable) {
          const paragraphs = frame.querySelectorAll('p')
          if (paragraphs.length > 0 && paragraphs.length <= 3) {
            const scale = Math.min(frameHeight / contentHeight * 0.6, 2.0)
            paragraphs.forEach(p => {
              const currentSize = parseFloat(getComputedStyle(p).fontSize) || 16
              p.style.fontSize = `${currentSize * scale}px`
              p.style.lineHeight = '1.7'
            })
          }
        }
      }
    }
    // Delay to allow rendering
    requestAnimationFrame(autoFitText)
    // Re-wire tabs so they are clickable in slide mode
    wireTabsInFrame(frame)
    // Scroll to top when navigating to a new slide
    frame.scrollTop = 0
  }, [isSlideMode, currentSlide, slides, chromeHidden, wireTabsInFrame])

  // BroadcastChannel — created once
  useEffect(() => {
    const bc = new BroadcastChannel('slide-sync')
    bcRef.current = bc
    bc.onmessage = (e) => {
      if (e.data.type === 'slide-nav') {
        if (e.data.direction === 'next') {
          setCurrentSlide(prev => Math.min(prev + 1, slideCountRef.current - 1))
        } else if (e.data.direction === 'prev') {
          setCurrentSlide(prev => Math.max(prev - 1, 0))
        }
      }
      // Presenter window requests current state on mount
      if (e.data.type === 'request-state') {
        bc.postMessage({
          type: 'slide-change',
          slideNumber: currentSlideRef.current + 1,
          totalSlides: slideCountRef.current,
          pageSlug: getPageSlug(),
        })
      }
    }
    return () => bc.close()
  }, [])

  // Sync hash + broadcast on slide change
  useEffect(() => {
    if (isSlideMode) {
      setSlideHash(currentSlide + 1)
      bcRef.current?.postMessage({
        type: 'slide-change',
        slideNumber: currentSlide + 1,
        totalSlides: slideCount,
        pageSlug: getPageSlug(),
      })
    }
  }, [isSlideMode, currentSlide, slideCount])

  // Hash change
  useEffect(() => {
    const handle = () => {
      const num = getSlideFromHash()
      if (num !== null && isSlideMode) {
        const idx = num - 1
        if (idx >= 0 && idx < slideCountRef.current) setCurrentSlide(idx)
      }
    }
    window.addEventListener('hashchange', handle)
    return () => window.removeEventListener('hashchange', handle)
  }, [isSlideMode])

  // Keyboard
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Shift+P: toggle
      if (e.shiftKey && e.key === 'P' && !e.metaKey && !e.ctrlKey) {
        const tag = document.activeElement?.tagName
        if (tag === 'INPUT' || tag === 'TEXTAREA') return
        e.preventDefault()
        if (isSlideMode) exitSlideMode()
        else {
          const h = getSlideFromHash()
          enterSlideMode(h ? h - 1 : 0)
        }
        return
      }

      if (!isSlideMode) return

      if (e.key === 'ArrowRight' || e.key === 'ArrowDown' || e.key === ' ') {
        e.preventDefault()
        setCurrentSlide(prev => Math.min(prev + 1, slideCountRef.current - 1))
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault()
        setCurrentSlide(prev => Math.max(prev - 1, 0))
      } else if (e.key === 'Escape') {
        exitSlideMode()
      } else if (e.key.toLowerCase() === 'h' && !e.shiftKey) {
        setChromeHidden(prev => !prev)
      } else if (e.key.toLowerCase() === 'd') {
        setIsDark(prev => !prev)
      } else if (e.key.toLowerCase() === 'n') {
        const slug = getPageSlug()
        if (!notesWindowRef.current || notesWindowRef.current.closed) {
          notesWindowRef.current = window.open(
            `/presenter?page=${slug}`,
            'presenter-notes',
            'width=520,height=750,left=0,top=0'
          )
        } else {
          notesWindowRef.current.focus()
        }
        // Send state multiple times to handle timing
        const sendState = () => {
          bcRef.current?.postMessage({
            type: 'slide-change',
            slideNumber: currentSlideRef.current + 1,
            totalSlides: slideCountRef.current,
            pageSlug: slug,
          })
        }
        setTimeout(sendState, 300)
        setTimeout(sendState, 800)
        setTimeout(sendState, 1500)
      }
      // Highlight color shortcuts: 0-5
      else if (['0','1','2','3','4','5'].includes(e.key) && !e.shiftKey && !e.metaKey && !e.ctrlKey) {
        const idx = HIGHLIGHT_COLORS.findIndex(c => c.key === e.key)
        if (idx >= 0) setHighlightIdx(idx)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isSlideMode, enterSlideMode, exitSlideMode])

  // Resize
  useEffect(() => {
    if (!isSlideMode) return
    const handle = () => {
      // Re-trigger render by toggling a dummy state
      setCurrentSlide(prev => prev)
    }
    window.addEventListener('resize', handle)
    return () => window.removeEventListener('resize', handle)
  }, [isSlideMode])

  if (!isSlideMode) return null

  const currentHighlight = HIGHLIGHT_COLORS[highlightIdx]

  return (
    <div className={`slide-overlay${chromeHidden ? ' slide-chrome-hidden' : ''}${currentHighlight.color ? ' slide-highlight-active' : ''}`}>
      <div className="slide-controls">
        <span className="slide-counter">
          {currentSlide + 1} / {slideCount}
        </span>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          {/* Highlight color indicator */}
          <div className="slide-highlight-picker">
            {HIGHLIGHT_COLORS.map((c, i) => (
              <button
                key={c.key}
                onClick={() => setHighlightIdx(i)}
                className={`slide-highlight-dot${i === highlightIdx ? ' active' : ''}`}
                style={{ background: c.color || 'transparent', border: c.color ? 'none' : '1px solid #666' }}
                title={`${c.key}: ${c.name}`}
              />
            ))}
          </div>
          <button onClick={() => setIsDark(p => !p)} className="slide-exit-btn" title="D">
            {isDark ? '☀ Light' : '● Dark'}
          </button>
          <button onClick={() => setChromeHidden(p => !p)} className="slide-exit-btn" title="H">
            {chromeHidden ? 'Show UI' : 'Hide UI'}
          </button>
          <button onClick={exitSlideMode} className="slide-exit-btn">ESC</button>
        </div>
      </div>
      {/* Section progress bar */}
      {allSections.length > 0 && (() => {
        // Shorten section names for display and deduplicate
        const shortenName = (name) => {
          if (!name) return '도입'
          // Remove common suffixes and shorten
          return name
            .replace(/\s*—\s*.+$/, '') // "CEO 이메일 — 데이터와..." → "CEO 이메일"
            .replace(/^문제\s*\d+.*$/, '') // Remove standalone "문제 N" entries
            .replace(/Permalink.*$/, '')
            .trim()
        }
        // Filter out empty names (from "문제 2" being merged into "연습문제")
        const displaySections = allSections
          .map(shortenName)
          .filter(Boolean)
          .filter((v, i, a) => a.indexOf(v) === i) // deduplicate
        const currentSec = shortenName(slideSections[currentSlide] || '')

        return (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0',
            padding: '0',
            flexShrink: 0,
            fontSize: '11px',
            borderBottom: '1px solid var(--notion-border, #e9e9e7)',
            background: isDark ? '#1a1a1a' : '#f8f7f4',
            overflow: 'hidden',
            width: 'calc((100vh - 90px) * 16 / 9)',
            maxWidth: '100vw',
            boxSizing: 'border-box',
          }}>
            {displaySections.map((sec, i) => {
              const isActive = sec === currentSec
              const sectionIdx = displaySections.indexOf(currentSec)
              const isPast = i < sectionIdx
              return (
                <div
                  key={sec + i}
                  onClick={() => {
                    const firstSlideIdx = slideSections.findIndex(s => shortenName(s) === sec)
                    if (firstSlideIdx !== -1) setCurrentSlide(firstSlideIdx)
                  }}
                  style={{
                    flex: 1,
                    padding: '6px 10px',
                    textAlign: 'center',
                    fontSize: isActive ? '12px' : '11px',
                    fontWeight: isActive ? 800 : 400,
                    color: isActive ? (isDark ? '#fff' : '#d97706') : isPast ? (isDark ? '#777' : '#999') : (isDark ? '#444' : '#ccc'),
                    background: isActive ? (isDark ? 'rgba(217,119,6,0.15)' : 'rgba(217,119,6,0.08)') : 'transparent',
                    borderBottom: isActive ? '3px solid #d97706' : '3px solid transparent',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    transition: 'all 0.2s',
                    cursor: 'pointer',
                  }}
                >
                  {sec}
                </div>
              )
            })}
          </div>
        )
      })()}
      <div className="slide-frame" ref={slideRef} />
      <div className="slide-nav">
        <button
          onClick={() => setCurrentSlide(p => Math.max(p - 1, 0))}
          disabled={currentSlide === 0}
          className="slide-nav-btn"
        >
          ← Prev
        </button>
        <span className="slide-counter" style={{ fontSize: '13px' }}>
          Shift+P: exit &nbsp; N: notes &nbsp; H: hide UI &nbsp; D: dark &nbsp; 0-5: highlight
        </span>
        <button
          onClick={() => setCurrentSlide(p => Math.min(p + 1, slideCount - 1))}
          disabled={currentSlide === slideCount - 1}
          className="slide-nav-btn"
        >
          Next →
        </button>
      </div>
    </div>
  )
}
