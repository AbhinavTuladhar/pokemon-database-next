import React from 'react'

import { AbilityApi } from '@/services/AbilityApi'
import { ItemApi } from '@/services/ItemApi'
import { PokemonApi } from '@/services/PokemonApi'

import SearchInput from './SearchInput'

const getSearchResultData = async () => {
  const [abilityData, itemData, pokemonDataRaw] = await Promise.all([
    AbilityApi.getAllNames(),
    ItemApi.getAllItems(),
    PokemonApi.getByOffsetAndLimit(0, 807),
  ])
  const pokemonData = pokemonDataRaw.results.map(pokemon => pokemon.name)
  return [abilityData, itemData, pokemonData]
}

const SearchbarWrapper = async () => {
  const [abilityData, itemData, pokemonData] = await getSearchResultData()

  // Assign a label to identify each resource.
  const processedAbility = {
    data: abilityData,
    resourceType: 'ability',
  }
  const processedItem = {
    data: itemData,
    resourceType: 'item',
  }
  const processedPokemon = {
    data: pokemonData,
    resourceType: 'pokedex',
  }

  const filterList = [processedAbility, processedItem, processedPokemon].flatMap(
    ({ data, resourceType }) => data.map(name => ({ name, resourceType })),
  )

  return <SearchInput searchList={filterList} />
}

export default SearchbarWrapper
