import Api from '@/services/MainApi'
import { ContestEffect } from '@/types'

class ContestService {
  static async getAllEffectsData() {
    const effectIds = Array.from({ length: 33 }, (_, index) => index + 1)

    const requests = effectIds.map(id => Api.contest.getContestEffectById(id))
    const responses = (await Promise.all(requests)) as unknown as ContestEffect[]
    return responses
  }

  static async getEffectById(id: number) {
    const response = await Api.contest.getContestEffectById(id)
    return response as unknown as ContestEffect
  }
}
export default ContestService
