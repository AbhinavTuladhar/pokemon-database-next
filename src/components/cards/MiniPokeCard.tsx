import { FC } from 'react'
import Image from 'next/image'

import { PokemonType } from '@/types'
import formatName from '@/utils/formatName'

import BlueLink from '../link'

import { TypeCard } from './TypeCard'

interface MiniCardProps {
  name: string
  id: number
  gameSprite: string | null
  types: Array<PokemonType>
  nationalNumber: number
}

export const MiniPokeCard: FC<MiniCardProps> = ({
  name,
  id,
  gameSprite,
  types,
  nationalNumber,
}) => {
  const properId = `${'00' + nationalNumber}`.slice(-3)

  if (gameSprite === null || id >= 10157) return

  const typeDiv = types.map((type, index) => {
    const typeName = type.type.name
    return (
      <div key={typeName + index}>
        <TypeCard typeName={typeName} variant="text" />
        {index !== types.length - 1 && <span>&nbsp;·&nbsp;</span>}
      </div>
    )
  })

  return (
    <article className="flex w-full gap-x-1">
      <Image src={gameSprite} width={64} height={64} alt={name} />
      <div className="flex flex-col items-start justify-start">
        <BlueLink href={`/pokedex/${name}`} boldFlag={true}>
          {formatName(name)}
        </BlueLink>
        <span className="inline-flex text-sm">
          {`#${properId}`} / &nbsp;{typeDiv}{' '}
        </span>
      </div>
    </article>
  )
}
