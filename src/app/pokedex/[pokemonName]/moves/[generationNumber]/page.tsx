import React, { FC } from 'react'
import { Metadata } from 'next'

import MovesLearned from '@/components/learned-moves'
import MoveGenerationLinks from '@/components/move-generation-links'
import { PageTitle } from '@/components/ui/Title'
import { generationToGameListMapV3 } from '@/data/generationToGameListMap'
import PokemonService from '@/features/pokemon/services/pokemon.service'
import { transformPokemon } from '@/features/pokemon/transformers/transform-pokemon'
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
  const response = await PokemonService.getByName(pokemonName)
  return transformPokemon(response)
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
