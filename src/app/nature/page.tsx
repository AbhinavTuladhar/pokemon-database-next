import TableContainer from '@/components/containers/TableContainer'
import TableRow from '@/components/containers/TableRow'
import TableCellHeader from '@/components/containers/TableCellHeader'
import TableCell from '@/components/containers/TableCell'
import { NatureApi } from '@/services/NatureApi'
import NatureExtractor from '@/extractors/NatureExtractor'
import formatName from '@/utils/formatName'

const getNatures = async () => {
  const response = await NatureApi.get()
  return response
}

const getAllNaturesInfo = async (urls: Array<string>) => {
  const responses = await NatureApi.getByUrls(urls)
  return responses.map(NatureExtractor).sort((a, b) => a.name.localeCompare(b.name))
}

const NatureList = async () => {
  const natureUrls = (await getNatures()).results.map((nature) => nature.url)
  const natureInformation = await getAllNaturesInfo(natureUrls)

  const headerNames = ['Nature', 'Increases', 'Decreases', 'Likes', 'Hates']
  const tableHeaders = (
    <TableRow className="bg-[#1a1a1a] font-bold">
      {headerNames.map((header, index) => (
        <TableCellHeader className="!w-36 border-x text-center" type="column" key={index}>
          {header}
        </TableCellHeader>
      ))}
    </TableRow>
  )

  const tableRows = natureInformation
    .filter((nature) => nature !== undefined)
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
      <h1 className="my-4 text-center text-5xl font-bold">Natures</h1>
      <TableContainer>
        {tableHeaders}
        {tableRows}
      </TableContainer>
    </main>
  )
}

export default NatureList
