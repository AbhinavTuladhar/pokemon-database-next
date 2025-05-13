import React from 'react'

import { PageTitle } from '../ui/Title'

import { PokemonTableSkeleton } from './PokemonTableSkeleton'

export const LoadingPageFallback = () => {
  return (
    <main>
      <PageTitle> Loading data... </PageTitle>
      <PokemonTableSkeleton />
    </main>
  )
}
