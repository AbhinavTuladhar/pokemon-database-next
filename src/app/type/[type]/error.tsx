'use client'

import { useEffect } from 'react'
import { useParams } from 'next/navigation'

import ErrorContainer from '@/components/error-handling'

export default function Error({
  error,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  const params = useParams<{ type: string }>()
  const type = params.type

  const pageUrl = `/type/${type}`

  useEffect(() => {
    console.error(error)
  }, [error])

  return <ErrorContainer param={type} pageUrl={pageUrl} resourceType="type" />
}
