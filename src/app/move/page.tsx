import React, { Suspense } from 'react'
import { Metadata } from 'next'

import { PageTitle } from '@/components/containers'
import { SearchablePageSkeleton } from '@/components/suspense'

import { MoveTableWrapper } from './_components'

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
