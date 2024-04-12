import { Item } from '@/types'

import Api from './MainApi'

export const ItemApi = {
  getByNames: async function (names: Array<string>) {
    const requests = names.map(name => Api.item.getItemByName(name))
    const responses = await Promise.all(requests)
    return responses as unknown as Item[]
  },
}
