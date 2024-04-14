import { Item, ItemPocket } from '@/types'

import Api from './MainApi'

export const ItemApi = {
  getByNames: async function (names: Array<string>) {
    const requests = names.map(name => Api.item.getItemByName(name))
    const responses = await Promise.all(requests)
    return responses as unknown as Item[]
  },
  getAllItemPockets: async function () {
    const response = await Api.item.listItemPockets()
    return response.results.map(resource => resource.name)
  },
  getItemPocketByName: async function (name: string) {
    const response = await Api.item.getItemPocketByName(name)
    return response as ItemPocket
  },
  getItemPocketByNames: async function (names: Array<string>) {
    const requests = names.map(name => Api.item.getItemPocketByName(name))
    const responses = await Promise.all(requests)
    return responses
  },
}
