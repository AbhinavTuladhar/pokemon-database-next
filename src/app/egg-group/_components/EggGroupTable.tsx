'use client'

import React, { FC, useMemo } from 'react'

import BlueLink from '@/components/link'
import TanStackTable from '@/components/tanstack-table'
import { TransformedEggGroup } from '@/types'
import formatName from '@/utils/formatName'
import { createColumnHelper } from '@tanstack/react-table'

export const EggGroupTable: FC<{ eggGroupData: Array<TransformedEggGroup> }> = ({
  eggGroupData,
}) => {
  const helper = createColumnHelper<TransformedEggGroup>()

  const columns = useMemo(
    () => [
      helper.accessor('name', {
        header: () => <span> Name </span>,
        cell: info => {
          const groupName = info.getValue()
          return (
            <BlueLink href={`/egg-group/${groupName}`} boldFlag>
              {formatName(groupName)}
            </BlueLink>
          )
        },
        meta: {
          headerStyle: 'border-r border-r-bd-light pr-4 dark:border-r-bd-dark',
          cellStyle: 'pl-4',
        },
        sortingFn: 'alphanumeric',
      }),
      helper.accessor('pokemonSpecies', {
        cell: info => info.getValue().length,
        header: () => <span> Pokémon </span>,
        meta: {
          headerStyle: 'border-r border-r-bd-light pr-4 dark:border-r-bd-dark',
          cellStyle: 'text-right pr-4',
        },
        sortingFn: 'auto',
      }),
    ],
    [helper],
  )

  return <TanStackTable firstColumn="name" columns={columns} data={eggGroupData} />
}
