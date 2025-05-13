import React from 'react'
import { Metadata } from 'next'

import { PageTitle } from '@/components/ui/Title'
import generationData from '@/data/generationData'
import { PokemonApi } from '@/services'

import { GenerationSection, PageNavigation } from './_components'

const getPokemonList = async () => {
  const response = await PokemonApi.getByOffsetAndLimit(0, 809)
  return response.results
}

export const metadata: Metadata = {
  title: 'Pokémon sprites: archive of Pokémon images from every game | Pokémon Database',
}

const SpritePage = async () => {
  const data = await getPokemonList()

  const generations = Array.from({ length: 7 }, (_, index) => index + 1)

  return (
    <main>
      <PageTitle> Pokémon Sprite Archive </PageTitle>
      <PageNavigation />
      {generations.map(generationNumber => {
        const genData = generationData[generationNumber - 1]
        const startIndex = genData.offset
        const endIndex = startIndex + genData.limit
        const generationPokemonData = data.slice(startIndex, endIndex)

        return (
          <section id={`gen-${generationNumber}`} key={generationNumber}>
            <GenerationSection
              generationNumber={generationNumber}
              pokemonData={generationPokemonData}
            />
          </section>
        )
      })}
    </main>
  )
}

export default SpritePage
