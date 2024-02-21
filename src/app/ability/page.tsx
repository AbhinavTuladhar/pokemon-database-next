import React from 'react'
import { AbilityApi } from '@/services/AbilityApi'
import TableRow from '@/components/TableRow'
import TableCell from '@/components/containers/TableCell'
import TableCellHeader from '@/components/containers/TableCellHeader'
import AbilityExtractor from '@/extractors/AbilityExtractor'
import TableContainer from '@/components/containers/TableContainer'
import formatName from '@/utils/formatName'
import BlueLink from '@/components/BlueLink'

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
        const cellInformation = [name, pokemonCount, shortEntry, generationIntroduced]
        return (
          <TableRow className="odd:bg-gray-900" key={rowIndex}>
            <TableCell>
              <BlueLink href={`/ability/${name}`} boldFlag={true}>
                {formatName(name)}
              </BlueLink>
            </TableCell>
            <TableCell extraClassName="w-6">{pokemonCount}</TableCell>
            <TableCell extraClassName="min-w-[40rem]">{shortEntry}</TableCell>
            <TableCell extraClassName="w-1">
              {generationIntroduced[generationIntroduced.length - 1]}
            </TableCell>
          </TableRow>
        )
      })}
    </TableContainer>
  )
}

export default page
