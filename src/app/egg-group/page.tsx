import React from 'react'

import BlueLink from '@/components/BlueLink'
import TableCell from '@/components/containers/TableCell'
import TableCellHeader from '@/components/containers/TableCellHeader'
import TableContainer from '@/components/containers/TableContainer'
import TableRow from '@/components/containers/TableRow'
import { EggGroupApi } from '@/services/EggGroupApi'
import formatName from '@/utils/formatName'

const getGroupList = async () => {
  const response = await EggGroupApi.getAll()
  return response
}

const getAllGroupData = async (urls: string[]) => {
  const response = await EggGroupApi.getByUrls(urls)

  // We now filter out gen 8+ pokemon from the list
  return response.sort((a, b) => (a.name > b.name ? 1 : -1))
}

const EggGroupTable = async () => {
  const groupList = await getGroupList()

  const urlList = groupList.results.map((group) => group.url)

  const eggGroupData = await getAllGroupData(urlList)
  return (
    <main>
      <h1 className="my-4 text-center text-5xl font-bold">Pokémon Egg Groups</h1>
      <div className="flex w-full justify-center">
        <div className="w-60 max-w-full">
          <TableContainer>
            <thead>
              <TableRow className="bg-[#1a1a1a]">
                <TableCellHeader type="column"> Name </TableCellHeader>
                <TableCellHeader type="column" className="text-right">
                  Pokemon
                </TableCellHeader>
              </TableRow>
            </thead>
            <tbody>
              {eggGroupData.map((group, index) => {
                const { name, pokemon_species } = group
                const pokemonCount = pokemon_species.length
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
