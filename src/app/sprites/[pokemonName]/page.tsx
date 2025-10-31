import React, { FC } from 'react'
import { Metadata } from 'next'

import { SpriteTable } from '@/components/sprite-table'
import { PageTitle, SectionTitle } from '@/components/ui/Title'
import spriteTableColumns from '@/data/sprite.data'
import PokemonService from '@/features/pokemon/services/pokemon.service'
import { transformPokemon } from '@/features/pokemon/transformers/transform-pokemon'
import { transformSprites } from '@/features/pokemon/transformers/transform-sprites'
import { SpriteDataType } from '@/types'
import { formatName } from '@/utils/string.utils'

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
  params: Promise<{
    pokemonName: string
  }>
}

export async function generateMetadata({ params }: SpritePageProps): Promise<Metadata> {
  const { pokemonName } = await params
  return {
    title: `${formatName(pokemonName)} sprites and artwork gallery | Pokémon Database`,
  }
}

const SpritePage: FC<SpritePageProps> = async ({ params }) => {
  const { pokemonName } = await params

  const pokemonData = await getPokemonData(pokemonName)

  const { id, spriteCollection, ...spriteData } = pokemonData
  const { otherSprites } = spriteData
  const { showdownSprites } = otherSprites

  const sortedGenerationData = Object.entries(spriteTableColumns).sort((a, b) =>
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
