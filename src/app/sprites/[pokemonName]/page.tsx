import React, { FC } from 'react'

import { PageTitle, SectionTitle } from '@/components/containers'
import { SpriteTable } from '@/components/sprite-table'
import PokemonExtractor from '@/extractors/PokemonExtractor'
import SpriteExtractor from '@/extractors/SpriteExtractor'
import { PokemonApi } from '@/services'
import formatName from '@/utils/formatName'

import { Intro } from './_components'

const getPokemonData = async (name: string) => {
  const pokemonData = await PokemonApi.getByName(name)
  const { id, spriteCollection } = PokemonExtractor(pokemonData)
  const spriteData = SpriteExtractor(pokemonData)
  return {
    id,
    spriteCollection,
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

  const { id, spriteCollection } = pokemonData

  return (
    <main>
      <PageTitle>{formatName(pokemonName)} Sprites</PageTitle>
      <section>
        <Intro id={id} name={pokemonName} />
      </section>
      <section className="space-y-4">
        <SectionTitle> Overview </SectionTitle>
        <div>
          A brief look at how <span className="italic"> {formatName(pokemonName)} </span> sprites
          have changed over the years.
        </div>
        <SpriteTable spriteCollection={spriteCollection} />
      </section>
    </main>
  )
}

export default SpritePage
