import { FC } from 'react'
import Image from 'next/image'

import BlueLink from '@/components/BlueLink'
import { TableContainer } from '@/components/containers'
import formatName from '@/utils/formatName'

interface TableProps {
  id: number
  pokemonName: string
}

export const SpriteTable: FC<TableProps> = ({ id, pokemonName }) => {
  const gifSources = [
    `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/${id}.gif`,
    `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/shiny/${id}.gif`,
  ]

  return (
    <TableContainer>
      <thead>
        <th
          colSpan={2}
          className="table-cell border border-table-border bg-table-header py-2 pr-4 text-xl font-bold"
        >
          <BlueLink href={`/pokedex/${pokemonName}`}>{formatName(pokemonName)}</BlueLink>
        </th>
      </thead>
      <tbody>
        <tr className="table-row ">
          {gifSources.map((image, index) => (
            <td
              className="table-cell h-40 w-40 items-center border border-table-border object-center px-2 py-6 pr-4"
              key={index}
            >
              <Image
                src={image}
                width={120}
                height={120}
                alt={pokemonName}
                className="mx-auto aspect-square object-contain"
                unoptimized
              />
            </td>
          ))}
        </tr>
      </tbody>
    </TableContainer>
  )
}
