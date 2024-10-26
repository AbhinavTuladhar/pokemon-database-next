import React, { FC, Fragment } from 'react'

import statMapping from '@/data/statMapping'
import PokemonExtractor from '@/extractors/PokemonExtractor'
import { PokemonApi } from '@/services'
import { TransformedPokemon } from '@/types'

import { TypeSummaryCard } from './TypeSummaryCard'

const statNames = ['hp', 'attack', 'defense', 'special-attack', 'special-defense', 'speed']

const findStatAverage = (
  pokemonData: Array<TransformedPokemon>,
  statName: string,
  pokemonCount: number,
) => {
  const statTotal = pokemonData.reduce((acc, pokemon) => {
    const { stats } = pokemon
    const statValue = stats.find(stat => stat.stat.name === statName)?.base_stat as number
    acc += statValue
    return acc
  }, 0)
  return parseFloat((statTotal / pokemonCount).toFixed(1))
}

interface RowProps {
  pokemon: Array<string>
}

const getPokemonData = async (names: Array<string>) => {
  const response = await PokemonApi.getByNames(names)
  return response.map(PokemonExtractor)
}

export const StatAverageRow: FC<RowProps> = async ({ pokemon }) => {
  const pokemonData = await getPokemonData(pokemon)

  const statAverages = statNames.map(statName =>
    findStatAverage(pokemonData, statName, pokemon.length),
  )

  return (
    <div className="flex flex-row flex-wrap items-center justify-center gap-8">
      {statNames.map((statName, index) => (
        <Fragment key={statName + index}>
          <TypeSummaryCard number={statAverages[index]} text={statMapping[statName]} />
        </Fragment>
      ))}
    </div>
  )
}
