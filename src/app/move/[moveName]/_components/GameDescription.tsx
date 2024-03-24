import { FC } from 'react'

import SectionTitle from '@/components/containers/SectionTitle'
import TableCell from '@/components/containers/TableCell'
import TableCellHeader from '@/components/containers/TableCellHeader'
import TableContainer from '@/components/containers/TableContainer'
import TableRow from '@/components/containers/TableRow'
import { gameBlackLists } from '@/data/blacklists'
import formatName from '@/utils/formatName'

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

const GameDescription: FC<DescriptionProps> = ({ descriptions }) => {
  // The objective is to group by generation, but display the game names.
  /*
  { descritpion, version, generation } is the structure of the object.
  */

  type GroupeDataInterface = Record<string, GroupedByGames>

  console.log(descriptions)

  const groupedData = descriptions
    .filter((description) => !gameBlackLists.includes(description.version))
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
    ? Object?.values(groupedData).filter((row) => row.generation !== undefined)
    : []

  const tableRows = properGroupedData.map((row, rowIndex) => (
    <TableRow key={rowIndex}>
      <TableCellHeader wrapFlag={true}>
        {row.version.map((version, index) => (
          <ul key={index}>
            <li className="text-sm font-normal text-white">{formatName(version)}</li>
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

export default GameDescription
