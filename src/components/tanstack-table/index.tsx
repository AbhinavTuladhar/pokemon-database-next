'use client'

import React, { useState } from 'react'
import classNames from 'classnames'

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from '@tanstack/react-table'

import { TableCell, TableCellHeader, TableContainer, TableRow } from '../containers'

interface TableProps<T> {
  data: Array<T>
  columns: ColumnDef<T, any>[]
}

const TanStackTable = <T extends object>({ data, columns }: TableProps<T>) => {
  const [sorting, setSorting] = useState<SortingState>([])

  const { getHeaderGroups, getRowModel } = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
    },
    onSortingChange: setSorting,
  })

  const headers = getHeaderGroups()[0]
  const rows = getRowModel().rows

  return (
    <TableContainer>
      <thead>
        <TableRow className="bg-gray-300 font-bold dark:bg-hdr-dark">
          {headers.headers.map(header => (
            <TableCellHeader
              type="column"
              className={classNames(`${header.column.columnDef.meta?.headerStyle}`, {
                'cursor-pointer select-none': header.column.getCanSort(),
              })}
              key={header.id}
              onClick={header.column.getToggleSortingHandler()}
            >
              {header.isPlaceholder
                ? null
                : flexRender(header.column.columnDef.header, header.getContext())}
            </TableCellHeader>
          ))}
        </TableRow>
      </thead>
      <tbody>
        {rows.map(row => (
          <TableRow key={row.id}>
            {row.getVisibleCells().map(cell => (
              <TableCell extraClassName={cell.column.columnDef.meta?.cellStyle} key={cell.id}>
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
