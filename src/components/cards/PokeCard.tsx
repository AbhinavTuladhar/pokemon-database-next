import { FC } from 'react'
import Image from 'next/image'
import { Link } from 'next-view-transitions'

import { PokemonType } from '@/types'
import formatName from '@/utils/formatName'

import typeMapping from '../../utils/typeMapping'

import { TypeCard } from './TypeCard'

const darkenColour = (colour: string) => {
  const colourName = colour.slice(0, -3)
  const colourShade = parseInt(colour.slice(-3))
  const darkerShade = colourShade + 200
  const finalShade = darkerShade > 950 ? 950 : darkerShade
  const finalColour = `to-${colourName}${finalShade}`
  return finalColour
}

interface PokeCardProps {
  id: number
  name: string
  types: Array<PokemonType>
  defaultSprite: string | null
}

export const PokeCard: FC<PokeCardProps> = ({ id, name, defaultSprite, types }) => {
  // For capitalising the first letter.
  const properName = formatName(name)

  // Get a list of all the types of the Pokemon.
  let typeList = types?.map(type => {
    return type.type.name
  })

  // Now map each type to its corresponding type card.
  const typeDivs = typeList.map((type, index) => {
    return (
      <div className="shadow shadow-black/20" key={type + index}>
        <TypeCard typeName={type} variant="big" />
      </div>
    )
  })

  // When the user clicks on the Pokemon name, they are brought to the detail page.
  const targetLink = `/pokedex/${name}`

  // Apply a background gardient to the card depending on the types.
  const [firstType, secondType] = typeList || []
  const [firstColour, secondColour] = [typeMapping[firstType], typeMapping[secondType]]
  const startingColour = `from-${firstColour}`

  // Now do some complicated shenanigans to use a one-step darker shade as the stopping colour for mono-type pokemon
  const endingColour = secondType === undefined ? darkenColour(firstColour) : `to-${secondColour}`
  const gradientStyle = `bg-gradient-to-tr from-10% to-90% ${startingColour} ${endingColour}`

  return (
    <Link
      href={targetLink}
      className={`${gradientStyle} flex w-48 flex-col items-center justify-center rounded-xl p-2 text-white duration-200 hover:scale-105 hover:shadow-xl hover:shadow-blue-400 hover:drop-shadow-lg sm:w-56`}
    >
      <div className="font-bold">#{id}</div>
      <span className="text-center text-xl font-extrabold">{properName}</span>
      <div>
        {defaultSprite && <Image src={defaultSprite} height={100} width={100} alt={name} />}
      </div>
      <div className="mb-2 mt-4 flex flex-row gap-x-2">{typeDivs}</div>
    </Link>
  )
}
