import { GrowthRate } from '@/types'

import Api from './MainApi'

export const GrowthRateApi = {
  getAllData: async function () {
    const listResponse = await Api.pokemon.listGrowthRates()
    const growthRateNames = listResponse.results.map(growthRate => growthRate.name)

    const requests = growthRateNames.map(name => Api.pokemon.getGrowthRateByName(name))
    const responses = await Promise.all(requests)

    return responses as unknown as GrowthRate[]
  },
}
