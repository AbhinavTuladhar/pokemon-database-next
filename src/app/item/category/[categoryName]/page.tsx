import React, { FC } from 'react'

import { ItemCategoryExtractor, ItemPocketExtractor } from '@/extractors/ItemExtractors'
import { ItemApi } from '@/services/ItemApi'

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

const CategoryList: FC<PageProps> = async ({ params: { categoryName } }) => {
  const { categories } = await getPocketData(categoryName)
  const categoriesData = await getCategoriesData(categories)
  return <div>{JSON.stringify(categoriesData, null, 2)}</div>
}

export default CategoryList
