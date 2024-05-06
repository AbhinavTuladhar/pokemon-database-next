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
  extraColumns: Array<string>
}

// For checking whether any object in an array has a non-null value, provided that the key has the word 'Female' in it.
const hasNonNullFemaleKey = (data: Record<string, string | null>[]): boolean => {
  return data.some(item => {
    return Object.keys(item).some(key => key.includes('Female') && item[key] !== null)
  })
}

export const GenerationSection: FC<SectionProps> = ({
  generation,
  columnNames,
  rowNames,
  imageData,
  extraColumns,
}) => {
  // Get the sprite object of the current generation.
  const generationSprites = Object.values(imageData)[generation]

  // Get the sprite objects of the current generation - the object for each game sprite.
  const gameSprites = Object.values(generationSprites)

  // Skip rendering if there is no image data for that generation.
  const allKeysNull = gameSprites.every(obj => Object.values(obj).every(value => value === null))

  // Check if any sprite object in the gameSprites array has a non-null value in the 'Female' key.
  const femaleFlag = hasNonNullFemaleKey(gameSprites)

  if (allKeysNull) {
    return null
  }

  return (
    <section>
      <SectionTitle> Generation {generation} </SectionTitle>
      <TableContainer>
        <SpriteTableHeader
          key={generation}
          columns={columnNames}
          femaleFlag={femaleFlag}
          extraColumns={extraColumns}
        />
        {rowNames.map((rowName, index) => (
          <SpriteTableRow key={index} rowHeader={rowName} imageStrings={gameSprites[index]} />
        ))}
      </TableContainer>
    </section>
  )
}
