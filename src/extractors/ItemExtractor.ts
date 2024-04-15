import numberMapper from '@/data/numberMapper'
import { Item } from '@/types'

const ItemExtractor = (item: Item) => {
  const {
    category: { name: category },
    cost,
    effect_entries,
    game_indices,
    id,
    name,
    sprites: { default: sprite },
  } = item

  const tempEntry = effect_entries.find(entry => entry.language.name === 'en')

  const shortEntryTemp = tempEntry ? tempEntry.short_effect : ''

  // Strip away the 'Held: ' prefix in the short entry
  const shortEntry = shortEntryTemp.replace('Held: ', '')
  const firstGen = game_indices.length > 0 ? game_indices[0].generation.name : 'unknown'

  const [generationString, generationNumber] = firstGen.split('-')
  const newGenerationString = generationString.charAt(0).toUpperCase() + generationString.slice(1)
  const generationIntroduced = `${newGenerationString} ${numberMapper[generationNumber]}`

  return {
    category,
    cost,
    shortEntry,
    generationIntroduced,
    id,
    name,
    sprite,
  }
}

export default ItemExtractor
