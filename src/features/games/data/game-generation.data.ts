// For getting the generation from a singular game name.

export const gameToGeneration: Record<string, string> = {
  'red': 'Generation 1',
  'blue': 'Generation 1',
  'yellow': 'Generation 1',

  'gold': 'Generation 2',
  'silver': 'Generation 2',
  'crystal': 'Generation 2',

  'sapphire': 'Generation 3',
  'ruby': 'Generation 3',
  'emerald': 'Generation 3',
  'leafgreen': 'Generation 3',
  'firered': 'Generation 3',

  'diamond': 'Generation 4',
  'pearl': 'Generation 4',
  'platinum': 'Generation 4',
  'heartgold': 'Generation 4',
  'soulsilver': 'Generation 4',

  'black': 'Generation 5',
  'white': 'Generation 5',
  'black-2': 'Generation 5',
  'white-2': 'Generation 5',

  'x': 'Generation 6',
  'y': 'Generation 6',
  'omega-ruby': 'Generation 6',
  'alpha-sapphire': 'Generation 6',

  'sun': 'Generation 7',
  'moon': 'Generation 7',
  'ultra-sun': 'Generation 7',
  'ultra-moon': 'Generation 7',

  'sword-shield': 'Generation 8',
}

export const gameToGenerationInternal: Record<string, string> = {
  ...gameToGeneration,
  'sapphire': 'Generation 3 Hoenn',
  'ruby': 'Generation 3 Hoenn',
  'emerald': 'Generation 3 Hoenn',

  'leafgreen': 'Generation 3 remake',
  'firered': 'Generation 3 remake',

  'diamond': 'Generation 4 Sinnoh',
  'pearl': 'Generation 4 Sinnoh',
  'platinum': 'Generation 4 Sinnoh',

  'heartgold': 'Generation 4 remake',
  'soulsilver': 'Generation 4 remake',

  'omega-ruby': 'Generation 6 remake',
  'alpha-sapphire': 'Generation 6 remake',
}

export const versionToGeneration: Record<string, string> = {
  'red-blue': 'Generation 1',
  'yellow': 'Generation 1',
  'gold-silver': 'Generation 2',
  'crystal': 'Generation 2',
  'ruby-sapphire': 'Generation 3',
  'emerald': 'Generation 3',
  'firered-leafgreen': 'Generation 3',
  'diamond-pearl': 'Generation 4',
  'platinum': 'Generation 4',
  'heartgold-soulsilver': 'Generation 4',
  'black-white': 'Generation 5',
  'black-2-white-2': 'Generation 5',
  'x-y': 'Generation 6',
  'omega-ruby-alpha-sapphire': 'Generation 6',
  'sun-moon': 'Generation 7',
  'ultra-sun-ultra-moon': 'Generation 7',
  'sword-shield': 'Generation 8',
}

/**
 * For the location pages
 */
export const generationInternalToGameArray: Record<string, string[]> = {
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

export const generationToGameArray: Record<string, string[]> = {
  'Generation 1': ['red', 'blue', 'yellow'],
  'Generation 2': ['gold', 'silver', 'crystal'],
  'Generation 3': ['sapphire', 'ruby', 'emerald', 'leafgreen', 'firered'],
  'Generation 4': ['diamond', 'pearl', 'platinum', 'heartgold', 'soulsilver'],
  'Generation 5': ['black', 'white', 'black-2', 'white-2'],
  'Generation 6': ['x', 'y', 'omega-ruby', 'alpha-sapphire'],
  'Generation 7': ['sun', 'moon', 'ultra-sun', 'ultra-moon'],
}

export const generationNumberToGroupArray: Record<string, string[]> = {
  1: ['red-blue', 'yellow'],
  2: ['gold-silver', 'crystal'],
  3: ['ruby-sapphire', 'emerald', 'firered-leafgreen'],
  4: ['diamond-pearl', 'platinum', 'heartgold-soulsilver'],
  5: ['black-white', 'black-2-white-2'],
  6: ['x-y', 'omega-ruby-alpha-sapphire'],
  7: ['sun-moon', 'ultra-sun-ultra-moon'],
}
