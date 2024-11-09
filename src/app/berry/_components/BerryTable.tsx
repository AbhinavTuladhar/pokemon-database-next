'use client'

import React, { FC, useMemo } from 'react'
import Image from 'next/image'

import TanStackTable from '@/components/tanstack-table'
import { CombinedBerryItem } from '@/types'
import formatName from '@/utils/formatName'
import { createColumnHelper } from '@tanstack/react-table'

interface BerryTableProps {
  berryData: Array<CombinedBerryItem>
}

type TableBerryData = Pick<
  CombinedBerryItem,
  | 'generationIntroduced'
  | 'sprite'
  | 'name'
  | 'shortEntry'
  | 'growthTime'
  | 'firmness'
  | 'size'
  | 'maxHarvest'
  | 'smoothness'
>

export const BerryTable: FC<BerryTableProps> = ({ berryData }) => {
  const tableBerryData = berryData.map(
    ({
      generationIntroduced,
      sprite,
      name,
      shortEntry,
      growthTime,
      firmness,
      size,
      maxHarvest,
      smoothness,
    }) => ({
      generationIntroduced,
      sprite,
      name,
      shortEntry,
      growthTime,
      firmness,
      size,
      maxHarvest,
      smoothness,
    }),
  )

  const helper = createColumnHelper<TableBerryData>()
  const headerStyle = 'border-r border-r-gray-300 pr-4 last:border-r-0 dark:border-r-bd-dark'

  const columns = useMemo(
    () => [
      helper.accessor('generationIntroduced', {
        header: () => <span> Gen </span>,
        cell: info => {
          const generationIntroduced = info.getValue()
          return generationIntroduced.slice(generationIntroduced.length - 1)
        },
        meta: {
          headerStyle,
        },
      }),
      helper.accessor('name', {
        header: () => <span> Name </span>,
        cell: info => {
          const { name, sprite } = info.row.original
          return (
            <div className="flex items-center">
              <Image src={sprite} alt={name} width={30} height={30} />
              <span>{formatName(name)}</span>
            </div>
          )
        },
        meta: {
          headerStyle,
        },
      }),
      helper.accessor('shortEntry', {
        header: () => <span> Description </span>,
        cell: info => info.getValue(),
        meta: {
          headerStyle,
          cellStyle: 'min-w-[23rem]',
        },
        enableSorting: false,
      }),
      helper.accessor('growthTime', {
        header: () => (
          <span
            data-tooltip-id="my-tooltip"
            data-tooltip-content="Time it takes the tree to grow one stage, in hours. Berry trees go through four of these growth stages before they can be picked."
          >
            Growth Time
          </span>
        ),
        cell: info => info.getValue(),
        meta: {
          headerStyle,
        },
      }),
      helper.accessor('firmness', {
        header: () => (
          <span
            data-tooltip-id="my-tooltip"
            data-tooltip-content="The firmness of this berry, used in making Pokéblocks or Poffins."
          >
            Firmness
          </span>
        ),
        cell: info => formatName(info.getValue()),
        meta: {
          headerStyle,
          cellStyle: 'whitespace-nowrap',
        },
      }),
      helper.accessor('size', {
        header: () => <span> Size </span>,
        cell: info => `${info.getValue() / 10} cm`,
        meta: {
          headerStyle,
          cellStyle: 'whitespace-nowrap',
        },
      }),
      helper.accessor('maxHarvest', {
        header: () => (
          <span
            data-tooltip-id="my-tooltip"
            data-tooltip-content="The maximum number of these berries that can grow on one tree in Generation IV."
          >
            Max Harvest
          </span>
        ),
        cell: info => info.getValue(),
        meta: {
          headerStyle,
        },
      }),
      helper.accessor('smoothness', {
        header: () => (
          <span
            data-tooltip-id="my-tooltip"
            data-tooltip-content="The smoothness of this Berry, used in making Pokéblocks or Poffins."
          >
            Smoothness
          </span>
        ),
        cell: info => info.getValue(),
        meta: {
          headerStyle,
        },
      }),
    ],
    [helper],
  )

  return (
    <TanStackTable columns={columns} data={tableBerryData} firstColumn="generationIntroduced" />
  )
}
