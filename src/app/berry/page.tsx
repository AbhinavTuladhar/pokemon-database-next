import { Metadata } from 'next'

import { PageTitle } from '@/components/ui/Title'
import { BerryExtractor, ItemExtractor } from '@/extractors'
import BerryService from '@/features/games/services/berry.service'
import ItemService from '@/features/games/services/item.service'
import { TransformedItem } from '@/types'

import { BerryTable } from './_components'

export const metadata: Metadata = {
  title: 'Berry list | Pokémon Database',
}

const getBerryNames = async () => {
  const berryNames = await BerryService.getAll()
  return berryNames
}

const getBerryInformationByNames = async (names: Array<string>) => {
  const responses = await BerryService.getByNames(names)
  return responses.map(BerryExtractor)
}

const getItemInformationByNames = async (names: Array<string>) => {
  const responses = await ItemService.getByNames(names)
  return responses.map(ItemExtractor)
}

const page = async () => {
  const berryNames = await getBerryNames()
  const berryInformation = await getBerryInformationByNames(berryNames)
  const itemNames = berryInformation.map(berry => berry.itemName)
  const itemInformation = await getItemInformationByNames(itemNames)

  // Combine the two corresponding objects in the berry and item arrays
  const combinedInformation = berryInformation.map(berry => {
    const foundItem = itemInformation.find(item => item.name === berry.itemName) as TransformedItem
    return { ...foundItem, ...berry }
  })

  return (
    <main>
      <PageTitle> Berries </PageTitle>
      <BerryTable berryData={combinedInformation} />
    </main>
  )
}

export default page
