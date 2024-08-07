'use client'

import React, { ChangeEvent, FC, useCallback, useMemo, useState } from 'react'
import debounce from 'lodash.debounce'

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

  const handleFilter = useCallback(
    (value: string) => {
      const searchString = value.trim().toLowerCase()
      if (!searchString) {
        setFilteredData(abilityData)
        return
      }
      const filteredSlice = abilityData.filter(ability =>
        ability.name.replaceAll('-', ' ').includes(searchString),
      )
      setFilteredData(filteredSlice)
    },
    [abilityData],
  )

  const debouncedChange = useMemo(
    () =>
      debounce((value: string) => {
        handleFilter(value)
      }, 250),
    [handleFilter],
  )

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const rawInput = event.target.value
    setFilterText(rawInput)
    debouncedChange(rawInput)
  }

  const headers = ['Name', 'Pokemon', 'Description', 'Gen.']

  const headerRows = (
    <TableRow className="bg-neutral-200  dark:bg-table-header">
      {headers.map((header, index) => (
        <TableCellHeader
          type="column"
          key={index}
          className="border-r border-r-gray-300 pr-4 last:border-r-0 dark:border-r-table-border"
        >
          {header}
        </TableCellHeader>
      ))}
    </TableRow>
  )

  const abilityDataRows = filteredData.map((ability, rowIndex) => {
    const { name, pokemonCount, shortEntry, generationIntroduced } = ability
    return (
      <TableRow
        className="duration-300 hover:bg-amber-50 dark:hover:bg-dark-highlighted"
        key={rowIndex}
      >
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
