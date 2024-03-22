import { FC } from 'react'
import { Metadata } from 'next'

import { getPokemonByGeneration, getPokemonByName, getPokemonByUrls } from '@/actions/fetchPokemon'
import PokeCard from '@/components/PokeCard'
import generationData from '@/data/generationData'
import PokemonExtractor from '@/extractors/PokemonExtractor'
import fetchMultipleData from '@/services/fetchMultipleData'
import { PokemonApi } from '@/services/PokemonApi'
import { Pokemon } from '@/types'
import trimUrl from '@/utils/trimUrl'

import InfiniteScroll from './_components/InfiniteScroll'
import PokeCardContainer from './_components/PokeCardContainer'
import PokeCardsWithFilter from './_components/PokeCardsWithFilter'

interface PageProps {
  params: {
    id: string
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = params
  return {
    title: `Generation ${id} Pokémon | Pokémon Database`,
  }
}

const PokemonList: FC<PageProps> = async ({ params: { id } }) => {
  const generationNumber = parseInt(id)
  // Getting the corresponding object from external file
  const routeData = generationData[generationNumber - 1]
  const { limit, offset } = routeData

  const generationResponse = await getPokemonByGeneration(offset, limit)

  const urlList = generationResponse.results.map((pokemon) => {
    const { name, url } = pokemon
    // We need to not use the complete url, hence the offset is used.
    // For the pokemon names, we use the actual name instead of the id number.
    const replacedUrl = url.replace(/\/pokemon\/\d+\//, `/pokemon/${name}/`)
    return replacedUrl
  })

  return (
    <main>
      <h1 className="my-4 text-center text-5xl font-bold">
        Pokémon of generation {generationNumber}
      </h1>
      <InfiniteScroll increment={20} urlList={urlList} />
    </main>
  )
}

export default PokemonList
