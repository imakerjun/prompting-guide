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
  if (!container) return []

  const elements = Array.from(container.children)
  const groups = [[]]

  for (const el of elements) {
    const tag = el.tagName
    // Split on H2 or HR — these always start a new slide
    if (tag === 'H2' || tag === 'HR') {
      if (tag === 'H2') {
        groups.push([el])
      } else {
        groups.push([])
      }
    }
    // Split on UseCase cards — each card gets its own slide
    // But keep the first card with any preceding intro text (h2 + p)
    else if (el.classList?.contains('usecase-card')) {
      const currentGroup = groups[groups.length - 1]
      // If group already has a usecase-card, start a new slide for this one
      const hasCard = currentGroup.some(e => e.classList?.contains('usecase-card'))
      if (hasCard) {
        groups.push([el])
      } else {
        currentGroup.push(el)
      }
    } else {
      groups[groups.length - 1].push(el)
    }
  }

  return groups.filter(g => g.length > 0)
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
  const slideCountRef = useRef(0)
  const currentSlideRef = useRef(0)

  useEffect(() => { slideCountRef.current = slideCount }, [slideCount])
  useEffect(() => { currentSlideRef.current = currentSlide }, [currentSlide])

  useEffect(() => {
    setIsDark(document.documentElement.classList.contains('dark'))
  }, [])

  useEffect(() => {
    if (!isSlideMode) return
    const html = document.documentElement
    if (isDark) html.classList.add('dark')
    else html.classList.remove('dark')
  }, [isDark, isSlideMode])

  const enterSlideMode = useCallback((startSlide = 0) => {
    const groups = extractSlidesFromDOM()
    if (groups.length === 0) return
    const cloned = groups.map(group =>
      group.map(el => el.cloneNode(true))
    )
    setSlides(cloned)
    setSlideCount(cloned.length)
    setCurrentSlide(Math.min(startSlide, cloned.length - 1))
    setIsSlideMode(true)
  }, [])

  const exitSlideMode = useCallback(() => {
    setIsSlideMode(false)
    setChromeHidden(false)
    setSlides([])
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

  return (
    <div className={`slide-overlay${chromeHidden ? ' slide-chrome-hidden' : ''}`}>
      <div className="slide-controls">
        <span className="slide-counter">
          {currentSlide + 1} / {slideCount}
        </span>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <button onClick={() => setIsDark(p => !p)} className="slide-exit-btn" title="D">
            {isDark ? '☀ Light' : '● Dark'}
          </button>
          <button onClick={() => setChromeHidden(p => !p)} className="slide-exit-btn" title="H">
            {chromeHidden ? 'Show UI' : 'Hide UI'}
          </button>
          <button onClick={exitSlideMode} className="slide-exit-btn">ESC</button>
        </div>
      </div>
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
          Shift+P: exit &nbsp; N: notes &nbsp; H: hide UI &nbsp; D: dark
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
