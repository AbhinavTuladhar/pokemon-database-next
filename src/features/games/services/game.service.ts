import Api from '@/services/MainApi'
import { VersionGroup } from '@/types'
import { removeSpinOffGames } from '@/utils/games.utils'

class GameService {
  static async getGames() {
    const response = await Api.game.listVersionGroups(0, 18)
    const gameList = removeSpinOffGames(response.results)
    return gameList
  }
  static async getVersionGroupData(versionGroup: string) {
    const response = (await Api.game.getVersionGroupByName(versionGroup)) as VersionGroup
    return response
  }
}

export default GameService
