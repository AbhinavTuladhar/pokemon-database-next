import React, { FC } from 'react'
import Image from 'next/image'

import BlueLink from '@/components/BlueLink'
import TableCell from '@/components/containers/TableCell'
import TableCellHeader from '@/components/containers/TableCellHeader'
import TableContainer from '@/components/containers/TableContainer'
import TableRow from '@/components/containers/TableRow'
import TypeCard from '@/components/TypeCard'
import PokemonExtractor from '@/extractors/PokemonExtractor'
import SpeciesExtractor from '@/extractors/SpeciesExtractor'
import { PokemonApi } from '@/services/PokemonApi'
import { SpeciesApi } from '@/services/SpeciesApi'
import { PokemonType } from '@/types'
import formatName from '@/utils/formatName'

interface TableProps {
  speciesUrls: Array<string>
  eggGroup: string
}

const getSpeciesData = async (urls: string[], eggGroupName: string) => {
  const responses = await SpeciesApi.getByUrls(urls)
  return responses.map((species) => {
    const { id, egg_groups } = SpeciesExtractor(species)
    const otherEggGroup = egg_groups
      .map((group) => group.name)
      .filter((group) => group !== eggGroupName)[0]
    return { id, otherEggGroup }
  })
}

const getPokemonData = async (urls: string[]) => {
  const responses = await PokemonApi.getByUrls(urls)
  return responses.map((pokemon) => {
    const { id, nationalNumber, gameSprite, name, types } = PokemonExtractor(pokemon)
    return { id, nationalNumber, gameSprite, name, types }
  })
}

const PokemonTable: FC<TableProps> = async ({ speciesUrls, eggGroup }) => {
  const pokemonUrls = speciesUrls.map((url) => url.replace('pokemon-species', 'pokemon'))

  const [speciesData, pokemonData] = await Promise.all([
    getSpeciesData(speciesUrls, eggGroup),
    getPokemonData(pokemonUrls),
  ])

  // Joining the data
  const finalTableData = pokemonData
    .map((obj1) => {
      const obj2 = speciesData.find((obj2) => obj2.id === obj1.id)
      return { ...obj1, ...obj2 }
    })
    .filter(
      (entry) => (entry.id >= 1 && entry.id <= 807) || (entry.id >= 10001 && entry.id <= 10157),
    )

  const headerNames = ['#', 'Name', 'Types', 'Other group']
  const tableHeaders = (
    <TableRow className="bg-[#1a1a1a]">
      {headerNames.map((name) => (
        <TableCellHeader className="min-w-24" type="column" key={name}>
          {name}
        </TableCellHeader>
      ))}
    </TableRow>
  )

  const pokmemonRows = finalTableData.map((pokemon) => {
    const { id, nationalNumber, gameSprite, name, types, otherEggGroup } = pokemon
    const properId = `${'00' + nationalNumber}`.slice(-3)

    const typeDiv = (
      <div className="flex flex-col gap-y-1">
        {types.map((type) => (
          <TypeCard typeName={type.type.name} key={type.type.name} />
        ))}
      </div>
    )

    return (
      <TableRow key={id}>
        <TableCell extraClassName="w-[1%] whitespace-nowrap !pr-4">
          <div className="flex items-center">
            {gameSprite && <Image src={gameSprite} alt="test" width={60} height={56} />}
            <span>{properId}</span>
          </div>
        </TableCell>
        <TableCell variant="column">
          <BlueLink href={`/pokedex/${name}`} boldFlag>
            {formatName(name)}
          </BlueLink>
        </TableCell>
        <TableCell variant="column">{typeDiv}</TableCell>
        <TableCell variant="column">
          <BlueLink href={`/egg-group/${otherEggGroup}`} boldFlag>
            {formatName(otherEggGroup ?? '')}
          </BlueLink>
        </TableCell>
      </TableRow>
    )
  })

  return (
    <TableContainer>
      <thead>{tableHeaders}</thead>
      <tbody>{pokmemonRows}</tbody>
    </TableContainer>
  )
}

export default PokemonTable
