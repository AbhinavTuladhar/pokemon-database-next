'use client'

import React from 'react'

import { PokeCard } from '@/components/cards'
import { SectionTitle } from '@/components/containers'
import { PokeCardSkeleton } from '@/components/skeletons'
import useFeaturedPokemon from '@/hooks/useFeaturedPokemon'

const RandomPokemon = () => {
  const { pokemonData, error, isLoading } = useFeaturedPokemon()

  if (error) {
    return <SectionTitle>{error.message}</SectionTitle>
  }

  return (
    <section>
      <SectionTitle> Featured Pokémon </SectionTitle>
      <div className="flex flex-wrap justify-center gap-8">
        {isLoading || pokemonData.length === 0 ? <PokeCardSkeleton cardCount={7} /> : null}
        {pokemonData.map(({ types, front_default, name, id }, index) => (
          <PokeCard defaultSprite={front_default} id={id} name={name} types={types} key={index} />
        ))}
      </div>
    </section>
  )
}

export { RandomPokemon }
