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

interface GameDescription {
  description: string
  version: string
  generation: string
}

interface DescriptionProps {
  descriptions: Array<GameDescription>
}

interface GroupedByGames {
  description: string
  generation: string
  version: Array<string>
}

export const GameDescription: FC<DescriptionProps> = ({ descriptions }) => {
  // The objective is to group by generation, but display the game names.
  /*
  { descritpion, version, generation } is the structure of the object.
  */

  type GroupeDataInterface = Record<string, GroupedByGames>

  const groupedData = descriptions
    .filter(description => !gameBlackLists.includes(description.version))
    .reduce((acc, curr) => {
      const { description: rawDescription, generation, version } = curr
      // There are escape characters in the descriptions, which shall now be removed.
      const description = rawDescription?.replace(/\n/g, ' ')
      if (!acc[generation]) {
        acc[generation] = {
          description,
          generation,
          version: [version],
        }
        // Games in the same generation may have different descriptions. So another key is allocated here
      } else if (acc[generation].description !== description) {
        const newGeneration = `${generation}_new`
        acc[newGeneration] = {
          description,
          generation: newGeneration,
          version: [version],
        }
      } else {
        acc[generation].version.push(version)
      }
      return acc
    }, {} as GroupeDataInterface)

  // Filter out undefined generations
  const properGroupedData = descriptions
    ? Object?.values(groupedData).filter(row => row.generation !== undefined)
    : []

  const tableRows = properGroupedData.map((row, rowIndex) => (
    <TableRow key={rowIndex}>
      <TableCellHeader wrapFlag={true}>
        {row.version.map((version, index) => (
          <ul key={index}>
            <li className="inline break-words text-sm font-normal">{gameNameMap[version]}</li>
          </ul>
        ))}
      </TableCellHeader>
      <TableCell>{row.description}</TableCell>
    </TableRow>
  ))

  return (
    <>
      <SectionTitle>Game Descriptions</SectionTitle>
      <TableContainer>
        <tbody> {tableRows}</tbody>
      </TableContainer>
    </>
  )
}
