import React, { FC } from 'react'
import classNames from 'classnames'

import { SectionTitle } from '@/components/containers'
import { Table, TableCell, TableHeader, TableRow } from '@/components/ui/Table'
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
    {
      header: 'Firmness',
      children: formatName(firmness),
      tooltip: 'The firmness of this berry, used in making Pokéblocks or Poffins.',
    },
    {
      header: 'Growth Time',
      children: growthTime,
      tooltip:
        'Time it takes the tree to grow one stage, in hours. Berry trees go through four of these growth stages before they can be picked.',
    },
    {
      header: 'Max Harvest',
      children: maxHarvest,
      tooltip: 'The maximum number of these berries that can grow on one tree in Generation IV.',
    },
    { header: 'Size', children: `${size / 10} cm` },
    {
      header: 'Smoothness',
      children: smoothness,
      tooltip: 'The smoothness of this Berry, used in making Pokéblocks or Poffins.',
    },
    {
      header: 'Soil Dryness',
      children: soilDryness,
      tooltip:
        'The speed at which this Berry dries out the soil as it grows. A higher rate means the soil dries more quickly.',
    },
  ]

  return (
    <section>
      <SectionTitle> Berry Information </SectionTitle>
      <Table>
        <tbody>
          {tableData.map((row, rowIndex) => (
            <TableRow key={row.header + rowIndex}>
              <TableHeader>
                <span
                  data-tooltip-id="my-tooltip"
                  data-tooltip-content={row?.tooltip}
                  className={classNames('text-sm font-normal', {
                    'cursor-help': row?.tooltip,
                  })}
                >
                  {row.header}
                </span>
              </TableHeader>
              <TableCell> {row.children} </TableCell>
            </TableRow>
          ))}
        </tbody>
      </Table>
    </section>
  )
}

export default BerryData
