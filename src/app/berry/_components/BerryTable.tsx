'use client'

import React, { FC, useMemo } from 'react'
import Image from 'next/image'

import BlueLink from '@/components/link'
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

  const columns = useMemo(
    () => [
      helper.accessor('generationIntroduced', {
        header: () => <span> Gen </span>,
        cell: info => {
          const generationIntroduced = info.getValue()
          return generationIntroduced.slice(generationIntroduced.length - 1)
        },
      }),
      helper.accessor('name', {
        header: () => <span> Name </span>,
        cell: info => {
          const { name, sprite } = info.row.original
          const itemName = `${name}-berry`
          return (
            <div className="flex items-center">
              <Image src={sprite} alt={name} width={30} height={30} />
              <BlueLink boldFlag href={`/item/${itemName}`}>
                {formatName(name)}
              </BlueLink>
            </div>
          )
        },
      }),
      helper.accessor('shortEntry', {
        header: () => <span> Description </span>,
        cell: info => info.getValue(),
        meta: {
          headerStyle: 'min-w-[23rem]',
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
          cellStyle: 'whitespace-nowrap',
        },
      }),
      helper.accessor('size', {
        header: () => <span> Size </span>,
        cell: info => `${info.getValue() / 10} cm`,
        meta: {
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
      }),
    ],
    [helper],
  )

  return (
    <TanStackTable columns={columns} data={tableBerryData} firstColumn="generationIntroduced" />
  )
}
