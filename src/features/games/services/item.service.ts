import Api from '@/services/api'
import { Item, ItemCategory, ItemPocket } from '@/types'

class ItemService {
  static async getByName(name: string) {
    const response = await Api.item.getItemByName(name)
    return response as unknown as Item
  }
  static async getByNames(names: Array<string>) {
    const requests = names.map(name => Api.item.getItemByName(name))
    const responses = await Promise.all(requests)
    return responses as unknown as Item[]
  }
  static async getByIds(ids: Array<number>) {
    const requests = ids.map(id => Api.item.getItemById(id))
    const responses = await Promise.all(requests)
    return responses as unknown as Item[]
  }
  static async getAllItemPockets() {
    const response = await Api.item.listItemPockets()
    return response.results.map(resource => resource.name)
  }
  static async getItemPocketByName(name: string) {
    const response = await Api.item.getItemPocketByName(name)
    return response as ItemPocket
  }
  static async getItemPocketByNames(names: string[]) {
    const requests = names.map(name => Api.item.getItemPocketByName(name))
    const responses = await Promise.all(requests)
    return responses as ItemPocket[]
  }
  static async getItemCategoriesByNames(names: Array<string>) {
    const request = names.map(name => Api.item.getItemCategoryByName(name))
    const response = await Promise.all(request)
    return response as unknown as ItemCategory[]
  }
  static async getAllItems() {
    const response = await Api.item.listItems(0, 1137)
    return response.results.map(item => item.name)
  }
}

export default ItemService
