interface SpriteColumnType {
  [key: number | string]: {
    columnNames: Array<string>
    rowNames: Array<string>
    keyName: string
  }
}

const generationSpriteColumns: SpriteColumnType = {
  7: {
    columnNames: ['Icon', 'Normal', 'Shiny'],
    rowNames: ['Sun, Moon'],
    keyName: 'generation7Sprites',
  },
  6: {
    columnNames: ['Normal', 'Shiny'],
    rowNames: ['Omega Ruby, Alpha Sapphire', 'X, Y'],
    keyName: 'generation6Sprites',
  },
  5: {
    columnNames: ['Normal', 'Shiny', 'Back', 'Back, Shiny'],
    rowNames: ['Black, White', 'Black, White, Animated'],
    keyName: 'generation5Sprites',
  },
  4: {
    columnNames: ['Normal', 'Shiny', 'Back', 'Back, Shiny'],
    rowNames: ['HeartGold, Soulsilver', 'Platinum', 'Diamond, Pearl'],
    keyName: 'generation4Sprites',
  },
  3: {
    columnNames: ['Normal', 'Shiny', 'Back', 'Back, Shiny'],
    rowNames: ['Emerald', 'Ruby, Sapphire', 'FireRed, LeafGreen'],
    keyName: 'generation3Sprites',
  },
  2: {
    columnNames: ['Normal', 'Shiny', 'Back', 'Back, Shiny'],
    rowNames: ['Crystal', 'Gold', 'Silver'],
    keyName: 'generation2Sprites',
  },
  1: {
    columnNames: ['Normal (colour)', 'Normal', 'Back (colour)', 'Back'],
    rowNames: ['Yellow', 'Red, Blue'],
    keyName: 'generation1Sprites',
  },
}

export default generationSpriteColumns
