import { FC } from 'react'

import { GenerationSprite } from '@/types'

import SpriteTableColumn from './SpriteTableColumn'

interface SpriteTableProps {
  spriteCollection: Array<GenerationSprite>
}

export const SpriteTable: FC<SpriteTableProps> = ({ spriteCollection }) => {
  /* 
  Get only those objects which don't have two null values for the sprite Url
  Generation 1 has no shiny sprite, hence the threshold.
  Sprites for the generation below the generation the pokemon was introduced in are ommitted.
  Gen 6+ pokemon have gen 5-like sprites, as stated in the documentation.
  */
  const properSpriteCollection = spriteCollection.filter(obj => {
    const nullUndefinedCount = Object.values(obj).filter(
      value => value === null || value === undefined,
    ).length
    return nullUndefinedCount <= 1
  })

  return (
    <div className="flex justify-center">
      <div className="overflow-x-auto">
        <div className="inline-flex">
          <SpriteTableColumn title="Type" columnIndex={0} images={['', '']} />
          {properSpriteCollection.map((data, index) => (
            <SpriteTableColumn
              columnIndex={index + 1}
              images={[data.frontSprite, data.shinySprite]}
              title={data.generation}
              key={data.generation + index}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
