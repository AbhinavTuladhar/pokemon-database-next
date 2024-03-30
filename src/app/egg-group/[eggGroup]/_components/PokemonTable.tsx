import React, { FC } from 'react'
import Image from 'next/image'

import BlueLink from '@/components/BlueLink'
import SectionTitle from '@/components/containers/SectionTitle'
import TableCell from '@/components/containers/TableCell'
import TableCellHeader from '@/components/containers/TableCellHeader'
import TableContainer from '@/components/containers/TableContainer'
import TableRow from '@/components/containers/TableRow'
import TypeCard from '@/components/TypeCard'
import { PokemonType } from '@/types'
import formatName from '@/utils/formatName'

interface FinalTableData {
  id: number
  otherEggGroup?: string | undefined
  nationalNumber: number
  gameSprite: string | null
  name: string
  types: PokemonType[]
}

interface TableProps {
  finalTableData: FinalTableData[]
}

const PokemonTable: FC<TableProps> = ({ finalTableData }) => {
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
    <div className="-mt-5">
      <SectionTitle> The Pokémon</SectionTitle>
      <TableContainer>
        <thead>{tableHeaders}</thead>
        <tbody>{pokmemonRows}</tbody>
      </TableContainer>
    </div>
  )
}

export default PokemonTable
