import React, { FC } from 'react'

import { SpriteTable } from '@/components/sprite-table'
import { TransitionLink } from '@/components/ui/Link'
import { SectionTitle } from '@/components/ui/Title'
import { GenerationSprite } from '@/types'
import { formatName } from '@/utils/string.utils'

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
        <TransitionLink boldFlag href={`/sprites/${pokemonName}/`}>
          &gt; View all {formatName(pokemonName)} sprites
        </TransitionLink>
      </div>
    </>
  )
}
