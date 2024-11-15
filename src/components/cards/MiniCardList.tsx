import { FC } from 'react'

import { PokemonExtractor } from '@/extractors'
import { PokemonApi } from '@/services'

import { MiniPokeCard } from './MiniPokeCard'

interface MiniCardListProps {
  pokemonNames: Array<string>
}

const fetchPokemonData = async (pokemonNames: Array<string>) => {
  const responses = await PokemonApi.getByNames(pokemonNames)
  const extractedInfo = responses.map(PokemonExtractor)

  // Sort the pokemon by their national number
  const sortedResponses = extractedInfo.sort((first, second) =>
    first.nationalNumber >= second.nationalNumber ? 1 : -1,
  )
  return sortedResponses
}

export const MiniCardList: FC<MiniCardListProps> = async ({ pokemonNames }) => {
  const pokemonData = await fetchPokemonData(pokemonNames)

  // We now map the Pokemon data into the respective cards.
  const pokeCards = pokemonData?.map(pokemon => {
    const { id, name, nationalNumber, types, gameSprite } = pokemon
    return (
      <MiniPokeCard
        gameSprite={gameSprite}
        id={id}
        name={name}
        nationalNumber={nationalNumber}
        types={types}
        key={id}
      />
    )
  })

  return <div className="grid grid-cols-card-list gap-x-3 gap-y-8">{pokeCards}</div>
}
