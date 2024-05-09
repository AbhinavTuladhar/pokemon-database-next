import { FC } from 'react'

import { SectionTitle } from '@/components/containers'
import GameWiseDescriptions from '@/components/game-wise-descriptions'
import { gameBlackLists } from '@/data/blacklists'

interface DescriptionInterface {
  description: string
  versionGroupName: string
  generation: string
}

interface AbilityByGeneration {
  [key: string]: {
    description: string
    generation: string
    versionGroupNames: Array<string>
  }
}

interface DescriptionProps {
  descriptions: Array<DescriptionInterface>
}

export const AbilityDescription: FC<DescriptionProps> = ({ descriptions }) => {
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
      } else {
        acc[generation].versionGroupNames.push(versionGroupName)
      }
      return acc
    }, {} as AbilityByGeneration)

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
