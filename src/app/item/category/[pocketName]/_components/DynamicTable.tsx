'use client'

import React, { ChangeEvent, FC, useMemo, useState } from 'react'
import Image from 'next/image'

import Input from '@/components/input'
import TanStackTable from '@/components/tanstack-table'
import { TransitionLink } from '@/components/ui/Link'
import { formatName } from '@/utils/string.utils'
import { createColumnHelper } from '@tanstack/react-table'

interface ItemData {
  shortEntry: string
  sprite: string
  category: string
  name: string
  purchasePrice?: number | null
  sellPrice?: number | null
}

interface TableProps {
  itemData: ItemData[]
}

export const DynamicTable: FC<TableProps> = ({ itemData }) => {
  const [filteredData, setFilteredData] = useState<ItemData[]>(itemData)
  const [filterText, setFilterText] = useState('')

  const columns = useMemo(() => {
    const helper = createColumnHelper<ItemData>()

    return [
      helper.accessor('name', {
        header: () => <span>Name</span>,
        cell: info => {
          const { name, sprite } = info.row.original

          return (
            <div className="flex items-center gap-x-2">
              {sprite ? (
                <Image src={sprite} alt={name} width={32} height={32} />
              ) : (
                <div className="h-8 w-8" />
              )}

              <TransitionLink boldFlag={true} href={`/item/${name}`}>
                {formatName(name)}
              </TransitionLink>
            </div>
          )
        },
        meta: {
          headerStyle: 'min-w-40',
          cellStyle: 'whitespace-nowrap',
        },
      }),

      helper.accessor('category', {
        header: () => <span>Category</span>,
        cell: info => formatName(info.getValue()),
        meta: {
          cellStyle: 'whitespace-nowrap',
        },
      }),

      helper.accessor('shortEntry', {
        header: () => <span>Effect</span>,
        cell: info => formatName(info.getValue()),
        meta: {
          headerStyle: 'min-w-96',
        },
        enableSorting: false,
      }),

      helper.accessor('purchasePrice', {
        header: () => <span>Purchase Price</span>,
        cell: info => {
          const value = info.getValue()

          return value != null ? `₽${value.toLocaleString()}` : '—'
        },
        meta: {
          cellStyle: 'whitespace-nowrap',
        },
      }),

      helper.accessor('sellPrice', {
        header: () => <span>Sell Price</span>,
        cell: info => {
          const value = info.getValue()

          return value != null ? `₽${value.toLocaleString()}` : '—'
        },
        meta: {
          cellStyle: 'whitespace-nowrap',
        },
      }),
    ]
  }, [])

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const searchString = event.target.value.toLowerCase()

    setFilterText(searchString)

    const filteredItems = itemData.filter(item => item.name.toLowerCase().includes(searchString))

    setFilteredData(filteredItems)
  }

  return (
    <>
      <div className="mb-8 flex w-full flex-wrap justify-center gap-4">
        <Input placeholder="Search for an item" onChange={handleChange} value={filterText} />
      </div>

      {filteredData.length ? (
        <TanStackTable data={filteredData} columns={columns} firstColumn="name" usePagination />
      ) : (
        <div className="text-center text-4xl font-bold">No such item was found.</div>
      )}
    </>
  )
}
