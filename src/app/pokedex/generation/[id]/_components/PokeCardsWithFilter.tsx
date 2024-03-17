'use client'

import { ChangeEvent, FC, Fragment, useEffect, useState } from 'react'

import PokeCard from '@/components/PokeCard'
import type { TransformedPokemon } from '@/types'

import PokeCardContainer from './PokeCardContainer'

interface FilterProps {
  pokemonData: Array<TransformedPokemon>
}

const PokeCardsWithFilter: FC<FilterProps> = ({ pokemonData }) => {
  const [filteredData, setFilteredData] = useState(pokemonData)
  const [filterText, setFilterText] = useState('')

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const searchString = event.target.value.toLowerCase()
    setFilterText(searchString)
    if (!searchString) {
      setFilteredData(pokemonData)
    } else {
      const filteredSlice = pokemonData.filter((pokemon) => pokemon.name.includes(searchString))
      setFilteredData(filteredSlice)
    }
  }

  return (
    <>
      <div className="mb-8 flex w-full justify-center">
        <input
          className="w-64 max-w-full rounded-lg px-2 py-2 text-black placeholder-gray-300"
          placeholder="Search for a Pokémon"
          onChange={handleChange}
          value={filterText}
        />
      </div>
      {filteredData.length > 0 ? (
        <PokeCardContainer>
          {filteredData.map((pokemon) => {
            const { id, name, types, front_default: defaultSprite = '' } = pokemon
            return (
              <Fragment key={id}>
                <PokeCard id={id} name={name} types={types} defaultSprite={defaultSprite} />
              </Fragment>
            )
          })}
        </PokeCardContainer>
      ) : (
        <div className="text-center text-4xl font-bold">No such Pokémon was found.</div>
      )}
    </>
  )
}

export default PokeCardsWithFilter
