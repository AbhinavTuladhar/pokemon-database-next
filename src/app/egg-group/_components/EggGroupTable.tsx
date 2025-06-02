'use client'

import React, { FC, useMemo } from 'react'

import TanStackTable from '@/components/tanstack-table'
import { TransitionLink } from '@/components/ui/Link'
import { TransformedEggGroup } from '@/types'
import { formatName } from '@/utils/string.utils'
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
            <TransitionLink href={`/egg-group/${groupName}`} boldFlag>
              {formatName(groupName)}
            </TransitionLink>
          )
        },
        sortingFn: 'alphanumeric',
      }),
      helper.accessor('pokemonSpecies', {
        cell: info => info.getValue().length,
        header: () => <span> Pokémon </span>,
        meta: {
          cellStyle: 'text-right',
        },
        sortingFn: 'auto',
      }),
    ],
    [helper],
  )

  return <TanStackTable firstColumn="name" columns={columns} data={eggGroupData} />
}
