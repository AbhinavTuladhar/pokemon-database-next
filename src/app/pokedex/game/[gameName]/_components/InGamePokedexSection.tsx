import { FC } from 'react'

import { PokeCardContainer } from '@/components/containers'
import { SectionTitle } from '@/components/ui/Title'
import { PokeCard } from '@/features/pokemon/components/PokeCard'
import PokemonService from '@/features/pokemon/services/pokemon.service'
import { transformPokemon } from '@/features/pokemon/transformers/transform-pokemon'
import { formatName } from '@/utils/string.utils'

const getPokemonDataByIds = async (ids: Array<number>) => {
  const response = await PokemonService.getByIds(ids)
  return response.map(transformPokemon)
}

interface PokedexSectionProps {
  dexName: string
  pokemonList: Array<{ entryNumber: number; pokemonId: string }>
}

const InGamePokedexSection: FC<PokedexSectionProps> = async ({ dexName, pokemonList }) => {
  const pokemonData = await getPokemonDataByIds(
    pokemonList.map(({ pokemonId }) => parseInt(pokemonId)),
  )

  const cardData = pokemonData.map(({ id, name, types, front_default }) => ({
    id,
    name,
    types,
    front_default,
  }))

  // Perform a join operation on pokemonData and cardData on the basis of the pokemon id
  const combinedData = pokemonList.map(pokemon => {
    const foundCardData = cardData.find(card => card.id === parseInt(pokemon.pokemonId))!
    return { ...pokemon, ...foundCardData }
  })

  return (
    <section>
      <SectionTitle> {formatName(dexName)} </SectionTitle>
      <PokeCardContainer>
        {combinedData.map(({ id, name, types, front_default, entryNumber }) => (
          <PokeCard
            id={entryNumber}
            defaultSprite={front_default ?? ''}
            key={id}
            name={name}
            types={types}
          />
        ))}
      </PokeCardContainer>
    </section>
  )
}

export default InGamePokedexSection
