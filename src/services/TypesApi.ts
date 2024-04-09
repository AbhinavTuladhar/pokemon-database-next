import { Type } from '@/types'

import Api from './MainApi'

export const TypesApi = {
  getByNames: async function (names: Array<string>) {
    const requests = names.map((name) => Api.pokemon.getTypeByName(name))
    const responses = await Promise.all(requests)
    return responses as Type[]
  },
  getByName: async function (name: string) {
    const response = await Api.pokemon.getTypeByName(name)
    return response as Type
  },
}
