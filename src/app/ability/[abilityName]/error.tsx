'use client' // Error components must be Client Components

import { useEffect } from 'react'
import { useParams } from 'next/navigation'

import { NotFoundPage, ServerErrorPage } from '@/components/error-handling'
import { isNotFound } from '@/utils/error.utils'

export default function ErrorPage({ error }: Readonly<{ error: Error & { digest?: string } }>) {
  const params = useParams<{ abilityName: string }>()
  const abilityName = params.abilityName

  const pageUrl = `/ability/${abilityName}`

  useEffect(() => {
    console.error(error)
  }, [error])

  const is404 = isNotFound(error.message)

  if (is404) {
    return <NotFoundPage pageUrl={pageUrl} param={abilityName} resourceType="ability" />
  }

  return <ServerErrorPage />
}
