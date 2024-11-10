'use client'

import React, { FC, useState } from 'react'
import classNames from 'classnames'
import { GoTriangleDown, GoTriangleUp } from 'react-icons/go'

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from '@tanstack/react-table'

import { TableCell, TableCellHeader, TableContainer, TableRow } from '../containers'

interface ArrowProps {
  state: 'asc' | 'desc' | false
}

const SortingArrows: FC<ArrowProps> = ({ state }) => (
  <div className="flex w-4 flex-col text-sm">
    <GoTriangleUp
      className={classNames('block duration-200', {
        'visible opacity-100': state === 'asc' || state === false,
        'invisible opacity-0': state !== 'asc' && state !== false,
      })}
    />
    <GoTriangleDown
      className={classNames('-mt-2 block duration-200', {
        'visible opacity-100': state === 'desc' || state === false,
        'invisible opacity-0': state !== 'desc' && state !== false,
      })}
    />
  </div>
)

interface TableProps<T> {
  data: Array<T>
  columns: ColumnDef<T, any>[]
  firstColumn: keyof T
}

const TanStackTable = <T extends object>({ data, columns, firstColumn }: TableProps<T>) => {
  const [sorting, setSorting] = useState<SortingState>([{ id: firstColumn as string, desc: false }])

  const { getHeaderGroups, getRowModel } = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    enableSortingRemoval: false, // disable the ability to remove sorting on columns (always none -> asc -> desc -> asc)
  })

  const headers = getHeaderGroups()[0]
  const rows = getRowModel().rows

  return (
    <TableContainer>
      <thead>
        <TableRow className="bg-neutral-200 font-bold duration-300 dark:bg-hdr-dark">
          {headers.headers.map(header => (
            <TableCellHeader
              type="column"
              className={classNames(`${header.column.columnDef.meta?.headerStyle}`, {
                'cursor-pointer select-none': header.column.getCanSort(),
                'bg-gray-300 dark:bg-[hsl(226,_57%,_36%)]': header.column.getIsSorted(),
              })}
              key={header.id}
              onClick={header.column.getToggleSortingHandler()}
            >
              <div className="flex items-center justify-between gap-x-1">
                {header.isPlaceholder
                  ? null
                  : flexRender(header.column.columnDef.header, header.getContext())}
                {header.column.getCanSort() ? (
                  <SortingArrows state={header.column.getIsSorted()} />
                ) : null}
              </div>
            </TableCellHeader>
          ))}
        </TableRow>
      </thead>
      <tbody>
        {rows.map(row => (
          <TableRow
            className="duration-300 even:bg-gray-100 hover:bg-gray-200 dark:even:bg-[#222f44] dark:hover:bg-[#2b3a55]"
            key={row.id}
          >
            {row.getVisibleCells().map(cell => (
              <TableCell
                variant="column"
                extraClassName={cell.column.columnDef.meta?.cellStyle}
                key={cell.id}
              >
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </tbody>
    </TableContainer>
  )
}

export default TanStackTable
