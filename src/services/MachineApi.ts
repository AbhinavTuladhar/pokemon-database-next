import { Machine } from '@/types'

import Api from './MainApi'

export const MachineApi = {
  getByIds: async function (ids: Array<number>) {
    const requests = ids.map(id => Api.machine.getMachineById(id))
    const responses = await Promise.all(requests)
    return responses as Machine[]
  },
}
