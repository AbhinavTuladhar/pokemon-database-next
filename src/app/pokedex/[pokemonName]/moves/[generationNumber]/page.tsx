import React, { FC } from 'react'

import { PageTitle } from '@/components/containers'
import PokemonExtractor from '@/extractors/PokemonExtractor'
import { PokemonApi } from '@/services'
import formatName from '@/utils/formatName'

import { IntroText } from './_components'

const getPokemonData = async (pokemonName: string) => {
  const response = await PokemonApi.getByName(pokemonName)
  return PokemonExtractor(response)
}

interface MovePageProps {
  params: {
    generationNumber: string
    pokemonName: string
  }
}

const MovePage: FC<MovePageProps> = async ({ params: { generationNumber, pokemonName } }) => {
  const pokemonData = await getPokemonData(pokemonName)

  const { front_default: defaultSprite } = pokemonData

  return (
    <main>
      <PageTitle>
        {formatName(pokemonName)} - Generation {generationNumber} learnset
      </PageTitle>
      <IntroText image={defaultSprite} />
    </main>
  )
}

export default MovePage
