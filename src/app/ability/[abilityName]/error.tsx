'use client' // Error components must be Client Components

import { useEffect } from 'react'
import { useParams } from 'next/navigation'

import ErrorContainer from '@/components/error-handling'

export default function ErrorPage({ error }: Readonly<{ error: Error & { digest?: string } }>) {
  const params = useParams<{ abilityName: string }>()
  const abilityName = params.abilityName

  const pageUrl = `/ability/${abilityName}`

  useEffect(() => {
    console.error(error)
  }, [error])

  return <ErrorContainer pageUrl={pageUrl} param={abilityName} resourceType="ability" />
}
