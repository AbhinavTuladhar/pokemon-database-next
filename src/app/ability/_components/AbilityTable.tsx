'use client'

import React, { ChangeEvent, FC, useState } from 'react'

import BlueLink from '@/components/BlueLink'
import TableCell from '@/components/containers/TableCell'
import TableCellHeader from '@/components/containers/TableCellHeader'
import TableContainer from '@/components/containers/TableContainer'
import TableRow from '@/components/containers/TableRow'
import Input from '@/components/Input'
import { TransformedAbility } from '@/types'
import formatName from '@/utils/formatName'

interface TableProps {
  abilityData: Array<TransformedAbility>
}

const AbilityTable: FC<TableProps> = ({ abilityData }) => {
  const [filteredData, setFilteredData] = useState(abilityData)
  const [filterText, setFilterText] = useState('')

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const searchString = event.target.value.toLowerCase()
    setFilterText(searchString)
    if (!searchString) {
      setFilteredData(abilityData)
    } else {
      const filteredSlice = abilityData.filter(ability => ability.name.includes(searchString))
      setFilteredData(filteredSlice)
    }
  }

  const headers = ['Name', 'Pokemon', 'Description', 'Gen.']

  const headerRows = (
    <TableRow className="bg-[#1a1a1a]">
      {headers.map((header, index) => (
        <TableCellHeader type="column" key={index}>
          <span className="font-bold text-white"> {header}</span>
        </TableCellHeader>
      ))}
    </TableRow>
  )

  const abilityDataRows = filteredData.map((ability, rowIndex) => {
    const { name, pokemonCount, shortEntry, generationIntroduced } = ability
    return (
      <TableRow className="odd:bg-gray-900" key={rowIndex}>
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

export default AbilityTable
