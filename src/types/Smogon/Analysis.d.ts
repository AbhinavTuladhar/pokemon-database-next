export interface PokemonAnalysis {
  // First key is the pokemon name
  [key: string]: InnerAnalysis
}

export interface InnerAnalysis {
  overview?: string
  comments?: string
  sets: {
    [key: string]: {
      description: string
    }
  }
}
export interface MinimalSetAnalysis {
  set: string
  description: string
}
