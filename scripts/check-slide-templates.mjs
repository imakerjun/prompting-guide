import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { allowedSlideClassTokens } from '../src/lib/slide-template-catalog.mjs'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const siteRoot = path.join(__dirname, '..')
const contentRoot = path.join(siteRoot, 'src', 'content')
const allowed = new Set(allowedSlideClassTokens)

async function collectMdxFiles(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true })
  const files = await Promise.all(entries.map(async entry => {
    const fullPath = path.join(dir, entry.name)
    if (entry.isDirectory()) return collectMdxFiles(fullPath)
    if (entry.isFile() && fullPath.endsWith('.mdx')) return [fullPath]
    return []
  }))

  return files.flat()
}

function getLineNumber(text, index) {
  return text.slice(0, index).split('\n').length
}

const files = await collectMdxFiles(contentRoot)
const violations = []
let slideOnlyBlockCount = 0
let classUsageCount = 0

for (const file of files) {
  const text = await fs.readFile(file, 'utf8')
  const blocks = [...text.matchAll(/<SlideOnly>([\s\S]*?)<\/SlideOnly>/g)]
  slideOnlyBlockCount += blocks.length

  for (const blockMatch of blocks) {
    const block = blockMatch[1]
    const blockStart = blockMatch.index ?? 0

    if (/className=\{/.test(block)) {
      violations.push({
        file,
        line: getLineNumber(text, blockStart),
        message: 'Dynamic className values are not allowed inside SlideOnly.',
      })
    }

    const classMatches = [...block.matchAll(/className="([^"]+)"/g)]
    for (const classMatch of classMatches) {
      const className = classMatch[1]
      const classIndex = blockStart + (classMatch.index ?? 0)

      for (const token of className.split(/\s+/).filter(Boolean)) {
        classUsageCount += 1
        if (!allowed.has(token)) {
          violations.push({
            file,
            line: getLineNumber(text, classIndex),
            message: `Unapproved SlideOnly className token: ${token}`,
          })
        }
      }
    }
  }
}

if (violations.length > 0) {
  console.error(`Slide template check failed with ${violations.length} violation(s).\n`)
  for (const violation of violations) {
    const relativePath = path.relative(siteRoot, violation.file)
    console.error(`- ${relativePath}:${violation.line} ${violation.message}`)
  }
  process.exit(1)
}

console.log(
  `Slide template check passed: ${files.length} file(s), ${slideOnlyBlockCount} SlideOnly block(s), ${classUsageCount} class token(s).`
)
