'use client' // Error components must be Client Components

import { useEffect } from 'react'
import { useParams } from 'next/navigation'

import ErrorContainer from '@/components/error-handling'

export default function Error({
  error,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  const params = useParams<{ itemName: string }>()
  const itemName = params.itemName

  const pageUrl = `/item/${itemName}`

  useEffect(() => {
    console.error(error)
  }, [error])

  return <ErrorContainer pageUrl={pageUrl} />
}
