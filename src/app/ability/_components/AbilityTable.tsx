'use client'

import React, { ChangeEvent, FC, useCallback, useMemo, useState } from 'react'
import debounce from 'lodash.debounce'

import Input from '@/components/input'
import BlueLink from '@/components/link'
import TanStackTable from '@/components/tanstack-table'
import { TransformedAbility } from '@/types'
import formatName from '@/utils/formatName'
import { createColumnHelper } from '@tanstack/react-table'

interface TableProps {
  abilityData: Array<TransformedAbility>
}

type TableAbilityData = Pick<
  TransformedAbility,
  'name' | 'pokemonCount' | 'shortEntry' | 'generationIntroduced'
>

export const AbilityTable: FC<TableProps> = ({ abilityData }) => {
  const tableAbilityData = abilityData.map(
    ({ name, pokemonCount, shortEntry, generationIntroduced }) => ({
      name,
      pokemonCount,
      shortEntry,
      generationIntroduced,
    }),
  )

  const [filteredData, setFilteredData] = useState(tableAbilityData)
  const [filterText, setFilterText] = useState('')

  const helper = createColumnHelper<TableAbilityData>()

  const columns = useMemo(
    () => [
      helper.accessor('name', {
        header: () => <span> Name </span>,
        cell: info => {
          const abilityName = info.getValue()
          return (
            <BlueLink href={`/ability/${abilityName}`} boldFlag={true}>
              {formatName(abilityName)}
            </BlueLink>
          )
        },
      }),
      helper.accessor('pokemonCount', {
        header: () => <span> Pokémon </span>,
        cell: info => info.getValue(),
        meta: {
          headerStyle: 'w-6',
        },
      }),
      helper.accessor('shortEntry', {
        header: () => <span> Description </span>,
        cell: info => info.getValue(),
        meta: {
          headerStyle: 'min-w-[40rem]',
        },
        enableSorting: false,
      }),
      helper.accessor('generationIntroduced', {
        header: () => <span> Gen.</span>,
        cell: info => {
          const gen = info.getValue()
          return gen[gen.length - 1]
        },
        meta: {
          headerStyle: 'w-1',
        },
      }),
    ],
    [helper],
  )

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

  return (
    <>
      <div className="mb-8 flex justify-center">
        <Input placeholder="Search for an ability" onChange={handleChange} value={filterText} />
      </div>
      {filteredData.length ? (
        <TanStackTable data={filteredData} columns={columns} firstColumn="name" usePagination />
      ) : (
        <div className="text-center text-4xl font-bold">No such ability was found.</div>
      )}
    </>
  )
}
