import { ItemCategory, ItemPocket } from '@/types'
import { getResourceId } from '@/utils/urlUtils'

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

  // ids with > 1137 are generation 8+
  const itemNames = items
    .filter(item => {
      const { url } = item
      const itemId = getResourceId(url)
      return parseInt(itemId) <= 1137
    })
    .map(item => item.name)

  return {
    items: itemNames,
    ...rest,
  }
}
