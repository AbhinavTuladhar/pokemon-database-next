'use client'

import React, { FC, useMemo } from 'react'
import Image from 'next/image'

import { TypeCard } from '@/components/cards'
import BlueLink from '@/components/link'
import TanStackTable from '@/components/tanstack-table'
import statMapping from '@/data/statMapping'
import formatName from '@/utils/formatName'
import { createColumnHelper } from '@tanstack/react-table'

import { TableData, TableProps } from '../_types'

interface PokemonTableProps {
  tableData: Array<TableProps>
}

export const PokemonTable: FC<PokemonTableProps> = ({ tableData }) => {
  const tablePokemonData = tableData.map(pokemon => {
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

    const totalStats = statValues.reduce((acc, stat) => acc + stat.value, 0)

    return {
      id,
      name,
      gameSprite,
      stats: statValues,
      types: types.map(type => type.type.name),
      totalStats,
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
        cell: info => (
          <BlueLink boldFlag href={`/pokemon/${info.getValue()}`}>
            {formatName(info.getValue())}
          </BlueLink>
        ),
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
      helper.accessor('totalStats', {
        header: () => <span> Total </span>,
        cell: info => info.getValue(),
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
