import React, { FC, Suspense } from 'react'
import { Metadata } from 'next'

import { PageTitle } from '@/components/containers'
import { LoadingPageFallback } from '@/components/skeletons'

import { ItemTableWrapper } from './_components'

interface PageProps {
  params: {
    pocketName: string
  }
}

export const metadata: Metadata = {
  title: 'List of Pokémon Items | Pokémon Database',
}

const ItemPage: FC<PageProps> = async ({ params: { pocketName } }) => {
  return (
    <main>
      <PageTitle>Pokémon Items List</PageTitle>
      <Suspense fallback={<LoadingPageFallback />}>
        <ItemTableWrapper pocketName={pocketName} />
      </Suspense>
    </main>
  )
}

export default ItemPage
