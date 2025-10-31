import React, { FC, Suspense } from 'react'
import { Metadata } from 'next'

import { SearchablePageSkeleton } from '@/components/skeletons'
import { PageTitle } from '@/components/ui/Title'

import { MoveTableWrapper } from './_components'

interface PageProps {
  params: Promise<{
    number: string
  }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { number } = await params
  return {
    title: `Generation ${number} moves | Pokémon Database`,
  }
}

export async function generateStaticParams() {
  return Array.from({ length: 7 }, (_, index) => ({ number: (index + 1).toString() }))
}

const MoveList: FC<PageProps> = async ({ params }) => {
  const { number } = await params

  const generationNumber = parseInt(number) || Infinity

  return (
    <>
      <PageTitle>Pokémon Moves from Generation {number}</PageTitle>
      <Suspense fallback={<SearchablePageSkeleton />}>
        <MoveTableWrapper generationNumber={generationNumber} />
      </Suspense>
    </>
  )
}

export default MoveList
