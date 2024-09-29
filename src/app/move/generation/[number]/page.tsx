import React, { FC, Suspense } from 'react'
import { Metadata } from 'next'

import { PageTitle } from '@/components/containers'
import { SearchablePageSkeleton } from '@/components/skeletons'

import { MoveTableWrapper } from './_components'

interface PageProps {
  params: {
    number: string
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { number } = params
  return {
    title: `Generation ${number} moves | Pokémon Database`,
  }
}

const MoveList: FC<PageProps> = async ({ params: { number } }) => {
  const generationNumber = parseInt(number) || Infinity

  return (
    <main>
      <PageTitle>Pokémon Moves from Generation {number}</PageTitle>
      <Suspense fallback={<SearchablePageSkeleton />}>
        <MoveTableWrapper generationNumber={generationNumber} />
      </Suspense>
    </main>
  )
}

export default MoveList
