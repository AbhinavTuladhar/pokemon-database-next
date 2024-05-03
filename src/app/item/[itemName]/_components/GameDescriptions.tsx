import React from 'react'
import { FC } from 'react'

import {
  SectionTitle,
  TableCell,
  TableCellHeader,
  TableContainer,
  TableRow,
} from '@/components/containers'
import { gameBlackLists } from '@/data/blacklists'
import gameNameMap from '@/data/gameNameMap'
import { TransformedItem } from '@/types'

type DescriptionInterface = Pick<TransformedItem, 'descriptions'>
type TableProps = {
  descriptions: DescriptionInterface['descriptions']
}

interface ItemByGeneration {
  [key: string]: {
    description: string
    generation: string
    versionName: Array<string>
  }
}

const groupData = (descriptions: DescriptionInterface['descriptions']) => {
  return descriptions
    .filter(description => !gameBlackLists.includes(description.versionName))
    .reduce((acc, curr) => {
      const { description: rawDescription, generation, versionName } = curr
      // There are escape characters in the descriptions, which shall now be removed.
      const description = rawDescription.replace(/\n/g, ' ')

      // If the generation is not in the acc, add it.
      if (!acc[generation]) {
        acc[generation] = {
          description,
          generation,
          versionName: [versionName],
        }
      } else {
        acc[generation].versionName.push(versionName)
      }
      return acc
    }, {} as ItemByGeneration)
}

export const GameDescriptions: FC<TableProps> = ({ descriptions }) => {
  const groupedData = groupData(descriptions)

  // Filter out undefined generations
  const properGroupedData = Object.values(groupedData).filter(row => row.generation !== undefined)

  const tableRows = properGroupedData.map((generationKey, rowIndex) => {
    const { description, versionName } = generationKey
    return (
      <TableRow key={rowIndex}>
        <TableCellHeader wrapFlag={true}>
          <ul>
            {versionName.map((version, index) => (
              <li key={index}> {gameNameMap[version]} </li>
            ))}
          </ul>
        </TableCellHeader>
        <TableCell>{description}</TableCell>
      </TableRow>
    )
  })

  return (
    <>
      <SectionTitle>Game Descriptions</SectionTitle>
      <TableContainer>
        <tbody>{tableRows}</tbody>
      </TableContainer>
    </>
  )
}
