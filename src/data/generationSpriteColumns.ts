interface SpriteColumnType {
  [key: number | string]: {
    columnNames: Array<string>
    rowNames: Array<string>
    keyName: string
    extraColumns: Array<string>
  }
}

const generationSpriteColumns: SpriteColumnType = {
  7: {
    columnNames: ['Icon', 'Normal', 'Shiny'],
    rowNames: ['Sun, Moon'],
    keyName: 'generation7Sprites',
    extraColumns: ['Normal (♀)', 'Shiny (♀)'],
  },
  6: {
    columnNames: ['Normal', 'Shiny'],
    rowNames: ['Omega Ruby, Alpha Sapphire', 'X, Y'],
    keyName: 'generation6Sprites',
    extraColumns: ['Normal (♀)', 'Shiny (♀)'],
  },
  5: {
    columnNames: ['Normal', 'Shiny', 'Back', 'Back, Shiny'],
    rowNames: ['Black, White', 'Black, White, Animated'],
    keyName: 'generation5Sprites',
    extraColumns: ['Normal (♀)', 'Shiny (♀)', 'Back (♀)', 'Back, Shiny (♀)'],
  },
  4: {
    columnNames: ['Normal', 'Shiny', 'Back', 'Back, Shiny'],
    rowNames: ['HeartGold, Soulsilver', 'Platinum', 'Diamond, Pearl'],
    keyName: 'generation4Sprites',
    extraColumns: ['Normal (♀)', 'Shiny (♀)', 'Back (♀)', 'Back, Shiny (♀)'],
  },
  3: {
    columnNames: ['Normal', 'Shiny', 'Back', 'Back, Shiny'],
    rowNames: ['Emerald', 'Ruby, Sapphire', 'FireRed, LeafGreen'],
    keyName: 'generation3Sprites',
    extraColumns: [''],
  },
  2: {
    columnNames: ['Normal', 'Shiny', 'Back', 'Back, Shiny'],
    rowNames: ['Crystal', 'Gold', 'Silver'],
    keyName: 'generation2Sprites',
    extraColumns: [''],
  },
  1: {
    columnNames: ['Normal (colour)', 'Normal', 'Back (colour)', 'Back'],
    rowNames: ['Yellow', 'Red, Blue'],
    keyName: 'generation1Sprites',
    extraColumns: [''],
  },
}

export default generationSpriteColumns
