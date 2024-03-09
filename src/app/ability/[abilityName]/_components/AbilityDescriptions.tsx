import { FC } from 'react'

import SectionTitle from '@/components/containers/SectionTitle'
import TableCell from '@/components/containers/TableCell'
import TableCellHeader from '@/components/containers/TableCellHeader'
import TableContainer from '@/components/containers/TableContainer'
import TableRow from '@/components/containers/TableRow'
import formatName from '@/utils/formatName'

interface DescriptionInterface {
  description: string
  versionName: string
  generation: string
}

interface AbilityByGeneration {
  [key: string]: {
    description: string
    generation: string
    versionName: Array<string>
  }
}

interface DescriptionProps {
  descriptions: Array<DescriptionInterface>
}

const AbilityDescription: FC<DescriptionProps> = ({ descriptions }) => {
  const groupedData = descriptions.reduce((acc, curr) => {
    const { description: rawDescription, generation, versionName } = curr
    // There are escape characters in the descriptions, which shall now be removed.
    const description = rawDescription?.replace(/\n/g, ' ')
    if (!acc[generation]) {
      acc[generation] = {
        description,
        generation,
        versionName: [versionName],
      }
    } else {
      acc[generation].versionName.push(versionName)
    }
    return acc
  }, {} as AbilityByGeneration)

  // Filter out undefined generations
  const properGroupedData = descriptions
    ? Object?.values(groupedData).filter((row) => row.generation !== undefined)
    : []

  const tableRows = properGroupedData.map((row, rowIndex) => {
    return (
      <div className="table-row" key={rowIndex}>
        <div className="table-cell h-12 border-t border-slate-200 px-4 py-2 text-right align-middle">
          <ul>
            {row.versionName?.map((version) => {
              return (
                <li className="list-none" key={version}>
                  {formatName(version)}
                </li>
              )
            })}
          </ul>
        </div>
        <div className="table-cell h-12 border-t border-slate-200 px-4 py-2 align-middle">
          {row?.description}
        </div>
      </div>
    )
  })

  return (
    <>
      <SectionTitle>Game Descriptions</SectionTitle>
      <TableContainer>
        {properGroupedData.map((generationKey, rowIndex) => {
          const { description, versionName } = generationKey
          return (
            <TableRow key={rowIndex}>
              <TableCellHeader wrapFlag={true}>
                <ul>
                  {versionName.map((version) => {
                    return (
                      <li className="list-none" key={version}>
                        {formatName(version)}
                      </li>
                    )
                  })}
                </ul>
              </TableCellHeader>
              <TableCell>{description}</TableCell>
            </TableRow>
          )
        })}
      </TableContainer>
    </>
  )
}

export default AbilityDescription
