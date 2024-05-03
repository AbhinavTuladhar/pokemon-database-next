import React, { Suspense } from 'react'
import { Metadata } from 'next'

import { PageTitle } from '@/components/containers'
import LoadingPageFallback from '@/components/Suspense/LoadingPageFallback'

import { ItemTableWrapper } from './_components'

export const metadata: Metadata = {
  title: 'List of Pokémon Items | Pokémon Database',
}

const ItemPage = async () => {
  return (
    <main>
      <PageTitle>Pokémon Items List</PageTitle>
      <Suspense fallback={<LoadingPageFallback />}>
        <ItemTableWrapper />
      </Suspense>
    </main>
  )
}

export default ItemPage
