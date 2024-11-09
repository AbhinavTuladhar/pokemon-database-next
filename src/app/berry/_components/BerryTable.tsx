'use client'

import React, { FC, useMemo } from 'react'
import Image from 'next/image'
import { Tooltip } from 'react-tooltip'

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
  | 'id'
  | 'sprite'
  | 'name'
  | 'shortEntry'
  | 'growthTime'
  | 'firmness'
  | 'size'
  | 'maxHarvest'
>

export const BerryTable: FC<BerryTableProps> = ({ berryData }) => {
  const tableBerryData = berryData.map(
    ({
      generationIntroduced,
      id,
      sprite,
      name,
      shortEntry,
      growthTime,
      firmness,
      size,
      maxHarvest,
    }) => ({
      generationIntroduced,
      id,
      sprite,
      name,
      shortEntry,
      growthTime,
      firmness,
      size,
      maxHarvest,
    }),
  )

  const helper = createColumnHelper<TableBerryData>()
  const headerStyle = 'border-r border-r-gray-300 pr-4 last:border-r-0 dark:border-r-bd-dark'

  const columns = useMemo(
    () => [
      helper.accessor('id', {
        header: () => <span> ID </span>,
        cell: info => info.getValue(),
        meta: {
          headerStyle,
        },
      }),
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
            <div className="flex items-center gap-x-1">
              <Image src={sprite} alt={name} width={40} height={40} />
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
        header: () => <span id="growthTime"> Growth Time </span>,
        cell: info => info.getValue(),
        meta: {
          headerStyle,
        },
      }),
      helper.accessor('firmness', {
        header: () => <span id="firmness"> Firmness </span>,
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
        header: () => <span id="maxHarvest"> Max Harvest </span>,
        cell: info => info.getValue(),
        meta: {
          headerStyle,
        },
      }),
    ],
    [helper],
  )

  const tooltipData = [
    { id: 'growthTime', text: 'Time it takes the tree to grow one stage, in hours.' },
    { id: 'firmness', text: 'The firmness of this berry, used in making Pokéblocks or Poffins.' },
    { id: 'maxHarvest', text: 'The maximum number of these berries that can grow on one tree.' },
  ]

  return (
    <>
      <TanStackTable columns={columns} data={tableBerryData} firstColumn="id" />
      {tooltipData.map(tip => (
        <Tooltip
          anchorSelect={`#${tip.id}`}
          place="top"
          key={tip.id}
          style={{ backgroundColor: 'black', padding: '0.5rem', maxWidth: '15rem' }}
        >
          <span className="text-xs"> {tip.text} </span>
        </Tooltip>
      ))}
    </>
  )
}
