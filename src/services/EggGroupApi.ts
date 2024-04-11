import filterGens from '@/utils/filterGens'

import Api from './MainApi'

export const EggGroupApi = {
  getAll: async function () {
    const response = await Api.pokemon.listEggGroups(0, 64)
    return response.results.map(group => group.name)
  },
  getByName: async function (name: string) {
    const response = await Api.pokemon.getEggGroupByName(name)
    return response
  },
  getByNames: async function (names: Array<string>) {
    const requests = names.map(name => Api.pokemon.getEggGroupByName(name))
    const responses = await Promise.all(requests)
    return responses.map(group => {
      const { pokemon_species } = group
      const reducedSpecies = pokemon_species.filter(species => {
        const { url } = species
        return filterGens(url)
      })
      return {
        ...group,
        pokemon_species: reducedSpecies,
      }
    })
  },
}
