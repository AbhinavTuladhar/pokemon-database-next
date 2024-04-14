import React from 'react'

import PageTitle from '@/components/containers/PageTitle'
import ItemExtractor from '@/extractors/ItemExtractor'
import { ItemApi } from '@/services/ItemApi'

import DynamicTable from './_components/DynamicTable'

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
  const itemData = await getAllItemData()
  return (
    <main>
      <PageTitle>Pokémon Items List</PageTitle>
      <section>
        <DynamicTable itemData={itemData} />
      </section>
    </main>
  )
}

export default ItemPage
