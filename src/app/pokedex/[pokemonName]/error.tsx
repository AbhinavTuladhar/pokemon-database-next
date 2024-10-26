'use client' // Error components must be Client Components

import { useEffect } from 'react'
import { useParams } from 'next/navigation'

import ErrorContainer from '@/components/error-handling'

export default function ErrorPage({ error }: Readonly<{ error: Error & { digest?: string } }>) {
  const params = useParams<{ pokemonName: string }>()
  const pokemonName = params.pokemonName

  const pageUrl = `/pokedex/${pokemonName}`

  useEffect(() => {
    console.error(error)
  }, [error])

  return <ErrorContainer pageUrl={pageUrl} param={pokemonName} resourceType="pokedex" />
}
