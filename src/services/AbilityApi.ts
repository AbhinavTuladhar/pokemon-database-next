import { Ability, NamedApiResourceList } from '@/types'
import stringifyUrl from '@/utils/stringifyUrl'
import trimUrl from '@/utils/trimUrl'

import fetchData from './fetchData'
import fetchMultipleData from './fetchMultipleData'
import Api from './MainApi'

export const AbilityApi = {
  get: async function (name: string) {
    const response = await fetchData<Ability>(`/ability/${name}`)
    return response
  },
  getAllUrls: async function () {
    const response = await fetchData<NamedApiResourceList<Ability>>('/ability?limit=233')
    const responses = await Api.pokemon.listAbilities()
    return responses.results
  },
  getAllNames: async function () {
    const response = await Api.pokemon.listAbilities(0, 233)
    const namesList = response.results.map((ability) => ability.name)
    return namesList
  },
  getByUrls: async function (urls: Array<string>) {
    const trimmedUrls = urls.map(trimUrl)
    const response = await fetchMultipleData<Ability>(trimmedUrls)
    return response
  },
  getByName: async function (name: string) {
    const response = await Api.pokemon.getAbilityByName(name)
    return response as unknown as Ability
  },
  getByNames: async function (names: Array<string>) {
    const requests = names.map((name) => Api.pokemon.getAbilityByName(name))
    const responses = await Promise.all(requests)
    return responses as Ability[]
  },
}
