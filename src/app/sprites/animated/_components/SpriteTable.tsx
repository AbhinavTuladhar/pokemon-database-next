import { FC } from 'react'
import Image from 'next/image'

import { BlueLink } from '@/components/ui/Link'
import { Table } from '@/components/ui/Table'
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
    <Table>
      <thead>
        <th
          colSpan={2}
          className="border-bd-light dark:border-bd-dark dark:bg-hdr-dark table-cell border bg-neutral-200 py-2 pr-4 text-xl font-bold"
        >
          <BlueLink href={`/pokedex/${pokemonName}`}>{formatName(pokemonName)}</BlueLink>
        </th>
      </thead>
      <tbody>
        <tr className="table-row">
          {gifSources.map((image, index) => (
            <td
              className="border-bd-light dark:border-bd-dark table-cell h-40 w-40 items-center border object-center px-2 py-6 pr-4"
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
    </Table>
  )
}
