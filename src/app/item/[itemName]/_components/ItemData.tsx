import React, { FC } from 'react'

import {
  SectionTitle,
  TableCell,
  TableCellHeader,
  TableContainer,
  TableRow,
} from '@/components/containers'
import { TransformedItem } from '@/types'
import { formatText } from '@/utils/formatName'

type DataProps = Pick<
  TransformedItem,
  'attributes' | 'category' | 'cost' | 'fling_effect' | 'fling_power'
>

export const ItemData: FC<DataProps> = ({
  attributes,
  category,
  cost,
  fling_effect,
  fling_power,
}) => {
  const attributeDiv = (
    <ul>
      {attributes.map((attribute, index) => (
        <li key={index}> {formatText(attribute)} </li>
      ))}
    </ul>
  )

  const tableData = [
    ...(attributes.length > 0 ? [{ header: 'Attributes', children: attributeDiv }] : []),
    { header: 'Category', children: formatText(category) },
    { header: 'Cost', children: cost },
    ...(fling_effect ? [{ header: 'Fling Effect', children: formatText(fling_effect.name) }] : []),
    ...(fling_power ? [{ header: 'Fling Power', children: fling_power }] : []),
  ]

  return (
    <>
      <SectionTitle> Item Data </SectionTitle>
      <TableContainer>
        <tbody>
          {tableData.map((row, rowIndex) => (
            <TableRow key={rowIndex}>
              <TableCellHeader>
                <span className="text-sm font-normal"> {row.header} </span>
              </TableCellHeader>
              <TableCell> {row.children} </TableCell>
            </TableRow>
          ))}
        </tbody>
      </TableContainer>
    </>
  )
}
