import React, { FC } from 'react'

import { PageTitle } from '@/components/containers'
import formatName from '@/utils/formatName'

interface SpritePageProps {
  params: {
    pokemonName: string
  }
}

const SpritePage: FC<SpritePageProps> = ({ params: { pokemonName } }) => {
  return (
    <main>
      <PageTitle>{formatName(pokemonName)} Sprites</PageTitle>
    </main>
  )
}

export default SpritePage
