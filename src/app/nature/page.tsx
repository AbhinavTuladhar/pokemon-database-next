import { Metadata } from 'next'

import {
  PageTitle,
  TableCell,
  TableCellHeader,
  TableContainer,
  TableRow,
} from '@/components/containers'
import NatureExtractor from '@/extractors/NatureExtractor'
import { NatureApi } from '@/services'
import formatName from '@/utils/formatName'

export const metadata: Metadata = {
  title: 'Pokémon Nature List | Pokémon Database',
}

const getNatureNames = async () => {
  const response = await NatureApi.getAllNames()
  return response
}

const getNaturesInformation = async (names: Array<string>) => {
  const responses = await NatureApi.getByNames(names)
  return responses.map(NatureExtractor)
}

const NatureList = async () => {
  const natureNames = await getNatureNames()
  const natureInformation = await getNaturesInformation(natureNames)

  const headerNames = ['Nature', 'Increases', 'Decreases', 'Likes', 'Hates']
  const tableHeaders = (
    <TableRow className="bg-neutral-200 font-bold dark:bg-table-header">
      {headerNames.map((header, index) => (
        <TableCellHeader
          className="!w-36 border-r border-r-gray-300 pr-4 text-center last:border-r-0 dark:border-r-table-border"
          type="column"
          key={index}
        >
          {header}
        </TableCellHeader>
      ))}
    </TableRow>
  )

  const tableRows = natureInformation
    .filter(nature => nature !== undefined)
    .map((nature, rowIndex) => {
      const { decreasedStat, hatesFlavour, increasedStat, likesFlavour, name } = nature

      const cellData = [
        { key: 'nature', value: formatName(name) },
        { key: 'increases', value: formatName(increasedStat) },
        { key: 'decreases', value: formatName(decreasedStat) },
        { key: 'likes', value: formatName(likesFlavour) },
        { key: 'hates', value: formatName(hatesFlavour) },
      ]

      return (
        <TableRow
          key={rowIndex}
          className="duration-300 hover:bg-amber-50 dark:hover:bg-dark-highlighted"
        >
          {cellData.map((cell, cellIndex) => (
            <TableCell variant="column" key={cellIndex} extraClassName="border-x min-w-40">
              {cell.value}
            </TableCell>
          ))}
        </TableRow>
      )
    })

  return (
    <main>
      <PageTitle>Natures</PageTitle>
      <TableContainer useFullWidth={false}>
        {tableHeaders}
        {tableRows}
      </TableContainer>
    </main>
  )
}

export default NatureList
