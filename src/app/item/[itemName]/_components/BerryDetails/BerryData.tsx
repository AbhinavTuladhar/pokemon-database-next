import React, { FC } from 'react'

import {
  SectionTitle,
  TableCell,
  TableCellHeader,
  TableContainer,
  TableRow,
} from '@/components/containers'
import formatName from '@/utils/formatName'

interface BerryDataProps {
  firmness: string
  growthTime: number
  maxHarvest: number
  size: number
  smoothness: number
  soilDryness: number
}

const BerryData: FC<BerryDataProps> = ({
  firmness,
  growthTime,
  maxHarvest,
  size,
  smoothness,
  soilDryness,
}) => {
  const tableData = [
    { header: 'Firmness', children: formatName(firmness) },
    { header: 'Growth Time', children: growthTime },
    { header: 'Max Harvest', children: maxHarvest },
    { header: 'Size', children: `${size / 10} cm` },
    { header: 'Smoothness', children: smoothness },
    { header: 'Soil Dryness', children: soilDryness },
  ]

  return (
    <section>
      <SectionTitle> Berry Information </SectionTitle>
      <TableContainer>
        <tbody>
          {tableData.map((row, rowIndex) => (
            <TableRow key={row.header + rowIndex}>
              <TableCellHeader>
                <span className="text-sm font-normal"> {row.header} </span>
              </TableCellHeader>
              <TableCell> {row.children} </TableCell>
            </TableRow>
          ))}
        </tbody>
      </TableContainer>
    </section>
  )
}

export default BerryData
