import React from 'react'
import { Metadata } from 'next'

import { PageTitle } from '@/components/ui/Title'
import { generationData } from '@/features/games/data/pokedex.data'
import PokemonService from '@/features/pokemon/services/pokemon.service'

import { GenerationSection, PageNavigation } from './_components'

const getPokemonList = async () => {
  const response = await PokemonService.getByOffsetAndLimit(0, 809)
  return response.results
}

export const metadata: Metadata = {
  title: 'Pokémon sprites: archive of Pokémon images from every game | Pokémon Database',
}

const SpritePage = async () => {
  const data = await getPokemonList()

  const generations = Array.from({ length: 7 }, (_, index) => index + 1)

  return (
    <>
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
    </>
  )
}

export default SpritePage
