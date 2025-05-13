import { FC } from 'react'
import Image from 'next/image'
import { Link } from 'next-view-transitions'

import { BlueLink } from '@/components/ui/Link'
import { TypeCard } from '@/features/pokemon/components/TypeCard'
import { PokemonType } from '@/types'
import formatName from '@/utils/formatName'
import typeMapping from '@/utils/typeMapping'

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

  // When the user clicks on the Pokemon name, they are brought to the detail page.
  const targetLink = `/pokedex/${name}`

  // Apply a background gardient to the card depending on the types.
  const [firstType, secondType] = typeList || []
  const [firstColour, secondColour] = [typeMapping[firstType], typeMapping[secondType]]
  const startingColour = `from-${firstColour}`

  // Now do some complicated shenanigans to use a one-step darker shade as the stopping colour for mono-type pokemon
  const endingColour = secondType === undefined ? darkenColour(firstColour) : `to-${secondColour}`
  const gradientStyle = `bg-linear-to-tr from-10% to-90% ${startingColour} ${endingColour}`

  // For accessibility purposes
  const linkTitle = `View details about ${properName}`

  return (
    <div
      className={`${gradientStyle} relative flex w-48 flex-col items-center justify-center rounded-xl p-2 text-white duration-200 hover:scale-105 hover:shadow-xl hover:shadow-gray-400 hover:drop-shadow-lg sm:w-56 dark:hover:shadow-gray-600`}
    >
      <Link
        href={targetLink}
        className="absolute inset-0"
        aria-label={linkTitle}
        title={linkTitle}
      />
      <div className="font-bold">#{id}</div>
      <span className="text-center text-xl font-extrabold">{properName}</span>
      <div>
        {defaultSprite && <Image src={defaultSprite} height={100} width={100} alt={name} />}
      </div>
      <div className="z-10 mt-4 mb-2 flex flex-row gap-x-2">
        {typeList.map((type, index) => {
          return (
            <div className="shadow-sm shadow-black/20" key={type + index}>
              <TypeCard typeName={type} variant="big" />
            </div>
          )
        })}
      </div>
    </div>
  )
}

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

interface EvolutionCardProps {
  homeSprite: string | null
  name: string
  id: number
  types: Array<PokemonType>
  splitEvoFlag: boolean
}

export const EvolutionPokemonCard: FC<EvolutionCardProps> = ({
  homeSprite,
  name,
  id,
  types,
  splitEvoFlag,
}) => {
  const typeDiv = types.map((type, index) => {
    const typeName = type.type.name
    return (
      <span key={typeName + index}>
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
