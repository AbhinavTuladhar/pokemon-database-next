import React, { Suspense } from 'react'
import { Metadata } from 'next'

import PageTitle from '@/components/containers/PageTitle'
import SearchablePageSkeleton from '@/components/Suspense/SearchablePageSkeleton'

import MoveTableWrapper from './_components/MoveTableWrapper'

export const metadata: Metadata = {
  title: 'Pokémon move list | Pokémon Database',
}

const MoveList = async () => {
  return (
    <main>
      <PageTitle>Pokémon Moves</PageTitle>
      <Suspense fallback={<SearchablePageSkeleton />}>
        <MoveTableWrapper />
      </Suspense>
    </main>
  )
}

export default MoveList
