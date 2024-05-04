import { FC } from 'react'

import PokemonExtractor from '@/extractors/PokemonExtractor'
import { PokemonApi } from '@/services'

import { TypeSummaryCard } from './TypeSummaryCard'

interface SummaryRowProps {
  typeName: string
  pokemonCount: number
  moveCount: number
  pokemon: Array<string>
}

const getPokemonData = async (names: Array<string>) => {
  const response = await PokemonApi.getByNames(names)
  return response.map(PokemonExtractor)
}

export const TypeSummaryRow: FC<SummaryRowProps> = async ({
  typeName,
  moveCount,
  pokemonCount,
  pokemon,
}) => {
  const pokemonData = await getPokemonData(pokemon)

  const singleTypePokemon = pokemonData.reduce((acc, curr) => {
    const { types } = curr
    if (types.length === 1) {
      acc++
    }
    return acc
  }, 0)
  const dualTypePokemon = pokemonData.length - singleTypePokemon

  return (
    <div className="flex flex-row flex-wrap items-center justify-center gap-8">
      <TypeSummaryCard number={pokemonCount} text={`${typeName} type Pokemon`} />
      <TypeSummaryCard number={singleTypePokemon} text={'Single type Pokémon'} />
      <TypeSummaryCard number={dualTypePokemon} text={'Dual type Pokémon'} />
      <TypeSummaryCard number={moveCount} text={`${typeName} type moves`} />
    </div>
  )
}
