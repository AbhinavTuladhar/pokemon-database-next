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
  const params = useParams<{ eggGroup: string }>()
  const eggGroup = params.eggGroup

  const pageUrl = `/egg-group/${eggGroup}`

  useEffect(() => {
    console.error(error)
  }, [error])

  return <ErrorContainer pageUrl={pageUrl} param={eggGroup} resourceType="egg-group" />
}
