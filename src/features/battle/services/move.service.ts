import Api from '@/services/api'
import { Move } from '@/types'

class MoveService {
  static async getAllNames() {
    const response = await Api.move.listMoves(0, 721)
    return response.results.map(move => move.name)
  }
  static async getByNames(names: Array<string>) {
    const requests = names.map(name => Api.move.getMoveByName(name))
    const responses = await Promise.all(requests)
    return responses as unknown as Move[]
  }
  static async getByName(name: string) {
    const response = await Api.move.getMoveByName(name)
    return response as unknown as Move
  }
  static async getByOffsetAndLimit(offset: number, limit: number) {
    const response = await Api.move.listMoves(offset, limit)
    return response.results.map(move => move.name)
  }
}

export default MoveService
