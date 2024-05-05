import React from 'react'

import unusedItems from '@/data/unusedItems'
import { AbilityApi, ItemApi, LocationApi, MovesApi, PokemonApi, TypesApi } from '@/services'

import SearchInput from './search-input'

const getSearchResultData = async () => {
  const [abilityData, itemData, locationData, moveData, pokemonDataRaw, typesData] =
    await Promise.all([
      AbilityApi.getAllNames(),
      ItemApi.getAllItems(),
      LocationApi.getAllNames(),
      MovesApi.getAllNames(),
      PokemonApi.getByOffsetAndLimit(0, 807),
      TypesApi.getAll(),
    ])
  const pokemonData = pokemonDataRaw.results.map(pokemon => pokemon.name)
  return [abilityData, itemData, locationData, moveData, pokemonData, typesData]
}

const SearchbarWrapper = async () => {
  const [abilityData, itemData, locationData, moveData, pokemonData, typesData] =
    await getSearchResultData()

  // Remove the unused items
  const filteredItems = itemData.filter(item => !unusedItems.includes(item))

  // Order: pokedex - move - ability - item - location
  const processedData = [
    { data: pokemonData, resourceType: 'pokedex' },
    { data: moveData, resourceType: 'move' },
    { data: abilityData, resourceType: 'ability' },
    { data: filteredItems, resourceType: 'item' },
    { data: locationData, resourceType: 'location' },
    { data: typesData, resourceType: 'type' },
  ]

  const filterList = processedData.flatMap(({ data, resourceType }) =>
    data.map(name => ({ name, resourceType })),
  )

  return <SearchInput searchList={filterList} />
}

export default SearchbarWrapper
