import React from 'react'

import { PokemonApi } from '@/services/PokemonApi'

import SpriteTable from './_components/SpriteTable'

const getPokemonList = async () => {
  const response = await PokemonApi.getByGeneration(0, 809)
  // const response = await PokemonApi.getByGeneration(0, 10)
  return response.results
}

const AnimatedSprites = async () => {
  const data = await getPokemonList()

  // Process some of the data

  return (
    <main>
      <h1 className="my-4 text-center text-5xl font-bold">Animated Pokémon Sprite Collection</h1>
      <div className="grid-cols-sprite-table grid gap-10">
        {data.map((row, index) => (
          <SpriteTable id={index + 1} pokemonName={row.name} key={index} />
        ))}
      </div>
    </main>
  )
}

export default AnimatedSprites
