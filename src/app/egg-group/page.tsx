import React from 'react'
import { Metadata } from 'next'

import {
  PageTitle,
  TableCell,
  TableCellHeader,
  TableContainer,
  TableRow,
} from '@/components/containers'
import BlueLink from '@/components/link'
import EggGroupExtractor from '@/extractors/EggGroupExtractor'
import { EggGroupApi } from '@/services'
import formatName from '@/utils/formatName'

export const metadata: Metadata = {
  title: 'Pokémon Egg Groups | Pokémon Database',
}

const getGroupList = async () => {
  const response = await EggGroupApi.getAll()
  return response
}

const getAllGroupData = async (names: string[]) => {
  const response = await EggGroupApi.getByNames(names)

  // We now filter out gen 8+ pokemon from the list
  return response.sort((a, b) => (a.name > b.name ? 1 : -1)).map(EggGroupExtractor)
}

const EggGroupTable = async () => {
  const groupNames = await getGroupList()

  const eggGroupData = await getAllGroupData(groupNames)
  return (
    <main>
      <PageTitle>Pokémon Egg Groups</PageTitle>
      <div className="flex w-full justify-center">
        <div className="w-60 max-w-full">
          <TableContainer>
            <thead>
              <TableRow className="bg-neutral-200 font-bold dark:bg-table-header">
                <TableCellHeader
                  className="border-r border-r-gray-300 pr-4 dark:border-r-table-border"
                  type="column"
                >
                  Name
                </TableCellHeader>
                <TableCellHeader
                  className="border-r-0 pr-4 text-right dark:border-r-table-border"
                  type="column"
                >
                  Pokemon
                </TableCellHeader>
              </TableRow>
            </thead>
            <tbody>
              {eggGroupData.map((group, index) => {
                const { name, pokemonSpecies } = group
                const pokemonCount = pokemonSpecies.length
                return (
                  <TableRow key={index}>
                    <TableCell variant="column">
                      <BlueLink href={`/egg-group/${name}`} boldFlag>
                        {formatName(name)}
                      </BlueLink>
                    </TableCell>
                    <TableCell variant="column" extraClassName="text-right">
                      {pokemonCount}
                    </TableCell>
                  </TableRow>
                )
              })}
            </tbody>
          </TableContainer>
        </div>
      </div>
    </main>
  )
}

export default EggGroupTable
