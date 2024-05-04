'use client'

import { ChangeEvent, FC, Fragment, useState } from 'react'

import { PokeCard } from '@/components/cards'
import Input from '@/components/input'
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
      const filteredSlice = pokemonData.filter(pokemon => pokemon.name.includes(searchString))
      setFilteredData(filteredSlice)
    }
  }

  return (
    <>
      <div className="mb-8 flex w-full justify-center">
        <Input placeholder="Search for a Pokémon" onChange={handleChange} value={filterText} />
      </div>
      {filteredData.length ? (
        <PokeCardContainer>
          {filteredData.map(pokemon => {
            const { id, name, types, front_default: defaultSprite = '' } = pokemon
            return (
              <PokeCard key={id} id={id} name={name} types={types} defaultSprite={defaultSprite} />
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
