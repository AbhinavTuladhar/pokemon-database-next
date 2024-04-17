import React, { FC } from 'react'

import PageTitle from '@/components/containers/PageTitle'
import { ItemExtractor } from '@/extractors/ItemExtractors'
import { ItemApi } from '@/services/ItemApi'
import formatName from '@/utils/formatName'

import ItemEffect from './_components/ItemEffect'

const getItemData = async (name: string) => {
  const response = await ItemApi.getByName(name)
  return ItemExtractor(response)
}

interface PageProps {
  params: {
    itemName: string
  }
}

const ItemPage: FC<PageProps> = async ({ params: { itemName } }) => {
  const itemData = await getItemData(itemName)

  const {
    attributes,
    longEntry,
    shortEntry,
    flavourTextEntries,
    fling_effect,
    fling_power,
    cost,
    generationIntroduced,
    names,
  } = itemData
  return (
    <main>
      <PageTitle> {formatName(itemName)}</PageTitle>
      <ItemEffect entry={longEntry} />
    </main>
  )
}

export default ItemPage
