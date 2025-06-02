'use client'

import React, { FC, useMemo } from 'react'
import Image from 'next/image'

import TanStackTable from '@/components/tanstack-table'
import { TransitionLink } from '@/components/ui/Link'
import { TypeCard } from '@/features/pokemon/components/TypeCard'
import { statToProperName } from '@/features/pokemon/data/stat.data'
import { formatName } from '@/utils/string.utils'
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
      const properName = statToProperName[statName]

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
          const paddedId = id.toString().padStart(3, '0')
          return (
            <div className="flex items-center justify-end gap-x-1">
              {gameSprite ? (
                <Image src={gameSprite} alt={id.toString()} height={60} width={60} />
              ) : null}
              <span> {paddedId} </span>
            </div>
          )
        },
        meta: {
          headerStyle: 'min-w-28',
          cellStyle: 'min-w-28',
        },
      }),
      helper.accessor('name', {
        header: () => <span> Name </span>,
        cell: info => (
          <TransitionLink boldFlag href={`/pokedex/${info.getValue()}`}>
            {formatName(info.getValue())}
          </TransitionLink>
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
