import React, { FC } from 'react'

import { SectionTitle, TableContainer } from '@/components/containers'
import { SpriteDataType } from '@/types'

import { SpriteTableHeader } from './SpriteTableHeader'
import { SpriteTableRow } from './SpriteTableRow'

interface SectionProps {
  generation: number
  columnNames: Array<string>
  rowNames: Array<string>
  imageData: SpriteDataType
}

export const GenerationSection: FC<SectionProps> = ({
  generation,
  columnNames,
  rowNames,
  imageData,
}) => {
  // Get the sprite object of the current generation.
  const generationSprites = Object.values(imageData)[generation]

  // Get the sprite objects of the current generation - the object for each game sprite.
  const gameSprites = Object.values(generationSprites)

  // Skip rendering if there is no image data for that generation.
  const allKeysNull = gameSprites.every(obj => Object.values(obj).every(value => value === null))

  if (allKeysNull) {
    return null
  }

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
