export interface PokemonAnalysis {
  // First key is the pokemon name
  [key: string]: {
    overview?: string
    comments?: string
    sets: {
      [key: string]: {
        description: string
      }
    }
  }
}
