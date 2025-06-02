import React, { FC } from 'react'
import Image from 'next/image'

import { TransitionLink } from '@/components/ui/Link'
import { formatName } from '@/utils/string.utils'

interface CardProps {
  pokemonName: string
  id: number
}

export const InfoCard: FC<CardProps> = ({ pokemonName, id }) => {
  const imageSource = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-vii/ultra-sun-ultra-moon/${id}.png`
  return (
    <TransitionLink
      className="group flex flex-col items-center justify-center gap-y-0.5"
      nonTextFlag
      href={`/sprites/${pokemonName}`}
    >
      <Image
        src={imageSource}
        height={0}
        width={0}
        alt={pokemonName}
        style={{ width: '60px', height: '60px' }}
      />
      <span className="text-center text-xs group-hover:underline">{formatName(pokemonName)}</span>
    </TransitionLink>
  )
}
