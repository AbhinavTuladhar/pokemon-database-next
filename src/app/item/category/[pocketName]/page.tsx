import React, { FC, Suspense } from 'react'
import { Metadata } from 'next'

import { LoadingPageFallback } from '@/components/skeletons'
import { PageTitle } from '@/components/ui/Title'
import ItemService from '@/features/games/services/item.service'

import { ItemTableWrapper } from './_components'

export const metadata: Metadata = {
  title: 'List of Pokémon Items | Pokémon Database',
}
const getPocketNames = async () => {
  const response = await ItemService.getAllItemPockets()
  return response.sort((a, b) => (a > b ? 1 : -1))
}

// export async function generateStaticParams() {
//   const pocketNames = await getPocketNames()
//   return pocketNames.map(name => ({ pocketName: name }))
// }

interface PageProps {
  params: {
    pocketName: string
  }
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
