import React from 'react'
import { Metadata } from 'next'

import { PageTitle } from '@/components/ui/Title'
import { generationData } from '@/features/games/data/pokedex.data'
import PokemonService from '@/features/pokemon/services/pokemon.service'

import { GenerationSection, PageNavigation } from './_components'

export const metadata: Metadata = {
  title: 'Pokémon animated sprite gallery | Pokémon Database',
}

const getPokemonList = async () => {
  const response = await PokemonService.getByOffsetAndLimit(0, 809)
  // const response = await PokemonService.getByGeneration(0, 10)
  return response.results
}

const AnimatedSprites = async () => {
  const data = await getPokemonList()

  const generations = Array.from({ length: 7 }, (_, index) => index + 1)

  return (
    <div className="space-y-4">
      <PageTitle>Animated Pokémon Sprite Collection</PageTitle>
      <p>The table represents the regular and shiny sprites in generation 7, respectively. </p>
      <PageNavigation />
      {generations.map(generationNumber => {
        const genData = generationData[generationNumber - 1]

        const startIndex = genData.offset
        const endIndex = startIndex + genData.limit
        const generationPokemonData = data.slice(startIndex, endIndex)

        return (
          <section id={`gen-${generationNumber}`} key={generationNumber}>
            <GenerationSection
              pokemonData={generationPokemonData}
              generationNumber={generationNumber}
            />
          </section>
        )
      })}
    </div>
  )
}

export default AnimatedSprites
