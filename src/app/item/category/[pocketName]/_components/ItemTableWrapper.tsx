import React, { FC } from 'react'

import { ItemExtractor } from '@/extractors'
import { ItemApi } from '@/services'

import { DynamicTable } from './DynamicTable'

const getItemNames = async (pocketName: string) => {
  const pocketData = await ItemApi.getItemPocketByName(pocketName)
  const itemCategories = pocketData.categories.map(category => category.name)
  const categoriesData = await ItemApi.getItemCategoriesByNames(itemCategories)
  const itemNames = categoriesData.map(category => category.items.map(item => item.name)).flat()
  return itemNames
}

const getCategoryItemsData = async (itemNames: string[]) => {
  const itemData = await ItemApi.getByNames(itemNames)
  return itemData
    .map(ItemExtractor)
    .filter(
      ({ shortEntry, longEntry, category }) =>
        shortEntry !== '' && longEntry !== '' && category !== 'unused',
    )
    .sort((a, b) => a.name.localeCompare(b.name))
}

const getFinalItemData = async (pocketName: string) => {
  const itemNames = await getItemNames(pocketName)
  const itemData = await getCategoryItemsData(itemNames)
  return itemData
}

interface TableWrapperProps {
  pocketName: string
}

export const ItemTableWrapper: FC<TableWrapperProps> = async ({ pocketName }) => {
  const finalItemData = await getFinalItemData(pocketName)

  return <DynamicTable itemData={finalItemData} />
}
