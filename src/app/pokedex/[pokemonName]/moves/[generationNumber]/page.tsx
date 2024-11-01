import React, { FC } from 'react'

import { PageTitle } from '@/components/containers'
import MovesLearned from '@/components/learned-moves'
import MoveGenerationLinks from '@/components/move-generation-links'
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

  const { front_default: defaultSprite, id, moves } = pokemonData

  return (
    <main>
      <PageTitle>
        {formatName(pokemonName)} - Generation {generationNumber} learnset
      </PageTitle>
      <IntroText
        image={defaultSprite}
        pokemonName={pokemonName}
        generationNumber={generationNumber}
      />
      <MoveGenerationLinks id={id} />
      <MovesLearned
        versionNames={['sun-moon', 'ultra-sun-ultra-moon']}
        versionGroupName="ultra-sun-ultra-moon"
        moves={moves}
        pokemonName={pokemonName}
      />
    </main>
  )
}

export default MovePage
