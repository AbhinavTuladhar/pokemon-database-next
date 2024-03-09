import { NamedApiResourceList, Type } from '@/types'
import trimUrl from '@/utils/trimUrl'

import fetchData from './fetchData'
import fetchMultipleData from './fetchMultipleData'

export const TypesApi = {
  getAll: async function () {
    const response = await fetchData<NamedApiResourceList<Type>>('/type')
    return response
  },
  get: async function (typeName: string) {
    const response = await fetchData<Type>(`/type/${typeName}`)
    return response
  },
  getSome: async function (urls: Array<string>) {
    const trimmedUrls = urls.map(trimUrl)
    const response = await fetchMultipleData<Type>(trimmedUrls)
    return response
  },
}
