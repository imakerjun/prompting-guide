#!/usr/bin/env node

const fs = require('fs')
const path = require('path')

const SITE_DIR = path.join(__dirname, '..')
const CONTENT_DIR = path.join(SITE_DIR, 'src', 'content')
const NOTES_DIR = path.join(SITE_DIR, 'public', 'presenter-notes')

const SLUG_TO_MDX = {
  orientation: 'orientation.mdx',
  'xml-tags': 'best-practices/general-principles/xml-tags.mdx',
  'be-clear-and-direct': 'best-practices/general-principles/be-clear-and-direct.mdx',
  'add-context': 'best-practices/general-principles/add-context.mdx',
  'use-examples': 'best-practices/general-principles/use-examples.mdx',
  'give-a-role': 'best-practices/general-principles/give-a-role.mdx',
  'long-context': 'best-practices/general-principles/long-context.mdx',
  'model-self-knowledge': 'best-practices/general-principles/model-self-knowledge.mdx',
  'output-and-formatting': 'best-practices/practical-applications/output-and-formatting.mdx',
  'tool-use': 'best-practices/practical-applications/tool-use.mdx',
  'thinking-and-reasoning': 'best-practices/practical-applications/thinking-and-reasoning.mdx',
  'agentic-systems': 'best-practices/advanced-topics/agentic-systems.mdx',
  'capability-tips-and-migration': 'best-practices/advanced-topics/capability-tips-and-migration.mdx',
}

function countMdxSlides(mdxPath) {
  if (!fs.existsSync(mdxPath)) return { count: 0, error: `File not found: ${mdxPath}` }

  const content = fs.readFileSync(mdxPath, 'utf-8')
  const lines = content.split('\n')

  let inFrontmatter = false
  let frontmatterPassed = false
  let inDocOnly = false
  let useCaseCardsInCurrentSlide = 0
  const groups = [[]]

  const pushToCurrentGroup = line => {
    groups[groups.length - 1].push(line)
  }

  const isMeaningfulVisibleLine = line => {
    if (!line) return false
    if (line === '<SlideOnly>' || line === '</SlideOnly>') return false
    if (line === '<DocOnly>' || line === '</DocOnly>') return false
    if (line === '<div className="slide-title-follows-body">') return false
    if (line.startsWith('{/*')) return false
    return true
  }

  for (const line of lines) {
    const trimmed = line.trim()

    if (trimmed === '---') {
      if (!frontmatterPassed) {
        if (inFrontmatter) {
          frontmatterPassed = true
          continue
        }
        inFrontmatter = true
        continue
      }
      if (!inDocOnly) {
        groups.push([])
        useCaseCardsInCurrentSlide = 0
      }
      continue
    }

    if (trimmed === '<DocOnly>') {
      inDocOnly = true
      continue
    }
    if (trimmed === '</DocOnly>') {
      inDocOnly = false
      continue
    }

    if (!frontmatterPassed || inDocOnly) continue

    if (trimmed.startsWith('## ') && !trimmed.startsWith('### ')) {
      groups.push([trimmed])
      useCaseCardsInCurrentSlide = 0
      continue
    }

    if (trimmed.startsWith('<UseCaseCard')) {
      useCaseCardsInCurrentSlide++
      if (useCaseCardsInCurrentSlide > 1) {
        groups.push([trimmed])
      } else {
        pushToCurrentGroup(trimmed)
      }
      continue
    }

    pushToCurrentGroup(trimmed)
  }

  const visibleGroups = groups
    .map(group => group.filter(isMeaningfulVisibleLine))
    .filter(group => group.length > 0)

  return { count: visibleGroups.length }
}

function countNotesSlides(notesPath) {
  if (!fs.existsSync(notesPath)) return { count: 0, titles: [], error: `File not found: ${notesPath}` }

  const content = fs.readFileSync(notesPath, 'utf-8')
  const matches = content.match(/^####\s+슬라이드\s+(\d+)(?:~\d+)?:\s*(.*)/gm) || []

  const titles = matches.map(m => {
    const match = m.match(/^####\s+슬라이드\s+(\d+)(?:~\d+)?:\s*(.*)/)
    return { num: parseInt(match[1]), title: match[2].trim() }
  })

  return { count: titles.length, titles }
}

function checkSync(slug) {
  const mdxRelPath = SLUG_TO_MDX[slug]
  if (!mdxRelPath) {
    console.log(`Unknown slug: ${slug}`)
    return false
  }

  const mdxPath = path.join(CONTENT_DIR, mdxRelPath)
  const notesPath = path.join(NOTES_DIR, `${slug}.md`)

  const mdx = countMdxSlides(mdxPath)
  const notes = countNotesSlides(notesPath)

  if (mdx.error) {
    console.log(`MDX: ${mdx.error}`)
    return false
  }
  if (notes.error) {
    console.log(`Notes: ${notes.error}`)
    return false
  }

  const match = mdx.count === notes.count
  console.log(`${slug}: MDX ${mdx.count} | Notes ${notes.count}${match ? '' : ` | Diff ${mdx.count - notes.count}`}`)

  if (!match) {
    const noteNums = new Set(notes.titles.map(t => t.num))
    const missing = []
    const extra = []

    for (let i = 1; i <= mdx.count; i++) {
      if (!noteNums.has(i)) missing.push(i)
    }
    for (const t of notes.titles) {
      if (t.num > mdx.count) extra.push(t.num)
    }

    if (missing.length > 0) console.log(`  Missing notes: slides ${missing.join(', ')}`)
    if (extra.length > 0) console.log(`  Extra notes: slides ${extra.join(', ')}`)
  }

  return match
}

const args = process.argv.slice(2)

if (args.includes('--all')) {
  let allMatch = true
  for (const slug of Object.keys(SLUG_TO_MDX)) {
    if (!checkSync(slug)) allMatch = false
  }
  process.exit(allMatch ? 0 : 1)
} else if (args.length > 0) {
  const ok = checkSync(args[0])
  process.exit(ok ? 0 : 1)
} else {
  console.log('Usage: node scripts/check-slide-notes-sync.js [slug|--all]')
}
