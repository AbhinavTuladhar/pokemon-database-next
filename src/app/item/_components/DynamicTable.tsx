'use client'

import React, { ChangeEvent, FC, useState } from 'react'

import ItemTable from './ItemTable'

interface ItemData {
  shortEntry: string
  sprite: string
  category: string
  name: string
}

interface TableProps {
  itemData: Array<ItemData>
}

const DynamicTable: FC<TableProps> = ({ itemData }) => {
  const [filteredData, setFilteredData] = useState(itemData)
  const [filterText, setFilterText] = useState('')

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const searchString = event.target.value.toLowerCase()
    setFilterText(searchString)
    if (!searchString) {
      setFilteredData(filteredData)
    } else {
      const filteredSlice = itemData.filter(item => item.name.toLowerCase().includes(searchString))
      setFilteredData(filteredSlice)
    }
  }

  return (
    <>
      <div className="mb-8 flex w-full justify-center">
        <input
          className="w-64 max-w-full rounded-lg px-2 py-2 text-black placeholder-gray-300"
          placeholder="Search for an item"
          onChange={handleChange}
          value={filterText}
        />
      </div>
      {filteredData.length ? (
        <ItemTable itemData={filteredData} />
      ) : (
        <div className="text-center text-4xl font-bold">No such item was found.</div>
      )}
    </>
  )
}

export default DynamicTable
