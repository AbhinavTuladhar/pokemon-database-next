import React, { FC } from 'react'

import { PageTitle, SectionTitle, TableContainer } from '@/components/containers'
import { SpriteTable } from '@/components/sprite-table'
import generationSpriteColumns from '@/data/generationSpriteColumns'
import PokemonExtractor from '@/extractors/PokemonExtractor'
import SpriteExtractor from '@/extractors/SpriteExtractor'
import { PokemonApi } from '@/services'
import formatName from '@/utils/formatName'

import { Intro, SpriteTableHeader } from './_components'

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
        {sortedGenerationData.map(([generation, columns]) => (
          <section key={generation}>
            <SectionTitle> Generation {generation} </SectionTitle>
            <TableContainer>
              <SpriteTableHeader key={generation} columns={columns} />
            </TableContainer>
          </section>
        ))}
      </section>
    </main>
  )
}

export default SpritePage
