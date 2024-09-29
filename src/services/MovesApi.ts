import { Move } from '@/types'

import Api from './MainApi'

export const MovesApi = {
  getAllNames: async function () {
    const response = await Api.move.listMoves(0, 721)
    return response.results.map(move => move.name)
  },
  getByNames: async function (names: Array<string>) {
    const requests = names.map(name => Api.move.getMoveByName(name))
    const responses = await Promise.all(requests)
    return responses as unknown as Move[]
  },
  getByName: async function (name: string) {
    const response = await Api.move.getMoveByName(name)
    return response as unknown as Move
  },
  getByOffsetAndLimit: async function (offset: number, limit: number) {
    const response = await Api.move.listMoves(offset, limit)
    return response.results.map(move => move.name)
  },
}
