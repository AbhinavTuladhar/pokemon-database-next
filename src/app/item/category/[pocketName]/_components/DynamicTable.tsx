'use client'

import React, { ChangeEvent, FC, useState } from 'react'

import Input from '@/components/input'

import { ItemTable } from './ItemTable'

interface ItemData {
  shortEntry: string
  sprite: string
  category: string
  name: string
}

interface TableProps {
  itemData: Array<ItemData>
}

export const DynamicTable: FC<TableProps> = ({ itemData }) => {
  const [filteredData, setFilteredData] = useState(itemData)
  const [filterText, setFilterText] = useState('')

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
        <ItemTable itemData={filteredData} />
      ) : (
        <div className="text-center text-4xl font-bold">No such item was found.</div>
      )}
    </>
  )
}
