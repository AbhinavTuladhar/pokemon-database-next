import React, { FC } from 'react'

import { SectionTitle } from '@/components/containers'
import { Table } from '@/components/ui/Table'
import { TransformedSprites } from '@/types'

import { ImageTile } from './ImageTile'
import { TableHeaderWrapper } from './TableWrappers'

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
    <tr className="table-row">
      {finalColumns.map((column, index) => (
        <TableHeaderWrapper key={column + index}>{column}</TableHeaderWrapper>
      ))}
    </tr>
  )

  return (
    <section>
      <SectionTitle> Animated Sprites </SectionTitle>
      <Table useFullWidth={false}>
        <thead>{firstRow}</thead>
        <tbody>
          <tr>
            <td className="border-bd-light dark:border-bd-dark table-cell w-36 border p-2 text-center font-bold">
              Showdown
            </td>
            {ordinarySprites.map((image, index) => (
              <td
                key={(image ?? '') + index}
                className="border-bd-light dark:border-bd-dark table-cell min-w-36 border py-6 text-center"
              >
                <ImageTile imageSource={image} />
              </td>
            ))}
            {femaleFlag
              ? femaleSprites.map((image, index) => (
                  <td
                    key={(image ?? '') + index}
                    className="border-bd-light dark:border-bd-dark table-cell min-w-36 border py-6 text-center"
                  >
                    <ImageTile imageSource={image} />
                  </td>
                ))
              : null}
          </tr>
        </tbody>
      </Table>
    </section>
  )
}
