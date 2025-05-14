import Api from '@/services/MainApi'
import { Machine } from '@/types'

class MachineService {
  static async getByIds(ids: Array<number>) {
    const requests = ids.map(id => Api.machine.getMachineById(id))
    const responses = await Promise.all(requests)
    return responses as Machine[]
  }
}

export default MachineService
