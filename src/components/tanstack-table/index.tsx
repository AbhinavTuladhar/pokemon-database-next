'use client'

import React, { useRef, useState } from 'react'
import classNames from 'classnames'

import { Table, TableCell, TableHeader, TableRow } from '@/components/ui/Table'
import {
  ColumnDef,
  createPaginatedRowModel,
  createSortedRowModel,
  PaginationState,
  rowPaginationFeature,
  rowSortingFeature,
  sortFn_alphanumeric,
  sortFn_basic,
  SortingState,
  tableFeatures,
  useTable,
} from '@tanstack/react-table'

import PageChangeButton from './page-change-button'
import PageDropdown from './page-dropdown'
import SortingArrows from './sorting-arrows'

const DEFAULT_ROW_COUNT = 25

// Table V9 requires features to be declared explicitly (rather than always
// being bundled in like V8). Core row model is automatic, so we only need
// to register sorting + pagination here, matching what this component
// actually uses.
const appTableFeatures = tableFeatures({
  rowSortingFeature,
  rowPaginationFeature,
  sortFns: {
    alphanumeric: sortFn_alphanumeric,
    basic: sortFn_basic,
  },
  sortedRowModel: createSortedRowModel(),
  paginatedRowModel: createPaginatedRowModel(),
})

// Exported so consumers can build columns with a matching
// createColumnHelper<AppTableFeatures, T>() and type their ColumnDef arrays.
export type AppTableFeatures = typeof appTableFeatures

const getPaginationStrings = (pageIndex: number, pageSize: number, rowCount: number) => {
  const startingRow = pageIndex * pageSize + 1
  const endingRow = pageIndex * pageSize + pageSize

  const realEndingRow = Math.min(endingRow, rowCount)

  return `${startingRow} - ${realEndingRow} of ${rowCount}`
}

interface TableProps<T> {
  data: Array<T>
  columns: ColumnDef<AppTableFeatures, any>[]
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

  const table = useTable({
    features: appTableFeatures,
    data,
    columns,
    state: {
      sorting,
      pagination,
    },
    onSortingChange: setSorting,
    onPaginationChange: setPagination,
    enableSortingRemoval: false, // disable the ability to remove sorting on columns (always none -> asc -> desc -> asc)
  })

  const {
    getHeaderGroups,
    getRowModel,
    getSortedRowModel,
    nextPage,
    previousPage,
    firstPage,
    lastPage,
    getCanNextPage,
    getCanPreviousPage,
    getRowCount,
  } = table

  const headers = getHeaderGroups()[0]
  // The pagination row model is always registered now (features are declared
  // once, statically), so when pagination is turned off for this instance we
  // fall back to the sorted-but-unpaginated row model instead of the fully
  // processed (paginated) one.
  const rows = usePagination ? getRowModel().rows : getSortedRowModel().rows

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
      <Table useFullWidth={useFullWidth}>
        <thead>
          <TableRow className="dark:bg-hdr-dark bg-neutral-200 font-bold duration-75">
            {headers.headers.map(header => (
              <TableHeader
                type="column"
                className={classNames(
                  `border-r-bd-light dark:border-r-bd-dark border-r last:border-r-0`,
                  header.column.columnDef.meta?.headerStyle &&
                    `${header.column.columnDef.meta.headerStyle}`,
                  {
                    'cursor-pointer': header.column.getCanSort(),
                    'bg-gray-300 dark:bg-[hsl(226,57%,36%)]': header.column.getIsSorted(),
                  },
                )}
                key={header.id}
                onClick={header.column.getToggleSortingHandler()}
              >
                <div className="flex items-center justify-between gap-x-1">
                  {header.isPlaceholder ? null : <table.FlexRender header={header} />}
                  {header.column.getCanSort() ? (
                    <SortingArrows state={header.column.getIsSorted()} />
                  ) : null}
                </div>
              </TableHeader>
            ))}
          </TableRow>
        </thead>
        <tbody>
          {rows.map(row => (
            <TableRow
              className="duration-300 even:bg-gray-100 hover:bg-gray-200 dark:even:bg-[hsl(217.1,33.3%,20%)] dark:hover:bg-[hsl(218.6,32.8%,25.1%)]"
              key={row.id}
            >
              {row.getAllCells().map(cell => (
                <TableCell
                  variant="column"
                  extraClassName={
                    cell.column.columnDef.meta?.cellStyle && cell.column.columnDef.meta.cellStyle
                  }
                  key={cell.id}
                >
                  <table.FlexRender cell={cell} />
                </TableCell>
              ))}
            </TableRow>
          ))}
        </tbody>
      </Table>
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
