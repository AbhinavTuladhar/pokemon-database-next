import { Item, ItemCategory, ItemPocket } from '@/types'

import Api from './MainApi'

export const ItemApi = {
  getByName: async function (name: string) {
    const response = await Api.item.getItemByName(name)
    return response as unknown as Item
  },
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
  getItemPocketByNames: async function (names: string[]) {
    const requests = names.map(name => Api.item.getItemPocketByName(name))
    const responses = await Promise.all(requests)
    return responses as ItemPocket[]
  },
  getItemCategoriesByNames: async function (names: Array<string>) {
    const request = names.map(name => Api.item.getItemCategoryByName(name))
    const response = await Promise.all(request)
    return response as unknown as ItemCategory[]
  },
  getAllItems: async function () {
    const response = await Api.item.listItems(0, 1137)
    return response.results.map(item => item.name)
  },
}
