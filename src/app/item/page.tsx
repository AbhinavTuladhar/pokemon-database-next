import React from 'react'
import { Metadata } from 'next'

import PageTitle from '@/components/containers/PageTitle'
import { ItemExtractor, ItemPocketExtractor } from '@/extractors/ItemExtractors'
import { ItemApi } from '@/services/ItemApi'

import DynamicTable from './_components/DynamicTable'

export const metadata: Metadata = {
  title: 'List of Pokémon Items | Pokémon Database',
}

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
  return itemData.map(ItemExtractor).sort((a, b) => a.name.localeCompare(b.name))
}

const ItemPage = async () => {
  const categories = await getItemPockets()
  const itemData = await getAllItemData()
  const pocketCategoryData = await getItemPocketInformation()
  return (
    <main>
      <PageTitle>Pokémon Items List</PageTitle>
      <section>
        <DynamicTable itemData={itemData} categories={categories} pocketData={pocketCategoryData} />
      </section>
    </main>
  )
}

export default ItemPage
