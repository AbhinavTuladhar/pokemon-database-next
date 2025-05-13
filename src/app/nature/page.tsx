import { Metadata } from 'next'

import { PageTitle } from '@/components/containers'
import { Table, TableCell, TableHeader, TableRow } from '@/components/ui/Table'
import { NatureExtractor } from '@/extractors'
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
    <TableRow className="dark:bg-hdr-dark bg-neutral-200 font-bold">
      {headerNames.map((header, index) => (
        <TableHeader
          className="dark:border-r-bd-dark w-36! border-r border-r-gray-300 pr-4 text-center last:border-r-0"
          type="column"
          key={header + index}
        >
          {header}
        </TableHeader>
      ))}
    </TableRow>
  )

  const tableRows = natureInformation
    .filter(nature => nature !== undefined)
    .map(nature => {
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
          key={nature.id}
          className="dark:hover:bg-dark-highlighted duration-300 hover:bg-amber-50"
        >
          {cellData.map((cell, cellIndex) => (
            <TableCell
              variant="column"
              key={cell.key + cellIndex}
              extraClassName="border-x min-w-40"
            >
              {cell.value}
            </TableCell>
          ))}
        </TableRow>
      )
    })

  return (
    <main>
      <PageTitle>Natures</PageTitle>
      <Table useFullWidth={false}>
        {tableHeaders}
        {tableRows}
      </Table>
    </main>
  )
}

export default NatureList
