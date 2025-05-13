import { FC } from 'react'
import Image from 'next/image'

import { TableCell, TableCellHeader, TableContainer, TableRow } from '@/components/containers'
import { BlueLink } from '@/components/ui/Link'
import transformPokemon from '@/features/pokemon/transformers/transformPokemon'
import { PokemonApi } from '@/services'
import formatName from '@/utils/formatName'
import { isGen1to7 } from '@/utils/pokemonUtils'

interface PokemonTableProps {
  pokemonList: Array<string>
  abilityName: string
}

const getPokemonData = async (names: Array<string>, abilityName: string) => {
  const responses = await PokemonApi.getByNames(names)

  // We now need to find the pokemon name, icons and other abilities.
  const simplifiedResponse = responses.map(response => {
    const { abilities, ...rest } = transformPokemon(response)
    const otherAbilities = abilities
      .filter(ability => ability.ability.name !== abilityName)
      .map(ability => ability.ability.name)
    return {
      ...rest,
      otherAbilities,
    }
  })

  // Omit gen 8+ pokemon and their forms from the list and sort them by their natonal number.
  return simplifiedResponse
    .filter(entry => isGen1to7(entry.id))
    .sort((prev, curr) => (prev.nationalNumber >= curr.nationalNumber ? 1 : -1))
}

export const PokemonTable: FC<PokemonTableProps> = async ({ abilityName, pokemonList }) => {
  const pokemonInformation = await getPokemonData(pokemonList, abilityName)

  const headers = ['#', 'Name', 'Other abilities']

  const headerRow = (
    <TableRow className="dark:bg-hdr-dark bg-neutral-200 font-bold">
      {headers.map(header => (
        <TableCellHeader
          className="dark:border-r-bd-dark border-r border-r-gray-300 pr-4 last:border-r-0"
          key={header}
          type="column"
        >
          {header}
        </TableCellHeader>
      ))}
    </TableRow>
  )

  const pokemonRow = pokemonInformation.map((pokemon, rowIndex) => {
    const { gameSprite, name, otherAbilities, nationalNumber } = pokemon

    const properId = `${'00' + nationalNumber}`.slice(-3)

    return (
      <TableRow key={rowIndex}>
        <TableCell extraClassName="min-w-32 pr-4!" variant="column">
          <div className="flex items-center">
            {gameSprite && <Image src={gameSprite} alt={name} width={60} height={56} />}
            <span> {properId} </span>
          </div>
        </TableCell>
        <TableCell extraClassName="min-w-40 " variant="column">
          <BlueLink href={`/pokedex/${name}`}>{formatName(name)}</BlueLink>
        </TableCell>
        <TableCell extraClassName="min-w-32 " variant="column">
          {otherAbilities.length > 0 ? (
            <ul>
              {otherAbilities.map((ability, index) => (
                <li key={index}>
                  <BlueLink href={`/ability/${ability}`} boldFlag={true}>
                    {formatName(ability)}
                  </BlueLink>
                </li>
              ))}
            </ul>
          ) : (
            <span className="text-4xl font-bold"> - </span>
          )}
        </TableCell>
      </TableRow>
    )
  })

  return (
    <TableContainer className="w-auto lg:w-full">
      <thead className="hdr-dark-group">{headerRow}</thead>
      <tbody>{pokemonRow}</tbody>
    </TableContainer>
  )
}
