import { NextResponse } from 'next/server'
import { readFile } from 'fs/promises'
import path from 'path'

export async function GET(request) {
  // dev 모드에서만 허용
  if (process.env.NODE_ENV === 'production') {
    return NextResponse.json({ error: 'Not available' }, { status: 404 })
  }

  const { searchParams } = new URL(request.url)
  const file = searchParams.get('file')
  if (!file) return NextResponse.json({ error: 'file required' }, { status: 400 })

  // 경로 주입 방지
  if (file.includes('..') || file.includes('/')) {
    return NextResponse.json({ error: 'invalid file' }, { status: 400 })
  }

  try {
    const filePath = path.join(process.cwd(), '..', '모듈', file)
    const content = await readFile(filePath, 'utf-8')
    return new NextResponse(content, {
      headers: { 'Content-Type': 'text/plain; charset=utf-8' }
    })
  } catch {
    return NextResponse.json({ error: 'not found' }, { status: 404 })
  }
}
