import { ItemCategory, ItemPocket } from '@/types'

export const ItemPocketExtractor = (data: ItemPocket) => {
  const { categories, id, name } = data
  const categoryNames = categories.map(category => category.name)
  return {
    categories: categoryNames,
    id,
    name,
  }
}

export const ItemCategoryExtractor = (data: ItemCategory) => {
  const { items, ...rest } = data
  const itemNames = items.map(item => item.name)
  return {
    items: itemNames,
    ...rest,
  }
}
