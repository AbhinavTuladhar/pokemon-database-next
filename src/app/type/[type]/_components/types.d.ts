export interface TypeSprite {
  generationNumber: number
  spritesList: Array<GameTypeSprite>
}

export interface GameTypeSprite {
  versionGroupName: string
  sprite: string | null
}
