import React from 'react'

import BlueLink from '@/components/BlueLink'
import TableCell from '@/components/containers/TableCell'
import TableCellHeader from '@/components/containers/TableCellHeader'
import TableContainer from '@/components/containers/TableContainer'
import TableRow from '@/components/containers/TableRow'
import AbilityExtractor from '@/extractors/AbilityExtractor'
import { AbilityApi } from '@/services/AbilityApi'
import formatName from '@/utils/formatName'

const getUrlList = async () => {
  const response = await AbilityApi.getAllUrls()
  return response
}

const getAllAbilityData = async (urls: Array<string>) => {
  const abilityData = await AbilityApi.getByUrls(urls)
  return abilityData.map(AbilityExtractor).sort((a, b) => (a.name > b.name ? 1 : -1))
}

const page = async () => {
  const abilityUrlList = await getUrlList()
  const allAbilityData = await getAllAbilityData(abilityUrlList)

  const headers = ['Name', 'Pokemon', 'Description', 'Gen.']

  return (
    <main>
      <h1 className="my-4 text-center text-5xl font-bold"> Pokémon Abilities </h1>
      <TableContainer>
        <TableRow className="bg-[#1a1a1a]">
          {headers.map((header, index) => (
            <TableCellHeader type="column" key={index}>
              <span className="font-bold text-white"> {header}</span>
            </TableCellHeader>
          ))}
        </TableRow>
        {allAbilityData.map((ability, rowIndex) => {
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
        })}
      </TableContainer>
    </main>
  )
}

export default page
