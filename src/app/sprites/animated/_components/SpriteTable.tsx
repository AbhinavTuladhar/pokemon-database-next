import { FC } from 'react'
import Image from 'next/image'

import { TableContainer } from '@/components/containers'
import BlueLink from '@/components/link'
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
          className="table-cell border border-gray-200 bg-neutral-200 py-2 pr-4 text-xl font-bold dark:border-table-border dark:bg-table-header"
        >
          <BlueLink href={`/pokedex/${pokemonName}`}>{formatName(pokemonName)}</BlueLink>
        </th>
      </thead>
      <tbody>
        <tr className="table-row ">
          {gifSources.map((image, index) => (
            <td
              className="table-cell h-40 w-40 items-center border border-gray-200 object-center px-2 py-6 pr-4 dark:border-table-border"
              key={image + index}
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
