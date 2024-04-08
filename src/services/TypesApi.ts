import { NamedApiResourceList, Type } from '@/types'
import trimUrl from '@/utils/trimUrl'

import fetchData from './fetchData'
import fetchMultipleData from './fetchMultipleData'
import Api from './MainApi'

export const TypesApi = {
  // getAll: async function () {
  //   const response = await fetchData<NamedApiResourceList<Type>>('/type')
  //   return response
  // },
  get: async function (typeName: string) {
    const response = await fetchData<Type>(`/type/${typeName}`)
    return response
  },
  getSome: async function (urls: Array<string>) {
    const trimmedUrls = urls.map(trimUrl)
    const response = await fetchMultipleData<Type>(trimmedUrls)
    return response
  },
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
