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

// Extract page slug from pathname for presenter notes lookup
function getPageSlug() {
  const path = window.location.pathname
  const parts = path.split('/').filter(Boolean)
  return parts[parts.length - 1] || 'index'
}

export function PresenterMode() {
  const [isSlideMode, setIsSlideMode] = useState(false)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [slideCount, setSlideCount] = useState(0)
  const [chromeHidden, setChromeHidden] = useState(false)
  const [isDark, setIsDark] = useState(false)
  const [slides, setSlides] = useState([])
  const slideRef = useRef(null)
  const notesWindowRef = useRef(null)
  const bcRef = useRef(null)

  // Read initial dark mode
  useEffect(() => {
    setIsDark(document.documentElement.classList.contains('dark'))
  }, [])

  // Sync dark mode
  useEffect(() => {
    if (!isSlideMode) return
    const html = document.documentElement
    if (isDark) html.classList.add('dark')
    else html.classList.remove('dark')
  }, [isDark, isSlideMode])

  // Extract slides from current page DOM
  const extractSlides = useCallback(() => {
    // Find main content area - Nextra renders content in article or main
    const article = document.querySelector('article') ||
      document.querySelector('[class*="nextra-content"]') ||
      document.querySelector('main')
    if (!article) return []

    const elements = Array.from(article.children)
    const groups = [[]]
    for (const el of elements) {
      if (el.tagName === 'HR') {
        groups.push([])
      } else {
        groups[groups.length - 1].push(el)
      }
    }
    return groups.filter(g => g.length > 0)
  }, [])

  // Activate slide mode
  const enterSlideMode = useCallback((startSlide = 0) => {
    const groups = extractSlides()
    if (groups.length === 0) return

    // Clone slide content
    const cloned = groups.map(group =>
      group.map(el => el.cloneNode(true))
    )
    setSlides(cloned)
    setSlideCount(cloned.length)
    setCurrentSlide(startSlide)
    setIsSlideMode(true)
  }, [extractSlides])

  // Fit content to slide frame
  const fitSlideContent = useCallback(() => {
    const frame = slideRef.current
    if (!frame) return
    frame.style.transform = ''
    frame.style.transformOrigin = ''
    requestAnimationFrame(() => {
      const scrollH = frame.scrollHeight
      const clientH = frame.clientHeight
      if (scrollH > clientH) {
        const scale = clientH / scrollH
        frame.style.transformOrigin = 'top center'
        frame.style.transform = `scale(${scale})`
      }
    })
  }, [])

  // Render current slide
  useEffect(() => {
    if (!isSlideMode || !slideRef.current || !slides[currentSlide]) return
    while (slideRef.current.firstChild) {
      slideRef.current.removeChild(slideRef.current.firstChild)
    }
    for (const el of slides[currentSlide]) {
      slideRef.current.appendChild(el.cloneNode(true))
    }
    fitSlideContent()
  }, [isSlideMode, currentSlide, slides, chromeHidden, fitSlideContent])

  // Init BroadcastChannel
  useEffect(() => {
    const bc = new BroadcastChannel('slide-sync')
    bcRef.current = bc
    bc.onmessage = (e) => {
      if (e.data.type === 'slide-nav') {
        if (e.data.direction === 'next') {
          setCurrentSlide(prev => Math.min(prev + 1, slideCount - 1))
        } else if (e.data.direction === 'prev') {
          setCurrentSlide(prev => Math.max(prev - 1, 0))
        }
      }
    }
    return () => bc.close()
  }, [slideCount])

  // Sync hash + broadcast
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

  // Hash change handler
  useEffect(() => {
    const handle = () => {
      const num = getSlideFromHash()
      if (num !== null && isSlideMode) {
        const idx = num - 1
        if (idx >= 0 && idx < slideCount) setCurrentSlide(idx)
      }
    }
    window.addEventListener('hashchange', handle)
    return () => window.removeEventListener('hashchange', handle)
  }, [isSlideMode, slideCount])

  const exitSlideMode = useCallback(() => {
    setIsSlideMode(false)
    setChromeHidden(false)
    setSlides([])
    history.replaceState(null, '', window.location.pathname)
  }, [])

  // Global keyboard: Shift+P to enter, plus slide nav
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Shift+P: toggle presenter mode (only when not in input/textarea)
      if (e.shiftKey && e.key === 'P' && !e.metaKey && !e.ctrlKey) {
        const tag = document.activeElement?.tagName
        if (tag === 'INPUT' || tag === 'TEXTAREA') return
        e.preventDefault()
        if (isSlideMode) {
          exitSlideMode()
        } else {
          // Check hash for starting slide
          const hashSlide = getSlideFromHash()
          enterSlideMode(hashSlide ? hashSlide - 1 : 0)
        }
        return
      }

      if (!isSlideMode) return

      if (e.key === 'ArrowRight' || e.key === 'ArrowDown' || e.key === ' ') {
        e.preventDefault()
        setCurrentSlide(prev => Math.min(prev + 1, slideCount - 1))
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault()
        setCurrentSlide(prev => Math.max(prev - 1, 0))
      } else if (e.key === 'Escape') {
        exitSlideMode()
      } else if (e.key === 'h' || e.key === 'H') {
        if (!e.shiftKey) setChromeHidden(prev => !prev)
      } else if (e.key === 'd' || e.key === 'D') {
        setIsDark(prev => !prev)
      } else if (e.key === 'n' || e.key === 'N') {
        if (!notesWindowRef.current || notesWindowRef.current.closed) {
          notesWindowRef.current = window.open(
            '/presenter',
            'presenter-notes',
            'width=520,height=750,left=0,top=0'
          )
        } else {
          notesWindowRef.current.focus()
        }
        setTimeout(() => {
          bcRef.current?.postMessage({
            type: 'slide-change',
            slideNumber: currentSlide + 1,
            totalSlides: slideCount,
            pageSlug: getPageSlug(),
          })
        }, 500)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isSlideMode, slideCount, currentSlide, enterSlideMode, exitSlideMode])

  // Resize handler
  useEffect(() => {
    if (!isSlideMode) return
    const handle = () => fitSlideContent()
    window.addEventListener('resize', handle)
    return () => window.removeEventListener('resize', handle)
  }, [isSlideMode, fitSlideContent])

  if (!isSlideMode) return null

  return (
    <div className={`slide-overlay${chromeHidden ? ' slide-chrome-hidden' : ''}`}>
      <div className="slide-controls">
        <span className="slide-counter">
          {currentSlide + 1} / {slideCount}
        </span>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <button
            onClick={() => setIsDark(p => !p)}
            className="slide-exit-btn"
            title="D"
          >
            {isDark ? '☀ Light' : '● Dark'}
          </button>
          <button
            onClick={() => setChromeHidden(true)}
            className="slide-exit-btn"
            title="H"
          >
            UI Hide
          </button>
          <button onClick={exitSlideMode} className="slide-exit-btn">
            ESC
          </button>
        </div>
      </div>
      <div className="slide-frame" ref={slideRef} />
      <div className="slide-nav">
        <button
          onClick={() => setCurrentSlide(p => Math.max(p - 1, 0))}
          disabled={currentSlide === 0}
          className="slide-nav-btn"
        >
          Prev
        </button>
        <button
          onClick={() => setCurrentSlide(p => Math.min(p + 1, slideCount - 1))}
          disabled={currentSlide === slideCount - 1}
          className="slide-nav-btn"
        >
          Next
        </button>
      </div>
    </div>
  )
}
