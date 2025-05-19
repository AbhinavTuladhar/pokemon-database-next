import Api from '@/services/api'
import { EvolutionChain } from '@/types'

class EvolutionService {
  static async getById(id: number) {
    const response = await Api.evolution.getEvolutionChainById(id)
    return response as EvolutionChain
  }
}

export default EvolutionService
