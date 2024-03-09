import { FC } from 'react'
import Image from 'next/image'

import BlueLink from '@/components/BlueLink'
import SectionTitle from '@/components/containers/SectionTitle'
import TableCell from '@/components/containers/TableCell'
import TableCellHeader from '@/components/containers/TableCellHeader'
import TableContainer from '@/components/containers/TableContainer'
import TableRow from '@/components/containers/TableRow'
import PokemonExtractor from '@/extractors/PokemonExtractor'
import { PokemonApi } from '@/services/PokemonApi'
import formatName from '@/utils/formatName'

interface PokemonTableProps {
  pokemonList: Array<string>
  abilityName: string
}

const getPokemonData = async (urls: Array<string>, abilityName: string) => {
  const responses = await PokemonApi.getByUrls(urls)

  // We now need to find the pokemon name, icons and other abilities.
  const simplifiedResponse = responses.map((response) => {
    const { abilities, ...rest } = PokemonExtractor(response)
    const otherAbilities = abilities
      .filter((ability) => ability.ability.name !== abilityName)
      .map((ability) => ability.ability.name)
    return {
      ...rest,
      otherAbilities,
    }
  })

  // Omit gen 8+ pokemon and their forms from the list and sort them by their natonal number.
  return simplifiedResponse
    .filter(
      (entry) => (entry.id >= 1 && entry.id <= 807) || (entry.id >= 10001 && entry.id <= 10157),
    )
    .sort((prev, curr) => (prev.nationalNumber >= curr.nationalNumber ? 1 : -1))
}

const PokemonTable: FC<PokemonTableProps> = async ({ abilityName, pokemonList }) => {
  const pokemonInformation = await getPokemonData(pokemonList, abilityName)

  const headers = ['#', 'Name', 'Other abilities']

  const headerRow = (
    <TableRow className="bg-[#1a1a1a]">
      {headers.map((header) => (
        <TableCellHeader className="min-w-24" key={header} type="column">
          <span className="font-bold text-white">{header}</span>
        </TableCellHeader>
      ))}
    </TableRow>
  )

  const pokemonRow = pokemonInformation.map((pokemon, rowIndex) => {
    const { gameSprite, name, otherAbilities, nationalNumber } = pokemon

    const properId = `${'00' + nationalNumber}`.slice(-3)

    return (
      <TableRow key={rowIndex}>
        <TableCell>
          <div className="flex items-center">
            {gameSprite && <Image src={gameSprite} alt={name} width={60} height={56} />}
            <span> {properId} </span>
          </div>
        </TableCell>
        <TableCell extraClassName="w-[1%] whitespace-nowrap">
          <BlueLink href={`/pokedex/${name}`}>{formatName(name)}</BlueLink>
        </TableCell>
        <TableCell>
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
    <>
      <SectionTitle>Pokémon with {abilityName}</SectionTitle>
      <TableContainer>
        {headerRow}
        {pokemonRow}
      </TableContainer>
    </>
  )
}

export default PokemonTable
