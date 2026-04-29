import { notFound } from 'next/navigation'

export const metadata = { title: '강의 제작 스튜디오' }

export default function StudioLayout({ children }) {
  if (process.env.NODE_ENV === 'production') {
    notFound()
  }

  return children
}
