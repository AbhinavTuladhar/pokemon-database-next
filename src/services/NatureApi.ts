import { Nature } from '@/types'

import Api from './MainApi'

export const NatureApi = {
  getAllNames: async function () {
    const response = await Api.pokemon.listNatures(0, 25)
    return response.results.map(nature => nature.name)
  },
  getByNames: async function (names: Array<string>) {
    const requests = names.map(name => Api.pokemon.getNatureByName(name))
    const responses = await Promise.all(requests)
    return responses as Nature[]
  },
}
