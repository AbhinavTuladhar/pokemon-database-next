import { FC } from 'react'
import Image from 'next/image'
import TypeCard from './TypeCard'
import formatName from '@/utils/formatName'
import { PokemonType } from '@/types'
import BlueLink from './BlueLink'

interface MiniCardProps {
  name: string
  id: number
  gameSprite: string | null
  types: Array<PokemonType>
  nationalNumber: number
}

const MiniPokeCard: FC<MiniCardProps> = ({ name, id, gameSprite, types, nationalNumber }) => {
  const properId = `${'00' + nationalNumber}`.slice(-3)

  if (gameSprite === null || id >= 10157) return

  const typeDiv = types.map((type, index) => {
    const typeName = type.type.name
    return (
      <div key={index}>
        <TypeCard typeName={typeName} variant="text" />
        {index !== types.length - 1 && <span>&nbsp;·&nbsp;</span>}
      </div>
    )
  })

  return (
    <article className="flex w-full">
      <Image src={gameSprite} width={60} height={56} alt={name} />
      <div className="flex flex-col justify-start items-start">
        <BlueLink href={`/pokemon/${name}`} boldFlag={true}>
          {formatName(name)}
        </BlueLink>
        <span className="text-sm inline-flex">
          {`#${properId}`} / &nbsp;{typeDiv}{' '}
        </span>
      </div>
    </article>
  )
}

export default MiniPokeCard
