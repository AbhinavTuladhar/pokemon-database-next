import React from 'react'
import { Metadata } from 'next'

import PageTitle from '@/components/containers/PageTitle'
import generationData from '@/data/generationData'
import { PokemonApi } from '@/services/PokemonApi'

import GenerationSection from './_components/GenerationSection'
import PageNavigation from './_components/PageNavigation'

export const metadata: Metadata = {
  title: 'Pokémon animated sprite gallery | Pokémon Database',
}

const getPokemonList = async () => {
  const response = await PokemonApi.getByOffsetAndLimit(0, 809)
  // const response = await PokemonApi.getByGeneration(0, 10)
  return response.results
}

const AnimatedSprites = async () => {
  const data = await getPokemonList()

  const generations = Array.from({ length: 7 }, (_, index) => index + 1)

  return (
    <main className="space-y-4">
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
    </main>
  )
}

export default AnimatedSprites
