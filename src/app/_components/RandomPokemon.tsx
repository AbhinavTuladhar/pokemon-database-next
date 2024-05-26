import React from 'react'

import { PokeCard } from '@/components/cards'
import { SectionTitle } from '@/components/containers'
import generationData from '@/data/generationData'
import PokemonExtractor from '@/extractors/PokemonExtractor'
import { PokemonApi } from '@/services'

const getRandomNumber = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

const getRandomPokemonData = async () => {
  // Generate four random numbers between 1 and 809 for the Pokemon ids, one for each generation.
  const generationids = generationData.map(generation => {
    const { limit, offset } = generation
    const lowerLimit = offset
    const upperLimit = offset + limit
    return getRandomNumber(lowerLimit, upperLimit)
  })
  const responses = await PokemonApi.getByIds(generationids)
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
