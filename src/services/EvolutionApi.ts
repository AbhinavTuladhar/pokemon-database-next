import { EvolutionChain,NamedApiResourceList, Pokemon } from '@/types'
import trimUrl from '@/utils/trimUrl'

import fetchData from './fetchData'

export const EvolutionApi = {
  get: async function (url: string) {
    const response = await fetchData<EvolutionChain>(trimUrl(url))
    return response
  },
}
