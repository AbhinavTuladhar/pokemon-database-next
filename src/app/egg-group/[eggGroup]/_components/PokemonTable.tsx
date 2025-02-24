import React, { FC } from 'react'
import Image from 'next/image'

import { TypeCard } from '@/components/cards'
import { TableCell, TableCellHeader, TableContainer, TableRow } from '@/components/containers'
import BlueLink from '@/components/link'
import { PokemonExtractor, SpeciesExtractor } from '@/extractors'
import { PokemonApi, SpeciesApi } from '@/services'
import formatName from '@/utils/formatName'
import { isGen1to7 } from '@/utils/pokemonUtils'

interface TableProps {
  eggGroup: string
  speciesIds: Array<number>
}

const getSpeciesDataNew = async (ids: Array<number>, eggGroupName: string) => {
  const responses = await SpeciesApi.getByIds(ids)
  return responses.map(species => {
    const { id, egg_groups } = SpeciesExtractor(species)
    const otherEggGroup = egg_groups
      .map(group => group.name)
      .filter(group => group !== eggGroupName)[0]
    return { id, otherEggGroup }
  })
}

const getPokemonDataNew = async (ids: Array<number>) => {
  const responses = await PokemonApi.getByIds(ids)
  return responses.map(pokemon => {
    const { id, nationalNumber, gameSprite, name, types } = PokemonExtractor(pokemon)
    return { id, nationalNumber, gameSprite, name, types }
  })
}

export const PokemonTable: FC<TableProps> = async ({ eggGroup, speciesIds }) => {
  const [speciesData, pokemonData] = await Promise.all([
    getSpeciesDataNew(speciesIds, eggGroup),
    getPokemonDataNew(speciesIds),
  ])

  // Joining the data
  const finalTableData = pokemonData
    .map(obj1 => {
      const obj2 = speciesData.find(obj2 => obj2.id === obj1.id)
      return { ...obj1, ...obj2 }
    })
    .filter(entry => isGen1to7(entry.id))

  const headerNames = ['#', 'Name', 'Types', 'Other group']
  const tableHeaders = (
    <TableRow className="dark:bg-hdr-dark bg-neutral-200 font-bold">
      {headerNames.map(name => (
        <TableCellHeader
          className="border-r-bd-light dark:border-r-bd-dark min-w-24 border-r pr-4 last:border-r-0"
          type="column"
          key={name}
        >
          {name}
        </TableCellHeader>
      ))}
    </TableRow>
  )

  const pokemonRows = finalTableData.map(pokemon => {
    const { id, nationalNumber, gameSprite, name, types, otherEggGroup } = pokemon
    const properId = `${'00' + nationalNumber}`.slice(-3)

    const typeDiv = (
      <div className="flex flex-col gap-y-1">
        {types.map(type => (
          <TypeCard typeName={type.type.name} key={type.type.name} />
        ))}
      </div>
    )

    return (
      <TableRow key={id}>
        <TableCell extraClassName="w-[1%] whitespace-nowrap pr-4!">
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
      <tbody>{pokemonRows}</tbody>
    </TableContainer>
  )
}
