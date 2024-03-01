import { Machine } from '@/types'
import fetchData from './fetchData'
import fetchMultipleData from './fetchMultipleData'
import trimUrl from '@/utils/trimUrl'

export const MachineApi = {
  get: async function (url: string) {
    const trimmedUrl = trimUrl(url)
    const response = await fetchData<Machine>(trimmedUrl)
    return response
  },
  getByUrls: async function (urls: Array<string>) {
    const trimmedUrls = urls.map(trimUrl)
    const response = await fetchMultipleData<Machine>(trimmedUrls)
    return response
  },
}
