import { FC } from 'react'
import SectionTitle from './containers/SectionTitle'
import MiniPokeCard from './MiniPokeCard'
import fetchMultipleData from '@/services/fetchMultipleData'
import PokemonExtractor from '@/extractors/PokemonExtractor'
import { NamedApiResource, Pokemon } from '@/types'
import { PokemonApi } from '@/services/PokemonApi'

interface MiniCardListProps {
  title: string
  pokemonList: Array<NamedApiResource<Pokemon>>
}

const fetchPokemonData = async (pokemonList: Array<NamedApiResource<Pokemon>>) => {
  const pokemonUrls = pokemonList.map((pokemon) => pokemon.url)
  const responses = await PokemonApi.getByUrls(pokemonUrls)
  // const responses = await fetchMultipleData<Pokemon>(pokemonUrls)
  const extractedInfo = responses.map(PokemonExtractor)

  // Sort the pokemon by their national number
  const sortedResponses = extractedInfo.sort((first, second) =>
    first.nationalNumber >= second.nationalNumber ? 1 : -1,
  )
  return sortedResponses
}

const MiniCardList: FC<MiniCardListProps> = async ({ title, pokemonList }) => {
  const pokemonData = await fetchPokemonData(pokemonList)

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
