import React from 'react'

import { PageTitle } from '@/components/containers/PageTitle'

import { PokemonTableSkeleton } from './PokemonTableSkeleton'

export const LoadingPageFallback = () => {
  return (
    <main>
      <PageTitle> Loading data... </PageTitle>
      <PokemonTableSkeleton />
    </main>
  )
}
