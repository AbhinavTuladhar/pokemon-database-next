import { NamedApiResourceList, Pokemon, EvolutionChain } from '@/types'
import fetchData from './fetchData'
import trimUrl from '@/utils/trimUrl'

export const EvolutionApi = {
  get: async function (url: string) {
    const response = await fetchData<EvolutionChain>(trimUrl(url))
    return response
  },
}
