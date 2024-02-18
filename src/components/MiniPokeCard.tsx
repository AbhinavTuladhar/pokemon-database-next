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
        {index !== types.length - 1 && <span> &nbsp; · &nbsp; </span>}
      </div>
    )
  })

  return (
    <article className="flex w-full py-4">
      <Image src={gameSprite} width={75} height={45} alt={name} />
      <div className="flex flex-col">
        <div>
          <BlueLink href={`/pokemon/${name}`} boldFlag={true}>
            {formatName(name)}
          </BlueLink>
        </div>
        <div className="flex">
          {`#${properId}`} / &nbsp;{typeDiv}{' '}
        </div>
      </div>
    </article>
  )
}

export default MiniPokeCard
