'use client'

import React, { ChangeEvent, FC, useMemo, useState } from 'react'
import { Link } from 'next-view-transitions'

import { TypeCard } from '@/components/cards'
import Input from '@/components/input'
import MoveCategoryImage from '@/components/move-category-image'
import { TransformedMove } from '@/types'
import formatName from '@/utils/formatName'
import { createColumnHelper } from '@tanstack/react-table'

import TanStackTable from '../tanstack-table'

interface TableProps {
  moveData: Array<TransformedMove>
}

type MoveTableColumns = Pick<
  TransformedMove,
  | 'moveName'
  | 'moveType'
  | 'damageClass'
  | 'power'
  | 'accuracy'
  | 'PP'
  | 'effect_chance'
  | 'shortEntry'
>

export const MoveTable: FC<TableProps> = ({ moveData }) => {
  const [filteredData, setFilteredData] = useState(moveData)
  const [filterText, setFilterText] = useState('')

  const headerStyle = 'border-r border-r-bd-light pr-4 last:border-r-0 dark:border-r-bd-dark'

  const helper = createColumnHelper<MoveTableColumns>()

  const columns = useMemo(
    () => [
      helper.accessor('moveName', {
        header: () => <span> Name </span>,
        cell: info => {
          const moveName = info.getValue()
          return (
            <Link href={`/move/${moveName}`} className="less-fancy-link font-bold">
              {formatName(moveName)}
            </Link>
          )
        },
        meta: {
          headerStyle,
        },
        sortingFn: 'basic',
        enableGlobalFilter: true,
      }),
      helper.accessor('moveType', {
        header: () => <span> Type </span>,
        cell: info => <TypeCard typeName={info.getValue()} />,
        meta: {
          headerStyle,
        },
        sortingFn: 'basic',
      }),
      helper.accessor('damageClass', {
        header: () => <span> Cat. </span>,
        cell: info => (
          <div className="flex w-full justify-end">
            <MoveCategoryImage category={info.getValue()} />
          </div>
        ),
        meta: {
          headerStyle,
        },
        sortingFn: 'basic',
      }),
      helper.accessor('power', {
        header: () => <span> Power </span>,
        cell: info => info.getValue(),
        meta: {
          headerStyle,
          cellStyle: 'text-right',
        },
        sortingFn: 'basic',
      }),
      helper.accessor('accuracy', {
        header: () => <span> Acc </span>,
        cell: info => info.getValue(),
        meta: {
          headerStyle,
          cellStyle: 'text-right',
        },
        sortingFn: 'basic',
      }),
      helper.accessor('PP', {
        header: () => <span> PP </span>,
        cell: info => info.getValue(),
        meta: {
          headerStyle,
          cellStyle: 'text-right',
        },
        sortingFn: 'basic',
      }),
      helper.accessor('shortEntry', {
        header: () => <span> Effect </span>,
        cell: info => info.getValue(),
        meta: {
          headerStyle,
          cellStyle: 'min-w-[25rem]',
        },
        enableSorting: false,
      }),
      helper.accessor('effect_chance', {
        header: () => <span> Prob (%) </span>,
        cell: info => info.getValue(),
        meta: {
          headerStyle,
          cellStyle: 'text-right',
        },
        sortingFn: 'alphanumeric',
      }),
    ],
    [helper],
  )

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const rawInput = event.target.value
    setFilterText(rawInput)
    const searchString = rawInput.trim().toLowerCase()
    if (!searchString) {
      setFilteredData(moveData)
    } else {
      const filteredSlice = moveData.filter(move =>
        move.moveName.replaceAll('-', ' ').includes(searchString),
      )
      setFilteredData(filteredSlice)
    }
  }

  return (
    <>
      <div className="mb-8 flex justify-center">
        <Input placeholder="Search for a move" onChange={handleChange} value={filterText} />
      </div>
      {filteredData.length > 0 ? (
        <TanStackTable data={filteredData} columns={columns} firstColumn="moveName" />
      ) : (
        <div className="w-full text-center text-2xl"> No moves found.</div>
      )}
    </>
  )
}
