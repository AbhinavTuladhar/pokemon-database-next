import { FC, Fragment } from 'react'

import {
  SectionTitle,
  TableCell,
  TableCellHeader,
  TableContainer,
  TableRow,
} from '@/components/containers'
import { gameBlackLists } from '@/data/blacklists'
import { newGameNameMap } from '@/data/gameNameMap'
import { gameToColourAndNameMap } from '@/data/gameNameToColourMap'

interface DescriptionInterface {
  description: string
  versionName: string
  generation: string
}

interface AbilityByGeneration {
  [key: string]: {
    description: string
    generation: string
    versionName: Array<string>
  }
}

interface DescriptionProps {
  descriptions: Array<DescriptionInterface>
}

export const AbilityDescription: FC<DescriptionProps> = ({ descriptions }) => {
  const groupedData = descriptions
    .filter(description => !gameBlackLists.includes(description.versionName))
    .reduce((acc, curr) => {
      const { description: rawDescription, generation, versionName } = curr
      // There are escape characters in the descriptions, which shall now be removed.
      const description = rawDescription?.replace(/\n/g, ' ')
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
    }, {} as AbilityByGeneration)

  // Filter out undefined generations
  const properGroupedData = descriptions
    ? Object?.values(groupedData).filter(row => row.generation !== undefined)
    : []

  const tableRows = properGroupedData.map((generationKey, rowIndex) => {
    const { description, versionName } = generationKey
    return (
      <TableRow key={rowIndex}>
        <TableCellHeader wrapFlag={true}>
          <ul>
            {versionName.map(version => {
              const gameList = newGameNameMap[version]
              return (
                <li className="list-none" key={version}>
                  {gameList.map((game, gameIndex) => {
                    const { colour, properName } = gameToColourAndNameMap[game]
                    return (
                      <Fragment key={gameIndex}>
                        <span className={colour}>{properName}</span>
                        {gameIndex !== gameList.length - 1 ? ' / ' : ''}
                      </Fragment>
                    )
                  })}
                </li>
              )
            })}
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
