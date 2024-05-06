import React, { FC } from 'react'

import { SectionTitle, TableContainer } from '@/components/containers'

import { SpriteTableHeader } from './SpriteTableHeader'
import { SpriteTableRow } from './SpriteTableRow'

interface SectionProps {
  generation: number
  columnNames: Array<string>
  rowNames: Array<string>
}

export const GenerationSection: FC<SectionProps> = ({ generation, columnNames, rowNames }) => {
  return (
    <section>
      <SectionTitle> Generation {generation} </SectionTitle>
      <TableContainer>
        <SpriteTableHeader key={generation} columns={columnNames} />
        {rowNames.map((rowName, index) => (
          <SpriteTableRow key={index} rowHeader={rowName} />
        ))}
      </TableContainer>
    </section>
  )
}
