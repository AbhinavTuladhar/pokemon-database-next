'use client'

import React, { Fragment } from 'react'

import { ColumnDef, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table'

import { TableCellHeader, TableContainer, TableRow } from '../containers'

interface TableProps<T> {
  data: Array<T>
  columns: ColumnDef<T, any>[]
}

const TanStackTable = <T extends object>({ data, columns }: TableProps<T>) => {
  const { getHeaderGroups, getRowModel } = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  const headers = getHeaderGroups()[0]
  const rows = getRowModel().rows

  return (
    <TableContainer>
      <thead>
        <TableRow>
          {headers.headers.map(header => (
            <TableCellHeader key={header.id}>
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
              <Fragment key={cell.id}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </Fragment>
            ))}
          </TableRow>
        ))}
      </tbody>
    </TableContainer>
  )
}

export default TanStackTable
