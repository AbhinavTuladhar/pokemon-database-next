import unusedItems from '@/data/unusedItems'
import { FlatResourceList, ResourceList } from '@/types'

import { AbilityApi } from './AbilityApi'
import { EggGroupApi } from './EggGroupApi'
import { ItemApi } from './ItemApi'
import { LocationApi } from './LocationApi'
import { MovesApi } from './MovesApi'
import { PokemonApi } from './PokemonApi'
import { TypesApi } from './TypesApi'

const sortByName = (data: string[]) => data.sort((a, b) => a.localeCompare(b))

/**
 * The function that is used for fetching search data
 */
export const ResourceApi = {
  fetch: async function () {
    const [abilityData, eggGroupData, itemData, locationData, moveData, pokemonDataRaw, typesData] =
      await Promise.all([
        AbilityApi.getAllNames(),
        EggGroupApi.getAll(),
        ItemApi.getAllItems(),
        LocationApi.getAllNames(),
        MovesApi.getAllNames(),
        PokemonApi.getByOffsetAndLimit(0, 807),
        TypesApi.getAll(),
      ])
    const pokemonData = pokemonDataRaw.results.map(pokemon => pokemon.name)

    const filteredItems = itemData.filter(item => !unusedItems.includes(item))

    // Order: pokedex - egg group - move - ability - item - location
    const processedData: ResourceList[] = [
      { data: sortByName(typesData), resourceType: 'type' },
      { data: sortByName(eggGroupData), resourceType: 'egg-group' },
      { data: sortByName(pokemonData), resourceType: 'pokedex' },
      { data: sortByName(moveData), resourceType: 'move' },
      { data: sortByName(abilityData), resourceType: 'ability' },
      { data: sortByName(filteredItems), resourceType: 'item' },
      { data: sortByName(locationData), resourceType: 'location' },
    ]

    const filterList: FlatResourceList[] = processedData.flatMap(({ data, resourceType }) =>
      data.map(name => ({ name, resourceType })),
    )

    return filterList
  },
}
