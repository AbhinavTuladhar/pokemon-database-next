'use client'

import { useEffect } from 'react'
import { useParams } from 'next/navigation'

import { NotFoundPage, ServerErrorPage } from '@/components/error-handling'
import { isNotFound } from '@/utils/error.utils'

export default function ErrorPage({ error }: Readonly<{ error: Error & { digest?: string } }>) {
  const params = useParams<{ type: string }>()
  const type = params.type

  const pageUrl = `/type/${type}`

  useEffect(() => {
    console.error(error)
  }, [error])

  const is404 = isNotFound(error.message)

  if (is404) {
    return <NotFoundPage param={type} pageUrl={pageUrl} resourceType="type" />
  }

  return <ServerErrorPage />
}
