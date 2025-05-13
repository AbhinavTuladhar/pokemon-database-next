import React, { FC } from 'react'
import { Metadata } from 'next'

import { SpriteTable } from '@/components/sprite-table'
import { PageTitle, SectionTitle } from '@/components/ui/Title'
import generationSpriteColumns from '@/data/generationSpriteColumns'
import PokemonService from '@/features/pokemon/services/pokemon.service'
import transformPokemon from '@/features/pokemon/transformers/transformPokemon'
import transformSprites from '@/features/pokemon/transformers/transformSprites'
import { SpriteDataType } from '@/types'
import formatName from '@/utils/formatName'

import { AnimatedSpriteTable, GenerationSection, Intro, OtherSprites } from './_components'

const getPokemonData = async (name: string) => {
  const pokemonData = await PokemonService.getByName(name)
  const { id, spriteCollection } = transformPokemon(pokemonData)
  const spriteData = transformSprites(pokemonData)
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

export async function generateMetadata({ params }: SpritePageProps): Promise<Metadata> {
  const { pokemonName } = params
  return {
    title: `${formatName(pokemonName)} sprites and artwork gallery | Pokémon Database`,
  }
}

const SpritePage: FC<SpritePageProps> = async ({ params: { pokemonName } }) => {
  const pokemonData = await getPokemonData(pokemonName)

  const { id, spriteCollection, ...spriteData } = pokemonData
  const { otherSprites } = spriteData
  const { showdownSprites } = otherSprites

  const sortedGenerationData = Object.entries(generationSpriteColumns).sort((a, b) =>
    a[0] < b[0] ? 1 : -1,
  )

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
      <section>
        <AnimatedSpriteTable imageData={showdownSprites} />
        {sortedGenerationData.map(([generation, genData]) => (
          <GenerationSection
            generation={+generation}
            key={generation}
            columnNames={genData.columnNames}
            rowNames={genData.rowNames}
            imageData={spriteData as SpriteDataType}
            extraColumns={genData.extraColumns}
          />
        ))}
      </section>
      <section>
        <OtherSprites imageData={{ otherSprites }} />
      </section>
    </main>
  )
}

export default SpritePage
