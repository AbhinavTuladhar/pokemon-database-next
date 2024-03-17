import { EggGroup, NamedApiResourceList } from '@/types'
import { Berry } from '@/types'
import trimUrl from '@/utils/trimUrl'

import fetchData from './fetchData'
import fetchMultipleData from './fetchMultipleData'

export const EggGroupApi = {
  getAll: async function () {
    const response = await fetchData<NamedApiResourceList<EggGroup>>('/egg-group')
    return response
  },
  get: async function (url: string) {
    const trimmedUrl = trimUrl(url)
    const response = await fetchData<EggGroup>(trimmedUrl)
    return response
  },
  getByUrls: async function (urls: Array<string>) {
    const trimmedUrls = urls.map(trimUrl)
    const responses = await fetchMultipleData<EggGroup>(trimmedUrls)

    // The pokemon species will have data of gen 8+ pokemon so we filter it out

    return responses.map((group) => {
      const { pokemon_species } = group
      const reducedSpecies = pokemon_species.filter((species) => {
        const { url } = species
        const idNumber = url.match(/\/(\d+)\/$/)![1]
        return +idNumber <= 807
      })
      return {
        ...group,
        pokemon_species: reducedSpecies,
      }
    })
  },
}
