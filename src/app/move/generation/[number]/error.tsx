'use client'

import { useEffect } from 'react'
import { useParams } from 'next/navigation'

import { NotFoundPage, ServerErrorPage } from '@/components/error-handling'
import { isNotFound } from '@/utils/error.utils'

export default function Error({
  error,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  const params = useParams<{ number: string }>()
  const number = params.number

  const pageUrl = `/move/generation/${number}`

  useEffect(() => {
    console.error(error)
  }, [error])

  const is404 = isNotFound(error.message)

  if (is404) {
    return <NotFoundPage pageUrl={pageUrl} param={number} resourceType="generation" />
  }

  return <ServerErrorPage />
}
