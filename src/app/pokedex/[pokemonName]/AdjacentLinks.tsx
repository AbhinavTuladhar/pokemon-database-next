import { FC } from 'react'
import BlueLink from '@/components/BlueLink'
import formatName from '@/utils/formatName'
import { PokemonApi } from '@/services/PokemonApi'

const getAdjacentPokemonNames = async (offset: number) => {
  const adjcentPokemonResponse = await PokemonApi.getByGeneration(offset, 3)
  return adjcentPokemonResponse
}

interface LinksParams {
  id: number
}

const AdjacentLinks: FC<LinksParams> = async ({ id }) => {
  const offsetValue = id !== 1 ? id - 2 : 0
  const adjacentData = await getAdjacentPokemonNames(offsetValue)

  const { results } = adjacentData
  // Get the pokemon to the left and to the right of the current Pokemon
  const [previousPokemon, ...rest] = results

  // Select ONLY the next etnry for #001.
  const nextPokemon = id !== 1 ? results[results.length - 1] : rest[0]

  // Check for the pokemon which have the first and last id values
  const linkedPokemon = id === 1 ? [nextPokemon] : [previousPokemon, nextPokemon]

  const transformedPokemonData = linkedPokemon
    .map((pokemon, index) => {
      const { name } = pokemon
      const indexOffset = index === 0 ? index - 1 : index
      const idNumber = id === 1 ? 2 : id + indexOffset
      // Append zeroes on the left
      const formattedId = '#' + `00${idNumber}`.slice(-3)
      return {
        id: idNumber,
        formattedId,
        name,
      }
    })
    .filter((pokemon) => pokemon.id <= 807) // For the last Pokemon, #807.

  // Put the link at the end for #001, separate evenly for the rest.
  const alignment = id !== 1 ? 'justify-between' : 'justify-end'

  return (
    <div className={`flex ${alignment}`}>
      {transformedPokemonData.map((pokemon, index) => {
        const { name, formattedId } = pokemon
        const leftPart = index === 0 && id !== 1 ? '←' : ''
        const rightPart = index !== 0 || id === 1 ? '→' : ''
        return (
          <BlueLink href={`/pokemon/${name}`} key={index}>
            {`${leftPart} ${formattedId} ${formatName(name)} ${rightPart}`}
          </BlueLink>
        )
      })}
    </div>
  )
}

export default AdjacentLinks
