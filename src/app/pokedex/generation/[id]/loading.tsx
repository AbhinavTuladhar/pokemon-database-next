import Input from '@/components/Input'
import PokeCardSkeleton from '@/components/Suspense/PokeCardSkeleton'

import PokeCardContainer from './_components/PokeCardContainer'

const Loading = () => {
  return (
    <main>
      <h1 className="my-4 text-center text-5xl font-bold">Loading Pokemon data...</h1>
      <div className="flex flex-col items-center gap-8">
        <Input disabled placeholder="Search for a Pokémon" />
        <PokeCardContainer>
          <PokeCardSkeleton cardCount={20} />
        </PokeCardContainer>
      </div>
    </main>
  )
}

export default Loading
