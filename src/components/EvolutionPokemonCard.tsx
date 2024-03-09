import { FC } from 'react'
import Image from 'next/image'

import BlueLink from '@/components/BlueLink'
import TypeCard from '@/components/TypeCard'
import { PokemonType } from '@/types'
import formatName from '@/utils/formatName'

interface CardProps {
  homeSprite: string | null
  name: string
  id: number
  types: Array<PokemonType>
  splitEvoFlag: boolean
}

const EvolutionPokemonCard: FC<CardProps> = ({ homeSprite, name, id, types, splitEvoFlag }) => {
  const typeDiv = types.map((type, index) => {
    const typeName = type.type.name
    return (
      <span key={index}>
        <TypeCard typeName={typeName} variant="text" />
        {index !== types.length - 1 && <span> · </span>}
      </span>
    )
  })

  // For the identifying number
  const formattedId = `#${('00' + id).slice(-3)}`

  return (
    <div
      className={`flex ${splitEvoFlag ? 'flex-col' : 'flex-row sm:flex-row md:flex-col'} mx-auto w-fit items-center justify-center gap-y-2`}
    >
      {homeSprite && <Image src={homeSprite} alt={name} width={128} height={128} />}
      <div className="flex w-full flex-col items-center justify-center">
        {formattedId}
        <BlueLink href={`/pokedex/${name}`}>{formatName(name)}</BlueLink>
        <span className="text-center">{typeDiv}</span>
      </div>
    </div>
  )
}

export default EvolutionPokemonCard
