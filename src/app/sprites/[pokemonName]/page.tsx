import React, { FC } from 'react'

import { PageTitle, SectionTitle } from '@/components/containers'
import { SpriteTable } from '@/components/sprite-table'
import generationSpriteColumns from '@/data/generationSpriteColumns'
import PokemonExtractor from '@/extractors/PokemonExtractor'
import SpriteExtractor from '@/extractors/SpriteExtractor'
import { PokemonApi } from '@/services'
import { SpriteDataType } from '@/types'
import formatName from '@/utils/formatName'

import { GenerationSection, Intro } from './_components'

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

  const { id, spriteCollection, ...spriteData } = pokemonData

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
    </main>
  )
}

export default SpritePage
