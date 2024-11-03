import { Metadata } from 'next'
import Image from 'next/image'

import { Tooltip } from '@/components/client-components'
import {
  PageTitle,
  TableCell,
  TableCellHeader,
  TableContainer,
  TableRow,
} from '@/components/containers'
import BerryExtractor from '@/extractors/BerryExtractor'
import { ItemExtractor } from '@/extractors/ItemExtractors'
import { BerryApi, ItemApi } from '@/services'
import formatName from '@/utils/formatName'

export const metadata: Metadata = {
  title: 'Berry list | Pokémon Database',
}

const getBerryNames = async () => {
  const berryNames = await BerryApi.getAll()
  return berryNames
}

const getBerryInformationByNames = async (names: Array<string>) => {
  const responses = await BerryApi.getByNames(names)
  return responses.map(BerryExtractor)
}

const getItemInformationByNames = async (names: Array<string>) => {
  const responses = await ItemApi.getByNames(names)
  return responses.map(ItemExtractor)
}

const page = async () => {
  const berryNames = await getBerryNames()
  const berryInformation = await getBerryInformationByNames(berryNames)
  const itemNames = berryInformation.map(berry => berry.itemName)
  const itemInformation = await getItemInformationByNames(itemNames)

  // Combine the two corresponding objects in the berry and item arrays
  const combinedInformation = berryInformation.map(berry => {
    const foundItem = itemInformation.find(item => item.name === berry.itemName)
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
    <TableRow className="bg-neutral-200 font-bold dark:bg-hdr-dark">
      {tableHeaderNames.map((header, index) => (
        <TableCellHeader
          type="column"
          key={header.id}
          className="border-r border-r-gray-300 pr-4 last:border-r-0 dark:border-r-bd-dark"
        >
          <span id={header.id} className={`${index >= 5 ? 'hover:cursor-help' : ''}`}>
            {header.header}
          </span>
        </TableCellHeader>
      ))}
    </TableRow>
  )

  const tableRows = combinedInformation.map(berry => {
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
      <TableRow
        className="duration-300 hover:bg-amber-50 dark:hover:bg-dark-highlighted"
        key={berry.id}
      >
        {cellData.map(cell => (
          <TableCell
            key={`${cell.key} ${cell.value}`}
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
      <PageTitle> Berries </PageTitle>
      <TableContainer>
        <thead>{tableHeader}</thead>
        <tbody>{tableRows}</tbody>
      </TableContainer>
      {tooltipData.map(tip => (
        <Tooltip
          anchorSelect={`#${tip.id}`}
          place="bottom"
          key={tip.id}
          style={{ backgroundColor: 'black', padding: '0.5rem' }}
        >
          <span className="text-xs"> {tip.text} </span>
        </Tooltip>
      ))}
    </main>
  )
}

export default page
