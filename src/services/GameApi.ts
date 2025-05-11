import { removeSpinOffGames } from '@/utils/games.utils'

import Api from './MainApi'

export const GameApi = {
  getGames: async function () {
    const response = await Api.game.listVersionGroups(0, 18)
    const gameList = removeSpinOffGames(response.results)
    return gameList
  },
}
