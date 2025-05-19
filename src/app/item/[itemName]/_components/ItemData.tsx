import React, { FC } from 'react'

import { Table, TableCell, TableHeader, TableRow } from '@/components/ui/Table'
import { SectionTitle } from '@/components/ui/Title'
import { TransformedItem } from '@/types'
import { formatText } from '@/utils/string.utils'

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
      {attributes.map(attribute => (
        <li key={attribute}> {formatText(attribute)} </li>
      ))}
    </ul>
  )

  const tableData = [
    ...(attributes.length > 0 ? [{ header: 'Attributes', children: attributeDiv }] : []),
    { header: 'Category', children: formatText(category) },
    { header: 'Cost', children: `₽${cost}` },
    ...(fling_effect ? [{ header: 'Fling Effect', children: formatText(fling_effect.name) }] : []),
    ...(fling_power ? [{ header: 'Fling Power', children: fling_power }] : []),
  ]

  return (
    <>
      <SectionTitle> Item Data </SectionTitle>
      <Table>
        <tbody>
          {tableData.map(row => (
            <TableRow key={row.header}>
              <TableHeader>
                <span className="text-sm font-normal"> {row.header} </span>
              </TableHeader>
              <TableCell> {row.children} </TableCell>
            </TableRow>
          ))}
        </tbody>
      </Table>
    </>
  )
}
