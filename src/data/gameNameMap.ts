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

// const gameNameMap: Record<string, string[]> = {
//   'red-blue': ['Red', 'Blue'],
//   yellow: ['Yellow'],
//   'gold-silver': ['Gold', 'Silver'],
//   crystal: ['Crystal'],
//   'ruby-sapphire': ['Ruby', 'Sapphire'],
//   emerald: ['Emerald'],
//   'firered-leafgreen': ['FireRed', 'Leafgreen'],
//   'diamond-pearl': ['Diamond', 'Pearl'],
//   platinum: ['Platinum'],
//   'heartgold-soulsilver': ['Heartgold', 'Soulsilver'],
//   'black-white': ['Black', 'White'],
//   'black-2-white-2': ['Black 2', 'White 2'],
//   'x-y': ['X', 'Y'],
//   'omega-ruby-alpha-sapphire': ['O. Ruby', 'A. Sapphire'],
//   'sun-moon': ['Sun', 'Moon'],
//   'ultra-sun-ultra-moon': ['U. Sun', 'U. Moon'],
// }

export default gameNameMap
