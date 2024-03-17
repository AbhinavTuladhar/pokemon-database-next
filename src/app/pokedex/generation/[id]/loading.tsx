import { FC } from 'react'

import PokeCardContainer from '@/app/pokedex/generation/[id]/_components/PokeCardContainer'
import PokeCardSkeleton from '@/components/Suspense/PokeCardSkeleton'

const LoadingPage = () => {
  return (
    <main>
      <h1 className="my-4 text-center text-5xl font-bold">Loading Pokemon data...</h1>
      <div className="mb-8 flex w-full justify-center">
        <input
          className="w-64 max-w-full rounded-lg px-2 py-2 placeholder-gray-300"
          placeholder="Search for a Pokémon"
          disabled
        />
      </div>
      <PokeCardContainer>
        <PokeCardSkeleton cardCount={20} />
      </PokeCardContainer>
    </main>
  )
}

export default LoadingPage
