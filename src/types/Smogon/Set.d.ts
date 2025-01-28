type ResourceType = string | Array<string>

interface InnerPokemonSet {
  moves: (string | string[])[]
  ability?: ResourceType
  item?: ResourceType
  nature?: ResourceType
  evs?: {
    [key: string]: number
  }
}

export interface PokemonSet {
  /**
   * First key is the name of the Pokemon
   */
  [key: string]: {
    /**
     * Second key is the name of the set
     */
    [key: string]: InnerPokemonSet
  }
}

export interface FlatPokemonSet extends InnerPokemonSet {
  set: string
}
