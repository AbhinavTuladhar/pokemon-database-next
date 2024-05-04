import { PokeCardSkeleton } from '@/components/skeletons'

import PokeCardContainer from './_components/PokeCardContainer'

const Loading = () => {
  return (
    <main>
      <h1 className="my-4 text-center text-5xl font-bold">Loading Pokemon data...</h1>
      <PokeCardContainer>
        <PokeCardSkeleton cardCount={20} />
      </PokeCardContainer>
    </main>
  )
}

export default Loading
