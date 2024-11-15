import React, { FC } from 'react'
import { Metadata } from 'next'

import { PageTitle } from '@/components/containers'
import MovesLearned from '@/components/learned-moves'
import MoveGenerationLinks from '@/components/move-generation-links'
import { generationToGameListMapV3 } from '@/data/generationToGameListMap'
import { PokemonExtractor } from '@/extractors'
import { PokemonApi } from '@/services'
import formatName from '@/utils/formatName'

import { IntroText } from './_components'

interface MovePageProps {
  params: {
    generationNumber: string
    pokemonName: string
  }
}

export async function generateMetadata({ params }: MovePageProps): Promise<Metadata> {
  const { pokemonName, generationNumber } = params
  return {
    title: `${formatName(pokemonName)} generation ${generationNumber} move learnset | Pokémon Database`,
  }
}

const getPokemonData = async (pokemonName: string) => {
  const response = await PokemonApi.getByName(pokemonName)
  return PokemonExtractor(response)
}

const MovePage: FC<MovePageProps> = async ({ params: { generationNumber, pokemonName } }) => {
  const pokemonData = await getPokemonData(pokemonName)
  const versionGroupNames = generationToGameListMapV3[generationNumber]

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
      <MovesLearned versionNames={versionGroupNames} moves={moves} pokemonName={pokemonName} />
    </main>
  )
}

export default MovePage
