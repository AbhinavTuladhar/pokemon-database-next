import React, { FC } from 'react'

import { SectionTitle } from '@/components/containers'
import BlueLink from '@/components/link'
import { SpriteTable } from '@/components/sprite-table'
import { GenerationSprite } from '@/types'
import formatName from '@/utils/formatName'

interface SpriteSectionProps {
  pokemonName: string
  spriteCollection: Array<GenerationSprite>
}

export const SpriteSection: FC<SpriteSectionProps> = ({ pokemonName, spriteCollection }) => {
  return (
    <>
      <SectionTitle> {formatName(pokemonName)} Sprites </SectionTitle>
      <SpriteTable spriteCollection={spriteCollection} />
      <div>
        <BlueLink boldFlag href={`/sprites/${pokemonName}/`}>
          &gt; View all {formatName(pokemonName)} sprites
        </BlueLink>
      </div>
    </>
  )
}
