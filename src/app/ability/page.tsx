import React, { Suspense } from 'react'
import { Metadata } from 'next'

import { SearchablePageSkeleton } from '@/components/skeletons'
import { PageTitle } from '@/components/ui/Title'

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
