import { Metadata } from 'next'

import PageTitle from '@/components/containers/PageTitle'
import TableCell from '@/components/containers/TableCell'
import TableCellHeader from '@/components/containers/TableCellHeader'
import TableContainer from '@/components/containers/TableContainer'
import TableRow from '@/components/containers/TableRow'
import NatureExtractor from '@/extractors/NatureExtractor'
import { NatureApi } from '@/services/NatureApi'
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
    <TableRow className="bg-table-header font-bold">
      {headerNames.map((header, index) => (
        <TableCellHeader className="!w-36 border-x text-center" type="column" key={index}>
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
        <TableRow key={rowIndex}>
          {cellData.map((cell, cellIndex) => (
            <TableCell variant="column" key={cellIndex} extraClassName=" border-x">
              {cell.value}
            </TableCell>
          ))}
        </TableRow>
      )
    })

  return (
    <main>
      <PageTitle>Natures</PageTitle>
      <TableContainer>
        {tableHeaders}
        {tableRows}
      </TableContainer>
    </main>
  )
}

export default NatureList
