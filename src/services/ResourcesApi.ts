import AbilityService from '@/features/battle/services/ability.service'
import MoveService from '@/features/battle/services/move.service'
import { unusedItems } from '@/features/games/data/item.data'
import ItemService from '@/features/games/services/item.service'
import { LocationService } from '@/features/games/services/location.service'
import EggGroupService from '@/features/pokemon/services/egg-group.service'
import PokemonService from '@/features/pokemon/services/pokemon.service'
import TypesService from '@/features/pokemon/services/types.service'
import { FlatResourceList, ResourceList } from '@/types'

const sortByName = (data: string[]) => data.sort((a, b) => a.localeCompare(b))

/**
 * The function that is used for fetching search data
 */
export const ResourceApi = {
  fetch: async function () {
    const [abilityData, eggGroupData, itemData, locationData, moveData, pokemonDataRaw, typesData] =
      await Promise.all([
        AbilityService.getAllNames(),
        EggGroupService.getAll(),
        ItemService.getAllItems(),
        LocationService.getAllNames(),
        MoveService.getAllNames(),
        PokemonService.getByOffsetAndLimit(0, 807),
        TypesService.getAll(),
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
