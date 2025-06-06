import { FC } from 'react'

import { TransitionLink } from '@/components/ui/Link'

import { typeMapping } from '../helpers/type.helper'

interface TypeCardProps {
  typeName: string
  className?: string
  variant?: 'small' | 'big' | 'text'
}

export const TypeCard: FC<TypeCardProps> = ({ typeName, className, variant = 'small' }) => {
  const typeKey = typeName?.toLowerCase()
  const backgroundColour = 'bg-' + typeMapping[typeKey]
  const targetLink = `/type/${typeName}`

  if (variant === 'text') {
    const fontColour = 'text-' + typeMapping[typeKey]
    const properName = typeName.charAt(0).toUpperCase() + typeName.slice(1)
    return (
      <TransitionLink href={targetLink}>
        <span className={`${fontColour} w-min hover:underline`}>{properName}</span>
      </TransitionLink>
    )
  }
  return (
    <TransitionLink
      className="text-shadow text-white shadow-black/70"
      href={targetLink}
      nonTextFlag
    >
      <div
        className={`${backgroundColour} ${className} ${variant === 'big' ? 'h-9' : 'h-[27px]'} flex w-16 max-w-16 min-w-16 flex-col items-center justify-center rounded-sm text-xs transition-all duration-200 hover:brightness-105`}
      >
        {typeName?.toUpperCase()}
      </div>
    </TransitionLink>
  )
}

interface MinCardProps {
  typeName: string
}

export const MiniTypeCard: React.FC<MinCardProps> = ({ typeName }) => {
  // This background colour is for the type NAME.
  const backgroundColourType = `bg-${typeMapping[typeName]}`

  return (
    <TransitionLink className="text-shadow shadow-black/70" href={`/type/${typeName}`} nonTextFlag>
      <div
        className={`${backgroundColourType} flex h-[36px] w-[36px] items-center justify-center rounded-sm text-xs tracking-tight text-white duration-300 hover:brightness-125`}
      >
        {typeName.slice(0, 3).toUpperCase()}
      </div>
    </TransitionLink>
  )
}
