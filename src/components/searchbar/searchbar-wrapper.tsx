import React from 'react'

import unusedItems from '@/data/unusedItems'
import { AbilityApi, ItemApi, LocationApi, MovesApi, PokemonApi } from '@/services'

import SearchInput from './search-input'

const getSearchResultData = async () => {
  const [abilityData, itemData, locationData, moveData, pokemonDataRaw] = await Promise.all([
    AbilityApi.getAllNames(),
    ItemApi.getAllItems(),
    LocationApi.getAllNames(),
    MovesApi.getAllNames(),
    PokemonApi.getByOffsetAndLimit(0, 807),
  ])
  const pokemonData = pokemonDataRaw.results.map(pokemon => pokemon.name)
  return [abilityData, itemData, locationData, moveData, pokemonData]
}

const SearchbarWrapper = async () => {
  const [abilityData, itemData, locationData, moveData, pokemonData] = await getSearchResultData()

  // Remove the unused items
  const filteredItems = itemData.filter(item => !unusedItems.includes(item))

  // Assign a label to identify each resource.
  const processedAbility = {
    data: abilityData,
    resourceType: 'ability',
  }
  const processedItem = {
    data: filteredItems,
    resourceType: 'item',
  }
  const processedPokemon = {
    data: pokemonData,
    resourceType: 'pokedex',
  }
  const processedMoves = {
    data: moveData,
    resourceType: 'move',
  }
  const processedLocations = {
    data: locationData,
    resourceType: 'location',
  }

  // Order: pokedex - move - ability - item - location
  const filterList = [
    processedPokemon,
    processedMoves,
    processedAbility,
    processedItem,
    processedLocations,
  ].flatMap(({ data, resourceType }) => data.map(name => ({ name, resourceType })))

  return <SearchInput searchList={filterList} />
}

export default SearchbarWrapper
