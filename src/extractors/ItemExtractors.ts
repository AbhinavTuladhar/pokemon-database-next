import numberMapper from '@/data/numberMapper'
import { Item, ItemCategory, ItemPocket } from '@/types'
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

export const ItemExtractor = (item: Item) => {
  const {
    attributes,
    category: { name: category },
    cost,
    effect_entries,
    flavor_text_entries,
    fling_effect,
    fling_power,
    game_indices,
    id,
    name,
    names,
    sprites: { default: sprite },
  } = item

  const tempEntry = effect_entries.find(entry => entry.language.name === 'en')

  const shortEntryTemp = tempEntry ? tempEntry.short_effect : ''

  // Strip away the 'Held: ' prefix in the short entry
  const shortEntry = shortEntryTemp.replace('Held: ', '')
  const longEntry = tempEntry ? tempEntry.effect : ''
  const firstGen = game_indices.length > 0 ? game_indices[0].generation.name : 'unknown'

  const [generationString, generationNumber] = firstGen.split('-')
  const newGenerationString = generationString.charAt(0).toUpperCase() + generationString.slice(1)
  const generationIntroduced = `${newGenerationString} ${numberMapper[generationNumber]}`

  return {
    attributes,
    category,
    cost,
    shortEntry,
    generationIntroduced,
    id,
    name,
    sprite,
    longEntry,
    flavourTextEntries: flavor_text_entries,
    names,
    fling_effect,
    fling_power,
  }
}
