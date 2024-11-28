'use client'

import React, { FC, useMemo } from 'react'
import Image from 'next/image'

import { TypeCard } from '@/components/cards'
import TanStackTable from '@/components/tanstack-table'
import statMapping from '@/data/statMapping'
import { TransformedPokemon } from '@/types'
import formatName from '@/utils/formatName'
import { createColumnHelper } from '@tanstack/react-table'

interface TableProps {
  pokemonData: Array<TransformedPokemon>
}

interface TableData extends Pick<TransformedPokemon, 'id' | 'name' | 'gameSprite'> {
  types: Array<string>
  stats: [
    {
      name: 'HP'
      value: number
    },
    {
      name: 'Attack'
      value: number
    },
    {
      name: 'Defence'
      value: number
    },
    {
      name: 'Sp. Atk'
      value: number
    },
    {
      name: 'Sp. Def'
      value: number
    },
    {
      name: 'Speed'
      value: number
    },
  ]
}

export const PokemonTable: FC<TableProps> = ({ pokemonData }) => {
  const tablePokemonData = pokemonData.map(pokemon => {
    const { id, name, gameSprite, stats, types } = pokemon

    const statValues = stats.map(stat => {
      const {
        base_stat: statValue,
        stat: { name: statName },
      } = stat
      const properName = statMapping[statName]

      return {
        name: properName,
        value: statValue,
      }
    })

    return {
      id,
      name,
      gameSprite,
      stats: statValues,
      types: types.map(type => type.type.name),
    }
  }) as Array<TableData>

  const helper = createColumnHelper<TableData>()

  const columns = useMemo(
    () => [
      helper.accessor('id', {
        header: () => <span> # </span>,
        cell: info => {
          const { id, gameSprite } = info.row.original
          return (
            <div className="flex items-center gap-x-2">
              {gameSprite ? (
                <Image src={gameSprite} alt={id.toString()} height={32} width={32} />
              ) : null}
              <span> {id} </span>
            </div>
          )
        },
      }),
      helper.accessor('name', {
        header: () => <span> Name </span>,
        cell: info => formatName(info.getValue()),
      }),
      helper.accessor('types', {
        header: () => <span> Types </span>,
        cell: info => (
          <div className="flex flex-col gap-y-0.5">
            {info.getValue().map(type => (
              <TypeCard key={type} typeName={type} />
            ))}
          </div>
        ),
      }),
      helper.accessor('stats', {
        header: () => <span> Total </span>,
        cell: info => {
          const { stats } = info.row.original
          const totalStats = stats.reduce((acc, stat) => acc + stat.value, 0)
          return <span className="font-bold"> {totalStats} </span>
        },
      }),
      helper.accessor('stats.0.value', {
        header: () => <span> HP </span>,
        cell: info => info.getValue(),
      }),
      helper.accessor('stats.1.value', {
        header: () => <span> Attack </span>,
        cell: info => info.getValue(),
      }),
      helper.accessor('stats.2.value', {
        header: () => <span> Defence </span>,
        cell: info => info.getValue(),
      }),
      helper.accessor('stats.3.value', {
        header: () => <span> Sp. Atk </span>,
        cell: info => info.getValue(),
      }),
      helper.accessor('stats.4.value', {
        header: () => <span> Sp. Def </span>,
        cell: info => info.getValue(),
      }),
      helper.accessor('stats.5.value', {
        header: () => <span> Speed </span>,
        cell: info => info.getValue(),
      }),
    ],
    [helper],
  )

  return <TanStackTable data={tablePokemonData} columns={columns} firstColumn="id" />
}
