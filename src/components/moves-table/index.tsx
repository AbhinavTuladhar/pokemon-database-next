'use client'

import React, { ChangeEvent, FC, useMemo, useState } from 'react'

import Input from '@/components/input'
import MoveCategoryImage from '@/components/move-category-image'
import { TypeCard } from '@/features/pokemon/components/TypeCard'
import { TransformedMove } from '@/types'
import { formatName } from '@/utils/string.utils'
import { createColumnHelper } from '@tanstack/react-table'

import TanStackTable from '../tanstack-table'
import { TransitionLink } from '../ui/Link'

interface TableProps {
  moveData: Array<TransformedMove>
  usePagination?: boolean
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

export const MoveTable: FC<TableProps> = ({ moveData, usePagination = false }) => {
  const tableMoveData = moveData.map(
    ({ moveName, moveType, damageClass, power, accuracy, PP, effect_chance, shortEntry }) => ({
      moveName,
      moveType,
      damageClass,
      power,
      accuracy,
      PP,
      effect_chance,
      shortEntry,
    }),
  )

  const [filteredData, setFilteredData] = useState(tableMoveData)
  const [filterText, setFilterText] = useState('')

  const helper = createColumnHelper<MoveTableColumns>()

  const columns = useMemo(
    () => [
      helper.accessor('moveName', {
        header: () => <span> Name </span>,
        cell: info => {
          const moveName = info.getValue()
          return (
            <TransitionLink boldFlag href={`/move/${moveName}`}>
              {formatName(moveName)}
            </TransitionLink>
          )
        },
        sortingFn: 'basic',
        enableGlobalFilter: true,
      }),
      helper.accessor('moveType', {
        header: () => <span> Type </span>,
        cell: info => <TypeCard typeName={info.getValue()} />,
        sortingFn: 'basic',
      }),
      helper.accessor('damageClass', {
        header: () => <span> Cat. </span>,
        cell: info => (
          <div className="flex w-full justify-end">
            <MoveCategoryImage category={info.getValue()} />
          </div>
        ),
        sortingFn: 'basic',
      }),
      helper.accessor('power', {
        header: () => <span> Power </span>,
        cell: info => {
          const powerValue = info.getValue()
          if (powerValue === 0) {
            return '-'
          }
          return powerValue
        },
        meta: {
          cellStyle: 'text-right',
        },
        sortingFn: 'alphanumeric',
      }),
      helper.accessor('accuracy', {
        header: () => <span> Acc </span>,
        cell: info => {
          const accuracyValue = info.getValue()
          if (accuracyValue === 0) {
            return '-'
          }
          if (accuracyValue === Infinity) {
            return '∞'
          }
          return accuracyValue
        },
        meta: {
          cellStyle: 'text-right',
        },
        sortingFn: 'basic',
      }),
      helper.accessor('PP', {
        header: () => <span> PP </span>,
        cell: info => info.getValue(),
        meta: {
          cellStyle: 'text-right',
        },
        sortingFn: 'basic',
      }),
      helper.accessor('shortEntry', {
        header: () => <span> Effect </span>,
        cell: info => info.getValue(),
        meta: {
          headerStyle: 'min-w-[25rem]',
        },
        enableSorting: false,
      }),
      helper.accessor('effect_chance', {
        header: () => <span> Prob (%) </span>,
        cell: info => info.getValue(),
        meta: {
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
        <TanStackTable
          usePagination={usePagination}
          data={filteredData}
          columns={columns}
          firstColumn="moveName"
        />
      ) : (
        <div className="w-full text-center text-2xl"> No moves found.</div>
      )}
    </>
  )
}
