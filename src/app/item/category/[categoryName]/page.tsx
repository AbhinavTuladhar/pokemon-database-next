import React, { FC } from 'react'

import PageTitle from '@/components/containers/PageTitle'
import ItemExtractor from '@/extractors/ItemExtractor'
import { ItemCategoryExtractor, ItemPocketExtractor } from '@/extractors/ItemExtractors'
import { ItemApi } from '@/services/ItemApi'
import formatName from '@/utils/formatName'

import ItemTable from './_components/ItemTable'

interface PageProps {
  params: {
    categoryName: string
  }
}

const getPocketData = async (name: string) => {
  const response = await ItemApi.getItemPocketByName(name)
  return ItemPocketExtractor(response)
}

const getCategoriesData = async (names: Array<string>) => {
  const response = await ItemApi.getItemCategoriesByNames(names)
  return response.map(ItemCategoryExtractor)
}

const getItemData = async (names: Array<string>) => {
  const response = await ItemApi.getByNames(names)
  return response
    .map(response => {
      const { shortEntry, sprite, category, name } = ItemExtractor(response)
      return { shortEntry, sprite, category, name }
    })
    .sort((a, b) => a.name.localeCompare(b.name))
}

const CategoryList: FC<PageProps> = async ({ params: { categoryName } }) => {
  const { categories } = await getPocketData(categoryName)
  const categoriesData = await getCategoriesData(categories)

  const itemNames = categoriesData.flatMap(category => {
    const { items } = category
    return items
  })

  const itemData = await getItemData(itemNames)

  return (
    <main>
      <PageTitle>{formatName(categoryName)} items</PageTitle>
      <ItemTable itemData={itemData} />
    </main>
  )
}

export default CategoryList
