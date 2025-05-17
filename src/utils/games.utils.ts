import { gameBlackLists } from '@/data/blacklist.data'
import gameToGenerationMap from '@/data/gameToGenerationMap'
import { NamedApiResource, VersionGroup } from '@/types'

export const removeSpinOffGames = (data: Array<NamedApiResource<VersionGroup>>) =>
  data.filter(game => !gameBlackLists.includes(game.name))

/**
 * Group version groups by their generation.
 */
export const groupGamesByGeneration = (data: Array<string>) => {
  const gamesWithGeneration = data.map(game => {
    const generation = gameToGenerationMap[game]
    return { generation, versionGroup: game }
  })

  const gamesGroupedByGeneration = gamesWithGeneration.reduce(
    (acc, item) => {
      const { generation, versionGroup } = item

      if (!acc[generation]) {
        acc[generation] = [versionGroup]
      } else {
        acc[generation].push(versionGroup)
      }

      return acc
    },
    {} as Record<string, Array<string>>,
  )

  return Object.entries(gamesGroupedByGeneration).map(([generation, versionGroups]) => ({
    generation,
    versionGroups,
  }))
}
