'use client'

import React, { ChangeEvent, FC, useState } from 'react'
import type { GroupBase, SingleValue } from 'react-select'
import Select from 'react-select'

import Input from '@/components/Input'
import formatName from '@/utils/formatName'

import ItemTable from './ItemTable'

interface ItemData {
  shortEntry: string
  sprite: string
  category: string
  name: string
}

interface TableProps {
  itemData: Array<ItemData>
  categories: Array<string>
  pocketData: Array<{
    pocketName: string
    categories: Array<string>
  }>
}

interface SelectProps {
  label: string
}

const DynamicTable: FC<TableProps> = ({ itemData, categories, pocketData }) => {
  const [filteredData, setFilteredData] = useState(itemData)
  const [filterText, setFilterText] = useState('')
  const [selectedOption, setSelectedOption] = useState<SelectProps>()

  const optionCategories = ['- All -', ...categories]

  const options = optionCategories
    .sort((a, b) => (a > b ? 1 : -1))
    .map(category => ({
      value: category,
      label: formatName(category),
    })) as unknown as (SelectProps | GroupBase<SelectProps>)[]

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const searchString = event.target.value.toLowerCase()
    setFilterText(searchString)
    filterData(searchString, selectedOption?.label)
  }

  const handleSelectChange = (value: SingleValue<SelectProps>) => {
    const selectedLabel = value?.label as string
    setSelectedOption({ label: selectedLabel })
    filterData(filterText, selectedLabel)
  }

  const filterData = (searchString: string, selectedLabel: string | undefined) => {
    let filteredSlice = itemData

    if (searchString) {
      filteredSlice = filteredSlice.filter(item =>
        item.name.replace('-', ' ').includes(searchString.trim()),
      )
    }

    if (selectedLabel && selectedLabel !== '- All -') {
      const selectedPocketCategories =
        pocketData.find(pocket => pocket.pocketName === selectedLabel.toLowerCase())?.categories ||
        []
      filteredSlice = filteredSlice.filter(item => selectedPocketCategories.includes(item.category))
    }

    setFilteredData(filteredSlice)
  }

  return (
    <>
      <div className="mb-8 flex w-full flex-wrap justify-center gap-4">
        <Input
          className="w-64 max-w-full rounded-lg px-2 py-2 text-black placeholder-gray-300"
          placeholder="Search for an item"
          onChange={handleChange}
          value={filterText}
        />
        <Select
          className="w-36 whitespace-normal text-black"
          options={options}
          value={selectedOption}
          placeholder="- All -"
          onChange={handleSelectChange}
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
