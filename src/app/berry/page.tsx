import { Metadata } from 'next'
import Image from 'next/image'

import SectionTitle from '@/components/containers/SectionTitle'
import TableCell from '@/components/containers/TableCell'
import TableCellHeader from '@/components/containers/TableCellHeader'
import TableContainer from '@/components/containers/TableContainer'
import TableRow from '@/components/containers/TableRow'
import { Tooltip } from '@/components/ReactTooltip'
import BerryExtractor from '@/extractors/BerryExtractor'
import ItemExtractor from '@/extractors/ItemExtractor'
import { BerryApi } from '@/services/BerryApi'
import { ItemApi } from '@/services/ItemApi'
import formatName from '@/utils/formatName'

export const metadata: Metadata = {
  title: 'Berry list | Pokémon Database',
}

const getBerryUrls = async () => {
  const response = await BerryApi.getAll()
  return response
}

const getBerryInformation = async (urls: Array<string>) => {
  const responses = await BerryApi.getByUrls(urls)
  return responses.map(BerryExtractor)
}

const getItemInformation = async (urls: Array<string>) => {
  const responses = await ItemApi.getByUrls(urls)
  return responses.map(ItemExtractor)
}

const page = async () => {
  const berryList = await getBerryUrls()
  const berryInformation = await getBerryInformation(berryList.results.map((berry) => berry.url))
  const itemUrls = berryInformation.map((berry) => berry.url)
  const itemInformation = await getItemInformation(itemUrls)

  // Combine the two corresponding objects in the berry and item arrays
  const combinedInformation = berryInformation.map((berry) => {
    const foundItem = itemInformation!.find((item) => item.name === berry.itemName)
    return { ...foundItem, ...berry }
  })

  const tableHeaderNames = [
    { header: 'Gen', id: 'generation' },
    { header: 'No.', id: 'id' },
    { header: 'Sprite', id: 'sprite' },
    { header: 'Name', id: 'name' },
    { header: 'Effect(s)', id: 'entry' },
    { header: 'Growth time', id: 'growthTime' },
    { header: 'Firmness', id: 'firmness' },
    { header: 'Size (cm)', id: 'size' },
    { header: 'Max berries', id: 'maxHarvest' },
  ]

  const tableHeader = (
    <TableRow className="bg-[#1a1a1a] font-bold">
      {tableHeaderNames.map((header, index) => (
        <TableCellHeader type="column" key={index} className="border-x text-center">
          <span id={header.id} className={`${index >= 5 ? 'hover:cursor-help' : ''}`}>
            {' '}
            {header.header}
          </span>
        </TableCellHeader>
      ))}
    </TableRow>
  )

  const tableRows = combinedInformation.map((berry, index) => {
    const {
      generationIntroduced,
      id,
      sprite,
      name,
      shortEntry,
      firmness,
      size,
      maxHarvest,
      growthTime,
    } = berry

    const berryImage = sprite && <Image src={sprite} alt={name} width={40} height={40} />

    const cellData = [
      { key: 'generation', value: generationIntroduced?.slice(generationIntroduced.length - 1) },
      { key: 'id', value: id },
      { key: 'sprite', value: berryImage },
      { key: 'name', value: formatName(name) },
      { key: 'entry', value: shortEntry, extraStyle: 'min-w-[25rem]' },
      { key: 'growthTime', value: growthTime },
      { key: 'firmness', value: formatName(firmness), extraStyle: 'whitespace-nowrap' },
      { key: 'size', value: size / 10 },
      { key: 'maxHarvest', value: maxHarvest },
    ]

    return (
      <TableRow key={index}>
        {cellData.map((cell, cellIndex) => (
          <TableCell
            key={cellIndex}
            variant="column"
            extraClassName={`${cell?.extraStyle} border-x`}
          >
            {cell.value}
          </TableCell>
        ))}
      </TableRow>
    )
  })

  const tooltipData = [
    { id: 'growthTime', text: 'Time it takes the tree to grow one stage, in hours.' },
    { id: 'firmness', text: 'The firmness of this berry, used in making Pokéblocks or Poffins.' },
    { id: 'size', text: 'The size of this Berry, in centimetres.' },
    { id: 'maxHarvest', text: 'The maximum number of these berries that can grow on one tree.' },
  ]

  return (
    <main>
      <h1 className="my-4 text-center text-5xl font-bold"> Berries </h1>
      <TableContainer>
        {tableHeader}
        {tableRows}
      </TableContainer>
      <>
        {tooltipData.map((tip, index) => (
          <Tooltip
            anchorSelect={`#${tip.id}`}
            place="bottom"
            key={index}
            style={{ backgroundColor: 'black', padding: '0.5rem' }}
          >
            <span className="text-xs"> {tip.text} </span>
          </Tooltip>
        ))}
      </>
    </main>
  )
}

export default page
