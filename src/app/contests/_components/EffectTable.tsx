'use client'

import React, { FC, useMemo } from 'react'

import ContestHearts from '@/components/contest-hearts'
import TanStackTable from '@/components/tanstack-table'
import { ContestEffect } from '@/types'
import { createColumnHelper } from '@tanstack/react-table'

interface ContestData {
  appeal: number
  jam: number
  description: string
}

interface EffectTableProps {
  contestData: Array<ContestEffect>
}

export const EffectTable: FC<EffectTableProps> = ({ contestData }) => {
  const tableContestData = contestData.map(({ appeal, jam, effect_entries }) => ({
    appeal,
    jam,
    description: effect_entries[0].effect,
  }))

  const helper = createColumnHelper<ContestData>()

  const headerStyle = 'border-r border-r-bd-light last:border-r-0 dark:border-r-bd-dark'

  const columns = useMemo(
    () => [
      helper.accessor('appeal', {
        header: () => <span> Appeal </span>,
        cell: info => <ContestHearts type="appeal" value={info.getValue()} />,
        meta: {
          headerStyle,
        },
      }),
      helper.accessor('jam', {
        header: () => <span> Jam </span>,
        cell: info => <ContestHearts type="jam" value={info.getValue()} />,
        meta: {
          headerStyle,
        },
      }),
      helper.accessor('description', {
        header: () => <span> Description </span>,
        cell: info => info.getValue(),
        meta: {
          headerStyle,
          cellStyle: 'max-w-[540px]',
        },
        enableSorting: false,
      }),
    ],
    [helper],
  )

  return (
    <TanStackTable
      data={tableContestData}
      columns={columns}
      firstColumn="appeal"
      useFullWidth={false}
    />
  )
}
