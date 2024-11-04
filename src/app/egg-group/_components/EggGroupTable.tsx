'use client'

import React, { FC, useMemo } from 'react'

import TanStackTable from '@/components/tanstack-table'
import { TransformedEggGroup } from '@/types'
import { createColumnHelper } from '@tanstack/react-table'

export const EggGroupTable: FC<{ eggGroupData: Array<TransformedEggGroup> }> = ({
  eggGroupData,
}) => {
  const helper = createColumnHelper<TransformedEggGroup>()

  const columns = useMemo(
    () => [
      helper.accessor('name', {
        cell: info => info.getValue(),
        header: () => 'Name',
      }),
      helper.accessor('pokemonSpecies', {
        cell: info => info.getValue().length,
        header: () => 'Pokemon',
      }),
    ],
    [helper],
  )

  return <TanStackTable columns={columns} data={eggGroupData} />
}
