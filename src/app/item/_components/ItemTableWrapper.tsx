import React from 'react'

import { ItemExtractor, ItemPocketExtractor } from '@/extractors/ItemExtractors'
import { ItemApi } from '@/services/ItemApi'

import DynamicTable from './DynamicTable'

const getItemPockets = async () => {
  const response = await ItemApi.getAllItemPockets()
  return response
}

const getItemPocketInformation = async () => {
  const itemPocketList = await getItemPockets()
  const response = await ItemApi.getItemPocketByNames(itemPocketList)
  const extractedInfo = response.map(ItemPocketExtractor)

  // Return the name of the pocket with the respective category list
  return extractedInfo.map(pocket => {
    return {
      pocketName: pocket.name,
      categories: pocket.categories,
    }
  })
}

const getAllItemNames = async () => {
  const response = await ItemApi.getAllItems()
  return response
}

const getAllItemData = async () => {
  const itemNames = await getAllItemNames()
  const itemData = await ItemApi.getByNames(itemNames)

  // Filter out unused items
  return itemData
    .map(ItemExtractor)
    .filter(
      ({ shortEntry, longEntry, category }) =>
        shortEntry !== '' && longEntry !== '' && category !== 'unused',
    )
    .sort((a, b) => a.name.localeCompare(b.name))
}

const ItemTableWrapper = async () => {
  const categories = await getItemPockets()
  const itemData = await getAllItemData()
  const pocketCategoryData = await getItemPocketInformation()

  return (
    <DynamicTable itemData={itemData} categories={categories} pocketData={pocketCategoryData} />
  )
}

export default ItemTableWrapper
