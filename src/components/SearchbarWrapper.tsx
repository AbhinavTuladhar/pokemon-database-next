import React from 'react'

import { AbilityApi } from '@/services/AbilityApi'
import { ItemApi } from '@/services/ItemApi'
import { PokemonApi } from '@/services/PokemonApi'

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

  console.log({ abilityData, itemData, pokemonData })

  return <div>SearchbarWrapper</div>
}

export default SearchbarWrapper
