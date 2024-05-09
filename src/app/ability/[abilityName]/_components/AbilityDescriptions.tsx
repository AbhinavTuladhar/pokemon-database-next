import { FC, Fragment } from 'react'

import { SectionTitle } from '@/components/containers'
import GameWiseDescription from '@/components/game-wise-descriptions'
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

  // const tableRows = properGroupedData.map((generationKey, rowIndex) => {
  //   const { description, versionGroupName } = generationKey
  //   return (
  //     <TableRow key={rowIndex}>
  //       <TableCellHeader wrapFlag={true}>
  //         <ul>
  //           {versionGroupName.map(version => {
  //             console.log(version)
  //             const gameList = newGameNameMap[version]
  //             return (
  //               <li className="list-none" key={version}>
  //                 {gameList.map((game, gameIndex) => {
  //                   const { colour, properName } = gameToColourAndNameMap[game]
  //                   return (
  //                     <Fragment key={gameIndex}>
  //                       <span className={colour}>{properName}</span>
  //                       {gameIndex !== gameList.length - 1 ? '/' : ''}
  //                     </Fragment>
  //                   )
  //                 })}
  //               </li>
  //             )
  //           })}
  //         </ul>
  //       </TableCellHeader>
  //       <TableCell>{description}</TableCell>
  //     </TableRow>
  //   )
  // })

  return (
    <>
      <SectionTitle>Game Descriptions</SectionTitle>
      {/* <TableContainer>
        <tbody>{tableRows}</tbody>
      </TableContainer> */}
      <GameWiseDescription descriptionData={properGroupedData} />
    </>
  )
}
