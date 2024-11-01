/**
 * For the location pages
 */
export const generationToGameListMap: Record<string, string[]> = {
  'Generation 1': ['red', 'blue', 'yellow'],
  'Generation 2': ['gold', 'silver', 'crystal'],
  'Generation 3 Hoenn': ['sapphire', 'ruby', 'emerald'],
  'Generation 3 remake': ['leafgreen', 'firered'],
  'Generation 4 Sinnoh': ['diamond', 'pearl', 'platinum'],
  'Generation 4 remake': ['heartgold', 'soulsilver'],
  'Generation 5': ['black', 'white', 'black-2', 'white-2'],
  'Generation 6': ['x', 'y'],
  'Generation 7': ['sun', 'moon', 'ultra-sun', 'ultra-moon'],
}

/**
 * Used in the generation - wise move view for each Pokemon
 */
export const generationToGameListMapV2: Record<string, string[]> = {
  'Generation 1': ['red', 'blue', 'yellow'],
  'Generation 2': ['gold', 'silver', 'crystal'],
  'Generation 3': ['sapphire', 'ruby', 'emerald', 'leafgreen', 'firered'],
  'Generation 4': ['diamond', 'pearl', 'platinum', 'heartgold', 'soulsilver'],
  'Generation 5': ['black', 'white', 'black-2', 'white-2'],
  'Generation 6': ['x', 'y', 'omega-ruby', 'alpha-sapphire'],
  'Generation 7': ['sun', 'moon', 'ultra-sun', 'ultra-moon'],
}

export const generationToGameListMapV3: Record<string, string[]> = {
  1: ['red-blue', 'yellow'],
  2: ['gold-silver', 'crystal'],
  3: ['ruby-sapphire', 'emerald', 'firered-leafgreen'],
  4: ['diamond-pearl', 'platinum', 'heartgold-soulsilver'],
  5: ['black-white', 'black-2-white-2'],
  6: ['x-y', 'omega-ruby-alpha-sapphire'],
  7: ['sun-moon', 'ultra-sun-ultra-moon'],
}

export default generationToGameListMap
