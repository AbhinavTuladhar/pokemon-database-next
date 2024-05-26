import React from 'react'

import { PokeCard } from '@/components/cards'
import { SectionTitle } from '@/components/containers'
import PokemonExtractor from '@/extractors/PokemonExtractor'
import { PokemonApi } from '@/services'

const getRandomPokemonData = async () => {
  // Generate four random numbers between 1 and 809 for the Pokemon ids
  const ids = Array.from({ length: 4 }, () => Math.floor(Math.random() * 809) + 1).sort(
    (a, b) => a - b,
  )
  const responses = await PokemonApi.getByIds(ids)
  return responses.map(PokemonExtractor)
}

const RandomPokemon = async () => {
  const pokemonData = await getRandomPokemonData()

  return (
    <section>
      <SectionTitle> Check out some random Pokémon! </SectionTitle>
      <div className="flex flex-wrap justify-center gap-8">
        {pokemonData.map(({ types, front_default, name, id }, index) => (
          <PokeCard defaultSprite={front_default} id={id} name={name} types={types} key={index} />
        ))}
      </div>
    </section>
  )
}

export default RandomPokemon
