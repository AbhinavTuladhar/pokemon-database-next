'use client'

import React, { ChangeEvent, FC, useState } from 'react'

import { TableCell, TableCellHeader, TableContainer, TableRow } from '@/components/containers'
import Input from '@/components/input'
import BlueLink from '@/components/link'
import { TransformedAbility } from '@/types'
import formatName from '@/utils/formatName'

interface TableProps {
  abilityData: Array<TransformedAbility>
}

export const AbilityTable: FC<TableProps> = ({ abilityData }) => {
  const [filteredData, setFilteredData] = useState(abilityData)
  const [filterText, setFilterText] = useState('')

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const searchString = event.target.value.toLowerCase()
    setFilterText(searchString)
    if (!searchString) {
      setFilteredData(abilityData)
    } else {
      const filteredSlice = abilityData.filter(ability =>
        ability.name.replace('-', ' ').includes(searchString.trim()),
      )
      setFilteredData(filteredSlice)
    }
  }

  const headers = ['Name', 'Pokemon', 'Description', 'Gen.']

  const headerRows = (
    <TableRow className="bg-table-header">
      {headers.map((header, index) => (
        <TableCellHeader
          type="column"
          key={index}
          className="border-r border-table-border pr-4 last:border-r-0"
        >
          <span className="font-bold text-white"> {header}</span>
        </TableCellHeader>
      ))}
    </TableRow>
  )

  const abilityDataRows = filteredData.map((ability, rowIndex) => {
    const { name, pokemonCount, shortEntry, generationIntroduced } = ability
    return (
      <TableRow className="duration-300 hover:bg-[#2c303b]" key={rowIndex}>
        <TableCell variant="column">
          <BlueLink href={`/ability/${name}`} boldFlag={true}>
            {formatName(name)}
          </BlueLink>
        </TableCell>
        <TableCell variant="column" extraClassName="w-6">
          {pokemonCount}
        </TableCell>
        <TableCell variant="column" extraClassName="min-w-[40rem]">
          {shortEntry}
        </TableCell>
        <TableCell variant="column" extraClassName="w-1">
          {generationIntroduced[generationIntroduced.length - 1]}
        </TableCell>
      </TableRow>
    )
  })
  return (
    <>
      <div className="mb-8 flex justify-center">
        <Input placeholder="Search for an ability" onChange={handleChange} value={filterText} />
      </div>
      <TableContainer>
        <thead>{headerRows}</thead>
        <tbody>{abilityDataRows}</tbody>
      </TableContainer>
    </>
  )
}
