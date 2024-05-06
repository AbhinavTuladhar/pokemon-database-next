import React, { FC } from 'react'

import { SectionTitle, TableContainer } from '@/components/containers'
import { SpriteDataType } from '@/types'

import { SpriteTableHeader } from './SpriteTableHeader'
import { SpriteTableRow } from './SpriteTableRow'

interface SpriteType {
  [key: string]: {
    [key: string]: string | null
  }
}

interface SectionProps {
  generation: number
  columnNames: Array<string>
  rowNames: Array<string>
  imageData: SpriteDataType
  keyName: string
}

export const GenerationSection: FC<SectionProps> = ({
  generation,
  columnNames,
  rowNames,
  imageData,
  keyName,
}) => {
  // Get the sprite object of the current generation.
  const generationSprites = Object.values(imageData)[generation]

  // Get the sprite objects of the current generation - the object for each game sprite.
  const gameSprites = Object.values(generationSprites)

  return (
    <section>
      <SectionTitle> Generation {generation} </SectionTitle>
      <TableContainer>
        <SpriteTableHeader key={generation} columns={columnNames} />
        {rowNames.map((rowName, index) => (
          <SpriteTableRow key={index} rowHeader={rowName} imageStrings={gameSprites[index]} />
        ))}
      </TableContainer>
    </section>
  )
}
