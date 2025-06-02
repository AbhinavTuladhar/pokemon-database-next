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
  cost: number
}

interface TableProps {
  itemData: Array<ItemData>
}

export const DynamicTable: FC<TableProps> = ({ itemData }) => {
  const tableItemData = itemData.map(({ name, sprite, category, shortEntry, cost }) => ({
    name,
    sprite,
    category,
    shortEntry,
    cost,
  }))

  const [filteredData, setFilteredData] = useState(tableItemData)
  const [filterText, setFilterText] = useState('')

  const helper = createColumnHelper<ItemData>()

  const columns = useMemo(
    () => [
      helper.accessor('name', {
        header: () => <span> Name </span>,
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
        header: () => <span> Category </span>,
        cell: info => formatName(info.getValue()),
        meta: {
          cellStyle: 'whitespace-nowrap',
        },
      }),
      helper.accessor('shortEntry', {
        header: () => <span> Effect </span>,
        cell: info => formatName(info.getValue()),
        meta: {
          headerStyle: 'min-w-96',
        },
        enableSorting: false,
      }),
      helper.accessor('cost', {
        header: () => <span> Cost </span>,
        cell: info => `₽${info.getValue().toLocaleString()}`,
        meta: {
          cellStyle: 'whitespace-nowrap',
        },
      }),
    ],
    [helper],
  )

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
