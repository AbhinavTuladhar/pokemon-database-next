'use client'

import { useEffect } from 'react'
import { useParams } from 'next/navigation'

import { NotFoundPage, ServerErrorPage } from '@/components/error-handling'
import { isNotFound } from '@/utils/error.utils'

export default function ErrorPage({ error }: Readonly<{ error: Error & { digest?: string } }>) {
  const params = useParams<{ pokemonName: string }>()
  const pokemonName = params.pokemonName

  const pageUrl = `/sprites/${pokemonName}`

  useEffect(() => {
    console.error(error)
  }, [error])

  const is404 = isNotFound(error.message)

  if (is404) {
    return <NotFoundPage pageUrl={pageUrl} param={pokemonName} resourceType="sprites" />
  }

  return <ServerErrorPage />
}
