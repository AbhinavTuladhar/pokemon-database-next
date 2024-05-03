import React, { Suspense } from 'react'
import { Metadata } from 'next'

import { PageTitle } from '@/components/containers'
import { SearchablePageSkeleton } from '@/components/suspense'

import { AbilityTableWrapper } from './_components'

export const metadata: Metadata = {
  title: 'Pokémon Abilities | Pokémon Database',
}

const page = () => {
  return (
    <main>
      <PageTitle>Pokémon Abilities</PageTitle>
      <Suspense fallback={<SearchablePageSkeleton />}>
        <AbilityTableWrapper />
      </Suspense>
    </main>
  )
}

export default page
