import { LocationAreaEncounter } from '@/types'

import fetchData from './fetchData'

export const EncountersApi = {
  getById: async function (id: number) {
    const response = await fetchData<LocationAreaEncounter[]>(`/pokemon/${id}/encounters`)
    return response
  },
}
