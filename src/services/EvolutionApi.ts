import { EvolutionChain } from '@/types'

import Api from './MainApi'

export const EvolutionApi = {
  getById: async function (id: number) {
    const response = await Api.evolution.getEvolutionChainById(id)
    return response as EvolutionChain
  },
}
