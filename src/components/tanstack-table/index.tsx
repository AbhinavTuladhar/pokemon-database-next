'use client'

import React, { useRef, useState } from 'react'
import classNames from 'classnames'

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  PaginationState,
  SortingState,
  useReactTable,
} from '@tanstack/react-table'

import { TableCell, TableCellHeader, TableContainer, TableRow } from '../containers'

import PageChangeButton from './page-change-button'
import PageDropdown from './page-dropdown'
import SortingArrows from './sorting-arrows'

const DEFAULT_ROW_COUNT = 25

const getPaginationStrings = (pageIndex: number, pageSize: number, rowCount: number) => {
  const startingRow = pageIndex * pageSize + 1
  const endingRow = pageIndex * pageSize + pageSize

  const realEndingRow = Math.min(endingRow, rowCount)

  return `${startingRow} - ${realEndingRow} of ${rowCount}`
}

interface TableProps<T> {
  data: Array<T>
  columns: ColumnDef<T, any>[]
  firstColumn: keyof T
  useFullWidth?: boolean
  usePagination?: boolean
}

const TanStackTable = <T extends object>({
  data,
  columns,
  firstColumn,
  useFullWidth = true,
  usePagination = false,
}: TableProps<T>) => {
  const [sorting, setSorting] = useState<SortingState>([{ id: firstColumn as string, desc: false }])
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: DEFAULT_ROW_COUNT,
  })
  const tableRef = useRef<HTMLDivElement>(null)

  const {
    getHeaderGroups,
    getRowModel,
    nextPage,
    previousPage,
    firstPage,
    lastPage,
    getCanNextPage,
    getCanPreviousPage,
    getRowCount,
  } = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: usePagination ? getPaginationRowModel() : undefined,
    onPaginationChange: setPagination,
    state: {
      sorting,
      pagination,
    },
    onSortingChange: setSorting,
    enableSortingRemoval: false, // disable the ability to remove sorting on columns (always none -> asc -> desc -> asc)
  })

  const headers = getHeaderGroups()[0]
  const rows = getRowModel().rows

  const paginationString = getPaginationStrings(
    pagination.pageIndex,
    pagination.pageSize,
    getRowCount(),
  )

  const rowOptions = [25, 50, 100, 250, 500]

  const handlePageChange = (callback: () => void) => {
    // Scroll to top of the table whenever a pagination button is clicked.
    if (tableRef.current) {
      tableRef.current.scrollIntoView({ behavior: 'smooth' })
    }
    callback()
  }

  const handlePageSizeChange = (pageSize: number) => {
    // Scroll to top of the table
    if (tableRef.current) {
      tableRef.current.scrollIntoView({ behavior: 'smooth' })
    }
    setPagination({
      pageIndex: 0,
      pageSize,
    })
  }

  return (
    <div className="space-y-4" ref={tableRef}>
      <TableContainer useFullWidth={useFullWidth}>
        <thead>
          <TableRow className="dark:bg-hdr-dark bg-neutral-200 font-bold duration-75">
            {headers.headers.map(header => (
              <TableCellHeader
                type="column"
                className={classNames(
                  `border-r-bd-light dark:border-r-bd-dark border-r last:border-r-0`,
                  header.column.columnDef.meta?.headerStyle &&
                    `${header.column.columnDef.meta.headerStyle}`,
                  {
                    'cursor-pointer': header.column.getCanSort(),
                    'bg-gray-300 dark:bg-[hsl(226,_57%,_36%)]': header.column.getIsSorted(),
                  },
                )}
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
              className="duration-300 even:bg-gray-100 hover:bg-gray-200 dark:even:bg-[hsl(217.1,33.3%,20%)] dark:hover:bg-[hsl(218.6,32.8%,25.1%)]"
              key={row.id}
            >
              {row.getVisibleCells().map(cell => (
                <TableCell
                  variant="column"
                  extraClassName={
                    cell.column.columnDef.meta?.cellStyle && cell.column.columnDef.meta.cellStyle
                  }
                  key={cell.id}
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </tbody>
      </TableContainer>
      {usePagination && (
        <div className="flex flex-wrap items-center gap-x-1 gap-y-2 sm:justify-end">
          <div className="flex items-center gap-x-2">
            <span className="text-sm">Rows per page:</span>
            <PageDropdown
              initialValue={DEFAULT_ROW_COUNT}
              onChange={handlePageSizeChange}
              options={rowOptions}
            />
          </div>
          <div className="flex items-center gap-x-2">
            <PageChangeButton
              onClick={() => handlePageChange(firstPage)}
              disabled={!getCanPreviousPage()}
            >
              {'<<'}
            </PageChangeButton>
            <PageChangeButton
              onClick={() => handlePageChange(previousPage)}
              disabled={!getCanPreviousPage()}
            >
              {'<'}
            </PageChangeButton>
            <div className="text-sm">{paginationString}</div>
            <PageChangeButton
              onClick={() => handlePageChange(nextPage)}
              disabled={!getCanNextPage()}
            >
              {'>'}
            </PageChangeButton>
            <PageChangeButton
              onClick={() => handlePageChange(lastPage)}
              disabled={!getCanNextPage()}
            >
              {'>>'}
            </PageChangeButton>
          </div>
        </div>
      )}
    </div>
  )
}

export default TanStackTable
