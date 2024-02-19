import { FC } from 'react'
import PokeCardContainer from '@/components/containers/PokeCardContainer'
import PokeCardSkeleton from '@/components/Suspense/PokeCardSkeleton'

const LoadingPage = () => {
  return (
    <main>
      <h1 className="text-4xl font-bold text-center my-4">Loading Pokemon data...</h1>
      <PokeCardContainer>
        <PokeCardSkeleton cardCount={20} />
      </PokeCardContainer>
    </main>
  )
}

export default LoadingPage
