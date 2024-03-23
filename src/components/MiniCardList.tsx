import { FC } from 'react'

import PokemonExtractor from '@/extractors/PokemonExtractor'
import { PokemonApi } from '@/services/PokemonApi'

import SectionTitle from './containers/SectionTitle'
import MiniPokeCard from './MiniPokeCard'

interface MiniCardListProps {
  title: string
  pokemonUrls: Array<string>
}

const fetchPokemonData = async (pokemonUrls: Array<string>) => {
  const responses = await PokemonApi.getByUrls(pokemonUrls)
  const extractedInfo = responses.map(PokemonExtractor)

  // Sort the pokemon by their national number
  const sortedResponses = extractedInfo.sort((first, second) =>
    first.nationalNumber >= second.nationalNumber ? 1 : -1,
  )
  return sortedResponses
}

const MiniCardList: FC<MiniCardListProps> = async ({ title, pokemonUrls }) => {
  const pokemonData = await fetchPokemonData(pokemonUrls)

  // We now map the Pokemon data into the respective cards.
  const pokeCards = pokemonData?.map((pokemon, index) => {
    const { id, name, nationalNumber, types, gameSprite } = pokemon
    return (
      <MiniPokeCard
        gameSprite={gameSprite}
        id={id}
        name={name}
        nationalNumber={nationalNumber}
        types={types}
        key={index}
      />
    )
  })

  return (
    <>
      <SectionTitle>{title}</SectionTitle>
      <div className="grid grid-cols-card-list gap-x-3 gap-y-8">{pokeCards}</div>
    </>
  )
}

export default MiniCardList
