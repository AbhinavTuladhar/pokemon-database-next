import React from 'react'

import generationData from '@/data/generationData'
import { PokemonApi } from '@/services/PokemonApi'

import GenerationSection from './_components/GenerationSection'
import PageNavigation from './_components/PageNavigation'
import SpriteTable from './_components/SpriteTable'

const getPokemonList = async () => {
  const response = await PokemonApi.getByGeneration(0, 809)
  // const response = await PokemonApi.getByGeneration(0, 10)
  return response.results
}

const AnimatedSprites = async () => {
  const data = await getPokemonList()

  const generations = Array.from({ length: 7 }, (_, index) => index + 1)

  return (
    <main className="space-y-4">
      <h1 className="mt-4 text-center text-5xl font-bold">Animated Pokémon Sprite Collection</h1>
      <p>The table represents the regular and shiny sprites in generation 7, respectively. </p>
      <PageNavigation />
      {generations.map((generationNumber) => {
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
