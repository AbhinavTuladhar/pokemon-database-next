export const pokedexToGameMap: Record<string, string> = {
  'kanto': 'Yellow/Red/Blue',
  'original-johto': 'Gold/Silver/Crystal',
  'hoenn': 'Ruby/Sapphire/Emerald',
  'original-sinnoh': 'Diamond/Pearl',
  'extended-sinnoh': 'Platinum',
  'updated-johto': 'HeartGold/SoulSilver',
  'original-unova': 'Black/White',
  'extended-unova': 'Black 2/White 2',
  'updated-unova': 'Black 2/White 2',
  'kalos-central': 'X/Y - Central Kalos',
  'kalos-coastal': 'X/Y - Coastal Kalos',
  'kalos-mountain': 'X/Y - Mountain Kalos',
  'updated-hoenn': 'Omega Ruby/Alpha Sapphire',
  'original-alola': 'Sun/Moon - Alola dex',
  'updated-alola': 'U.Sun/U.Moon - Alola dex',
}
export const generationData = [
  {
    path: '/pokedex/generation/1',
    offset: 0,
    limit: 151,
  },
  {
    path: '/pokedex/generation/2',
    offset: 151,
    limit: 100,
  },
  {
    path: '/pokedex/generation/3',
    offset: 251,
    limit: 135,
  },
  {
    path: '/pokedex/generation/4',
    offset: 386,
    limit: 107,
  },
  {
    path: '/pokedex/generation/5',
    offset: 493,
    limit: 156,
  },
  {
    path: '/pokedex/generation/6',
    offset: 649,
    limit: 72,
  },
  {
    path: '/pokedex/generation/7',
    offset: 721,
    limit: 86,
  },
]
