import React, { FC } from 'react'

import { PageTitle } from '@/components/containers'
import SpriteExtractor from '@/extractors/SpriteExtractor'
import { PokemonApi } from '@/services'
import formatName from '@/utils/formatName'

import { Intro } from './_components'

const getPokemonData = async (name: string) => {
  const pokemonData = await PokemonApi.getByName(name)
  const { id } = pokemonData
  const spriteData = SpriteExtractor(pokemonData)
  return {
    id,
    ...spriteData,
  }
}

interface SpritePageProps {
  params: {
    pokemonName: string
  }
}

const SpritePage: FC<SpritePageProps> = async ({ params: { pokemonName } }) => {
  const pokemonData = await getPokemonData(pokemonName)

  const { id } = pokemonData

  return (
    <main>
      <PageTitle>{formatName(pokemonName)} Sprites</PageTitle>
      <Intro id={id} name={pokemonName} />
    </main>
  )
}

export default SpritePage
