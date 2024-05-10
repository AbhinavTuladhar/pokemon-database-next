/**
 * Converts unformatted game names to their proper forms.
 */
const gameNameMap: Record<string, string> = {
  'red-blue': 'Red / Blue',
  'yellow': 'Yellow',
  'gold-silver': 'Gold / Silver',
  'crystal': 'Crystal',
  'ruby-sapphire': 'Ruby / Sapphire',
  'emerald': 'Emerald',
  'firered-leafgreen': 'FireRed / Leafgreen',
  'diamond-pearl': 'Diamond / Pearl',
  'platinum': 'Platinum',
  'heartgold-soulsilver': 'Heartgold / Soulsilver',
  'black-white': 'Black / White',
  'black-2-white-2': 'Black 2 / White 2',
  'x-y': 'X / Y',
  'omega-ruby-alpha-sapphire': 'O. Ruby / A. Sapphire',
  'sun-moon': 'Sun / Moon',
  'ultra-sun-ultra-moon': 'U. Sun / U. Moon',
}

export const versionNameBreakMap: Record<string, Array<string>> = {
  'red-blue': ['red', 'blue'],
  'yellow': ['yellow'],
  'gold-silver': ['gold', 'silver'],
  'crystal': ['crystal'],
  'ruby-sapphire': ['ruby', 'sapphire'],
  'emerald': ['emerald'],
  'firered-leafgreen': ['firered', 'leafgreen'],
  'diamond-pearl': ['diamond', 'pearl'],
  'platinum': ['platinum'],
  'heartgold-soulsilver': ['heartgold', 'soulsilver'],
  'black-white': ['black', 'white'],
  'black-2-white-2': ['black-2', 'white-2'],
  'x-y': ['x', 'y'],
  'omega-ruby-alpha-sapphire': ['omega-ruby', 'alpha-sapphire'],
  'sun-moon': ['sun', 'moon'],
  'ultra-sun-ultra-moon': ['ultra-sun', 'ultra-moon'],
}

export const individualGameMap: Record<string, string> = {
  'red': 'Red',
  'blue': 'Blue',
  'yellow': 'Yellow',
  'gold': 'Gold',
  'silver': 'Silver',
  'crystal': 'Crystal',
  'ruby': 'Ruby',
  'sapphire': 'Sapphire',
  'emerald': 'Emerald',
  'firered': 'FireRed',
  'leafgreen': 'Leafgreen',
  'diamond': 'Diamond',
  'pearl': 'Pearl',
  'platinum': 'Platinum',
  'heartgold': 'Heartgold',
  'soulsilver': 'Soulsilver',
  'black': 'Black',
  'white': 'White',
  'black-2': 'Black 2',
  'white-2': 'White 2',
  'x': 'X',
  'y': 'Y',
  'omega-ruby': 'O. Ruby',
  'alpha-sapphire': 'A. Sapphire',
  'sun': 'Sun',
  'moon': 'Moon',
  'ultra-sun': 'U. Sun',
  'ultra-moon': 'U. Moon',
}

// For non-grouped games, we need to lowercase the name.
export const individualRawGameMap: Record<string, string> = {
  ...Object.fromEntries(
    Object.entries(individualGameMap).map(([key, value]) => [key, value.toLowerCase()]),
  ),
  'black-2': 'black-2',
  'white-2': 'white-2',
  'omega-ruby': 'omega-ruby',
  'alpha-sapphire': 'alpha-sapphire',
  'ultra-sun': 'ultra-sun',
  'ultra-moon': 'ultra-moon',
}

export default gameNameMap
