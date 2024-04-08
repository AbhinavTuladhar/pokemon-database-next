import { NamedApiResourceList, Nature } from '@/types'
import trimUrl from '@/utils/trimUrl'

import fetchData from './fetchData'
import fetchMultipleData from './fetchMultipleData'
import Api from './MainApi'

export const NatureApi = {
  get: async function () {
    const response = await fetchData<NamedApiResourceList<Nature>>('/nature?limit=25')
    return response
  },
  getAllNames: async function () {
    const response = await Api.pokemon.listNatures(0, 25)
    return response.results.map((nature) => nature.name)
  },
  getByNames: async function (names: Array<string>) {
    const requests = names.map((name) => Api.pokemon.getNatureByName(name))
    const responses = await Promise.all(requests)
    return responses as Nature[]
  },
  getByUrls: async function (urls: Array<string>) {
    const trimmedUrls = urls.map(trimUrl)
    const responses = await fetchMultipleData<Nature>(trimmedUrls)
    return responses
  },
}
