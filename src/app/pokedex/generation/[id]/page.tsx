import { FC } from 'react'
import { Metadata } from 'next'

import { PageTitle } from '@/components/containers'
import generationData from '@/data/generationData'
import transformPokemon from '@/features/pokemon/transformers/transformPokemon'
import { PokemonApi } from '@/services'

import { ViewTabs } from './_components'

interface PageProps {
  params: {
    id: string
  }
}

// export async function generateStaticParams() {
//   return Array.from({ length: 7 }, (_, index) => ({ id: (index + 1).toString() }))
// }

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = params
  return {
    title: `Generation ${id} Pokémon | Pokémon Database`,
  }
}

const getPokemonData = async (names: Array<string>) => {
  const responses = await PokemonApi.getByNames(names)
  return responses
}

const getPokemonDataByGeneration = async (offset: number, limit: number) => {
  const response = await PokemonApi.getByOffsetAndLimit(offset, limit)
  return response
}

const PokemonList: FC<PageProps> = async ({ params: { id } }) => {
  const generationNumber = parseInt(id)
  // Getting the corresponding object from external file
  const routeData = generationData[generationNumber - 1]
  const { limit, offset } = routeData

  const generationResponse = await getPokemonDataByGeneration(offset, limit)

  const pokemonData = await getPokemonData(generationResponse.results.map(pokemon => pokemon.name))
  const extractedPokemonData = pokemonData.map(transformPokemon)

  // Minify the data to be passed into the components. This avoids build errors of excessive ISR
  const cardData = extractedPokemonData.map(({ id, name, types, front_default }) => ({
    id,
    name,
    types,
    front_default,
  }))

  const tableData = extractedPokemonData.map(({ id, name, types, gameSprite, stats }) => ({
    id,
    name,
    gameSprite,
    stats,
    types,
  }))

  return (
    <main>
      <PageTitle>Pokémon of generation {generationNumber}</PageTitle>
      <ViewTabs cardData={cardData} tableData={tableData} />
    </main>
  )
}

export default PokemonList
