import { FC } from 'react'
import { Metadata } from 'next'

import PageTitle from '@/components/containers/PageTitle'
import PokeCard from '@/components/PokeCard'
import generationData from '@/data/generationData'
import PokemonExtractor from '@/extractors/PokemonExtractor'
import { PokemonApi } from '@/services/PokemonApi'

import PokeCardContainer from './_components/PokeCardContainer'

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
  const extractedPokemonData = pokemonData.map(PokemonExtractor)

  return (
    <main>
      <PageTitle>Pokémon of generation {generationNumber}</PageTitle>
      <PokeCardContainer>
        {extractedPokemonData.map(pokemon => {
          const { id, name, types, front_default: defaultSprite = '' } = pokemon
          return (
            <PokeCard key={id} id={id} name={name} types={types} defaultSprite={defaultSprite} />
          )
        })}
      </PokeCardContainer>
    </main>
  )
}

export default PokemonList
