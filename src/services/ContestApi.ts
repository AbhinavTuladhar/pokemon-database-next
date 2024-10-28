import { ContestEffect } from '@/types'

import Api from './MainApi'

export const ContestApi = {
  getAllEffectsData: async function () {
    const effectIds = Array.from({ length: 33 }, (_, index) => index + 1)

    const requests = effectIds.map(id => Api.contest.getContestEffectById(id))
    const responses = (await Promise.all(requests)) as unknown as ContestEffect[]
    return responses
  },

  getEffectById: async function (id: number) {
    const response = await Api.contest.getContestEffectById(id)
    return response as unknown as ContestEffect
  },
}
