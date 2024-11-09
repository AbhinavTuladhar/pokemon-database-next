import { Metadata } from 'next'

import { PageTitle } from '@/components/containers'
import BerryExtractor from '@/extractors/BerryExtractor'
import { ItemExtractor } from '@/extractors/ItemExtractors'
import { BerryApi, ItemApi } from '@/services'
import { TransformedItem } from '@/types'

import { BerryTable } from './_components'

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
