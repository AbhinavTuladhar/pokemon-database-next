import Api from '@/services/MainApi'
import { GrowthRate } from '@/types'

class GrowthRateService {
  static async getAllData() {
    const listResponse = await Api.pokemon.listGrowthRates()
    const growthRateNames = listResponse.results.map(growthRate => growthRate.name)

    const requests = growthRateNames.map(name => Api.pokemon.getGrowthRateByName(name))
    const responses = await Promise.all(requests)

    return responses as unknown as GrowthRate[]
  }
}

export default GrowthRateService
