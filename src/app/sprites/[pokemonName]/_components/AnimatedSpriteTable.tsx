import React, { FC } from 'react'

import { SectionTitle, TableContainer } from '@/components/containers'
import { TransformedSprites } from '@/types'

import { ImageTile } from './ImageTile'

interface AnimatedSpriteProps {
  imageData: Pick<TransformedSprites, 'otherSprites'>['otherSprites']['showdownSprites']
}

export const AnimatedSpriteTable: FC<AnimatedSpriteProps> = ({ imageData }) => {
  const {
    showdownFrontDefault,
    showdownFrontShiny,
    showdownBackDefault,
    showdownBackShiny,
    showdownFrontFemale,
    showdownFrontShinyFemale,
    showdownBackFemale,
    showdownBackShinyFemale,
  } = imageData

  const baseColumnNames = ['', 'Normal', 'Shiny', 'Back', 'Back, shiny']
  const extraColumnNames = ['Normal (♀)', 'Shiny (♀)', 'Back (♀)', 'Back, shiny, (♀)']

  const ordinarySprites = [
    showdownFrontDefault,
    showdownFrontShiny,
    showdownBackDefault,
    showdownBackShiny,
  ]

  const femaleSprites = [
    showdownFrontFemale,
    showdownFrontShinyFemale,
    showdownBackFemale,
    showdownBackShinyFemale,
  ]

  // Check if there are viable female sprites
  const femaleFlag = femaleSprites.some(image => image !== null)

  const finalColumns = femaleFlag ? [...baseColumnNames, ...extraColumnNames] : baseColumnNames

  const firstRow = (
    <tr>
      {finalColumns.map((column, index) => (
        <td
          key={index}
          className="table-cell border border-table-border bg-table-header py-2 pr-4 text-center font-bold"
        >
          {column}
        </td>
      ))}
    </tr>
  )

  return (
    <section>
      <SectionTitle> Animated Sprites </SectionTitle>
      <TableContainer>
        <thead>{firstRow}</thead>
        <tbody>
          <tr>
            <td className="table-cell w-36 border border-table-border p-2 text-center font-bold">
              Showdown
            </td>
            {ordinarySprites.map((image, index) => (
              <td
                key={index}
                className="table-cell min-w-36 border border-table-border py-6 text-center"
              >
                <ImageTile imageSource={image} />
              </td>
            ))}
            {femaleFlag
              ? femaleSprites.map((image, index) => (
                  <td
                    key={index}
                    className="table-cell min-w-36 border border-table-border py-6 text-center"
                  >
                    <ImageTile imageSource={image} />
                  </td>
                ))
              : null}
          </tr>
        </tbody>
      </TableContainer>
    </section>
  )
}
