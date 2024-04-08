import { NamedApiResourceList } from '@/types'
import { Berry } from '@/types'
import trimUrl from '@/utils/trimUrl'

import fetchData from './fetchData'
import fetchMultipleData from './fetchMultipleData'
import Api from './MainApi'

export const BerryApi = {
  getAll: async function () {
    const response = await Api.berry.listBerries(0, 64)
    return response.results.map((berry) => berry.name)
  },
  getByNames: async function (names: Array<string>) {
    const requests = names.map((name) => Api.berry.getBerryByName(name))
    const responses = await Promise.all(requests)
    return responses as Berry[]
  },
}
