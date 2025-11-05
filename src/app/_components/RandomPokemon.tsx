'use client'

import React from 'react'

import { PokeCardSkeleton } from '@/components/skeletons'
import { SectionTitle } from '@/components/ui/Title'
import { PokeCard } from '@/features/pokemon/components/PokeCard'
import useFeaturedPokemon from '@/hooks/useFeaturedPokemon'

const RandomPokemon = () => {
  const { pokemonData, error, isLoading } = useFeaturedPokemon()

  if (error) {
    return <SectionTitle>{error.message}</SectionTitle>
  }

  return (
    <>
      <SectionTitle> Featured Pokémon </SectionTitle>
      <div className="flex flex-wrap justify-center gap-8">
        {isLoading || pokemonData.length === 0 ? <PokeCardSkeleton cardCount={7} /> : null}
        {pokemonData.map(({ types, front_default, name, id }) => (
          <PokeCard defaultSprite={front_default} id={id} name={name} types={types} key={id} />
        ))}
      </div>
    </>
  )
}

export { RandomPokemon }
