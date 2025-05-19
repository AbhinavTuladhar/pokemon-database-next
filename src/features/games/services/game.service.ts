import { removeSpinOffGames } from '@/features/games/helpers/games.utils'
import Api from '@/services/api'
import { VersionGroup } from '@/types'

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
