import React from 'react'
import { FC } from 'react'

import { SectionTitle } from '@/components/containers'
import GameWiseDescriptions from '@/components/game-wise-descriptions'
import { gameBlackLists } from '@/data/blacklists'
import { TransformedItem } from '@/types'

type DescriptionInterface = Pick<TransformedItem, 'descriptions'>
type TableProps = {
  descriptions: DescriptionInterface['descriptions']
}

interface ItemByGeneration {
  [key: string]: {
    description: string
    generation: string
    versionGroupNames: Array<string>
  }
}

const groupData = (descriptions: DescriptionInterface['descriptions']) => {
  return descriptions
    .filter(description => !gameBlackLists.includes(description.versionGroupName))
    .reduce((acc, curr) => {
      const { description: rawDescription, generation, versionGroupName } = curr
      // There are escape characters in the descriptions, which shall now be removed.
      const description = rawDescription.replace(/\n/g, ' ')

      // If the generation is not in the acc, add it.
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
    }, {} as ItemByGeneration)
}

export const GameDescriptions: FC<TableProps> = ({ descriptions }) => {
  const groupedData = groupData(descriptions)

  // Filter out undefined generations
  const properGroupedData = Object.values(groupedData).filter(row => row.generation !== undefined)

  return (
    <>
      <SectionTitle>Game Descriptions</SectionTitle>
      <GameWiseDescriptions descriptionData={properGroupedData} />
    </>
  )
}
