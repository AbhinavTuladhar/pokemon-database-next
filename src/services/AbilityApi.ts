import { Ability, NamedApiResourceList } from '@/types'
import fetchData from './fetchData'
import stringifyUrl from '@/utils/stringifyUrl'
import fetchMultipleData from './fetchMultipleData'
import trimUrl from '@/utils/trimUrl'

export const AbilityApi = {
  getById: async function (id: number) {
    const response = await fetchData<Ability[]>(`/pokemon/${id}/encounters`)
    return response
  },
  getAllUrls: async function () {
    const response = await fetchData<NamedApiResourceList<Ability>>('/ability?limit=233')
    const { results } = response
    const data = results.map((result) => {
      const { name, url } = result
      return stringifyUrl(url, name)
    })
    return data
  },
  getByUrls: async function (urls: Array<string>) {
    const trimmedUrls = urls.map(trimUrl)
    const response = await fetchMultipleData<Ability>(trimmedUrls)
    return response
  },
}
