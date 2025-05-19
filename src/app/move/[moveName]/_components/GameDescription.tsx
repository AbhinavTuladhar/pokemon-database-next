import { FC } from 'react'

import GameWiseDescriptions from '@/components/game-wise-descriptions'
import { SectionTitle } from '@/components/ui/Title'
import { gameBlackLists } from '@/data/blacklist.data'

interface GameDescription {
  description: string
  versionGroupName: string
  generation: string
}

interface DescriptionProps {
  descriptions: Array<GameDescription>
}

interface GroupedByGames {
  description: string
  generation: string
  versionGroupNames: Array<string>
}

export const GameDescription: FC<DescriptionProps> = ({ descriptions }) => {
  // The objective is to group by generation, but display the game names.
  /*
  { descritpion, version, generation } is the structure of the object.
  */

  type GroupeDataInterface = Record<string, GroupedByGames>

  const groupedData = descriptions
    .filter(description => !gameBlackLists.includes(description.versionGroupName))
    .reduce((acc, curr) => {
      const { description: rawDescription, generation, versionGroupName } = curr
      // There are escape characters in the descriptions, which shall now be removed.
      const description = rawDescription?.replace(/\n/g, ' ')
      if (!acc[generation]) {
        acc[generation] = {
          description,
          generation,
          versionGroupNames: [versionGroupName],
        }
        // Games in the same generation may have different descriptions. So another key is allocated here
      } else if (acc[generation].description !== description) {
        const newGeneration = `${generation}_new`
        acc[newGeneration] = {
          description,
          generation: newGeneration,
          versionGroupNames: [versionGroupName],
        }
      } else {
        acc[generation].versionGroupNames.push(versionGroupName)
      }
      return acc
    }, {} as GroupeDataInterface)

  // Filter out undefined generations
  const properGroupedData = descriptions
    ? Object?.values(groupedData).filter(row => row.generation !== undefined)
    : []

  return (
    <>
      <SectionTitle>Game Descriptions</SectionTitle>
      <GameWiseDescriptions descriptionData={properGroupedData} />
    </>
  )
}
