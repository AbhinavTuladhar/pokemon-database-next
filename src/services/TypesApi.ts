import { NamedApiResourceList, Type } from '@/types'
import fetchData from './fetchData'

export const TypesApi = {
  getAll: async function () {
    const response = await fetchData<NamedApiResourceList<Type>>('/type')
    return response
  },
  get: async function (typeName: string) {
    const response = await fetchData<Type>(`/type/${typeName}`)
    return response
  },
}
