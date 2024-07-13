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
  const params = useParams<{ pokemonName: string }>()
  const pokemonName = params.pokemonName

  const pageUrl = `/sprites/${pokemonName}`

  useEffect(() => {
    console.error(error)
  }, [error])

  return <ErrorContainer pageUrl={pageUrl} param={pokemonName} resourceType="sprites" />
}
