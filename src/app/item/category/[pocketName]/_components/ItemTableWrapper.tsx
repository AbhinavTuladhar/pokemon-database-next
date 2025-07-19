import React, { FC } from 'react'

import { isValidItem } from '@/features/games/helpers/item.helper'
import ItemService from '@/features/games/services/item.service'
import { transformItem } from '@/features/games/transformers/transform-item'
import { getResourceId } from '@/utils/url.utils'

import { DynamicTable } from './DynamicTable'

const getItemIds = async (pocketName: string) => {
  const pocketData = await ItemService.getItemPocketByName(pocketName)
  const itemCategories = pocketData.categories.map(category => category.name)
  const categoriesData = await ItemService.getItemCategoriesByNames(itemCategories)
  // For each category, get the item ID and throw away items that are in gen 8+
  const itemIds = categoriesData
    .map(category => category.items.map(item => getResourceId(item.url)))
    .flat()
    .filter(id => isValidItem(+id))
  return itemIds
}

const getCategoryItemsData = async (itemIds: number[]) => {
  const itemData = await ItemService.getByIds(itemIds)
  return itemData
    .map(transformItem)
    .filter(
      ({ shortEntry, longEntry, category }) =>
        shortEntry !== '' && longEntry !== '' && category !== 'unused',
    )
    .sort((a, b) => a.name.localeCompare(b.name))
}

const getFinalItemData = async (pocketName: string) => {
  const itemIds = await getItemIds(pocketName)
  const itemData = await getCategoryItemsData(itemIds.map(id => +id))
  return itemData
}

interface TableWrapperProps {
  pocketName: string
}

export const ItemTableWrapper: FC<TableWrapperProps> = async ({ pocketName }) => {
  const finalItemData = await getFinalItemData(pocketName)

  return <DynamicTable itemData={finalItemData} />
}
