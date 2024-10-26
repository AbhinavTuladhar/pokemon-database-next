'use client'

import { useEffect } from 'react'
import { useParams } from 'next/navigation'

import ErrorContainer from '@/components/error-handling'

export default function ErrorPage({ error }: Readonly<{ error: Error & { digest?: string } }>) {
  const params = useParams<{ id: string }>()
  const id = params.id

  const pageUrl = `/pokedex/generation/${id}`

  useEffect(() => {
    console.error(error)
  }, [error])

  return <ErrorContainer pageUrl={pageUrl} param={id} resourceType="generation" />
}
