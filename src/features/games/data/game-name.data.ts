/**
 * Converts unformatted game names to their proper forms.
 * Short forms are used for ORAS and USUM.
 */
export const versionToProperNameShort: Record<string, string> = {
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

export const versionToProperNameLong: Record<string, string> = {
  ...versionToProperNameShort,
  'omega-ruby-alpha-sapphire': 'Omega Ruby / Alpha Sapphire',
  'sun-moon': 'Sun / Moon',
  'ultra-sun-ultra-moon': 'Ultra Sun / Ultra Moon',
}

export const versionToArraySplit: Record<string, Array<string>> = {
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

export const gameToProperName: Record<string, string> = {
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
export const gameToUnformattedName: Record<string, string> = {
  ...Object.fromEntries(
    Object.entries(gameToProperName).map(([key, value]) => [key, value.toLowerCase()]),
  ),
  'black-2': 'black-2',
  'white-2': 'white-2',
  'omega-ruby': 'omega-ruby',
  'alpha-sapphire': 'alpha-sapphire',
  'ultra-sun': 'ultra-sun',
  'ultra-moon': 'ultra-moon',
}

interface GameData {
  colour: string
  properName: string
}

export const gameToColourAndName: Record<string, GameData> = {
  'red': {
    colour: 'text-red-700',
    properName: 'Red',
  },
  'blue': {
    colour: 'text-indigo-500',
    properName: 'Blue',
  },
  'yellow': {
    colour: 'text-yellow-500',
    properName: 'Yellow',
  },
  'gold': {
    colour: 'text-yellow-800',
    properName: 'Gold',
  },
  'silver': {
    colour: 'text-gray-400',
    properName: 'Silver',
  },
  'crystal': {
    colour: 'text-slate-400',
    properName: 'Crystal',
  },
  'ruby': {
    colour: 'text-red-700',
    properName: 'Ruby',
  },
  'sapphire': {
    colour: 'text-indigo-500',
    properName: 'Sapphire',
  },
  'emerald': {
    colour: 'text-lime-500',
    properName: 'Emerald',
  },
  'firered': {
    colour: 'text-red-700',
    properName: 'FireRed',
  },
  'leafgreen': {
    colour: 'text-lime-600',
    properName: 'Leafgreen',
  },
  'diamond': {
    colour: 'text-slate-400',
    properName: 'Diamond',
  },
  'pearl': {
    colour: 'text-pink-500',
    properName: 'Pearl',
  },
  'platinum': {
    colour: 'text-gray-400',
    properName: 'Platinum',
  },
  'heartgold': {
    colour: 'text-yellow-800',
    properName: 'Heartgold',
  },
  'soulsilver': {
    colour: 'text-gray-400',
    properName: 'Soulsilver',
  },
  'black': {
    colour: 'text-stone-500',
    properName: 'Black',
  },
  'white': {
    colour: 'text-gray-400',
    properName: 'White',
  },
  'black-2': {
    colour: 'text-stone-500',
    properName: 'Black 2',
  },
  'white-2': {
    colour: 'text-gray-400',
    properName: 'White 2',
  },
  'x': {
    colour: 'text-indigo-500',
    properName: 'X',
  },
  'y': {
    colour: 'text-red-700',
    properName: 'Y',
  },
  'omega-ruby': {
    colour: 'text-red-700',
    properName: 'O. Ruby',
  },
  'alpha-sapphire': {
    colour: 'text-indigo-500',
    properName: 'A. Sapphire',
  },
  'sun': {
    colour: 'text-amber-600',
    properName: 'Sun',
  },
  'moon': {
    colour: 'text-violet-600',
    properName: 'Moon',
  },
  'ultra-sun': {
    colour: 'text-amber-600',
    properName: 'U. Sun',
  },
  'ultra-moon': {
    colour: 'text-violet-600',
    properName: 'U. Moon',
  },
}
