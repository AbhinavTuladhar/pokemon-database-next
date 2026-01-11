import { FC } from 'react'

import { TransitionLink } from '@/components/ui/Link'

import { typeMapping } from '../helpers/type.helper'

interface TypeCardProps {
  typeName: string
  className?: string
  variant?: 'small' | 'big' | 'text'
  isLink?: boolean
}

interface BaseTypeCardProps {
  backgroundColour: string
  typeName: string
  variant?: TypeCardProps['variant']
  className?: string
}

const BaseTypeCard: FC<BaseTypeCardProps> = ({
  backgroundColour,
  typeName,
  className,
  variant = 'small',
}) => (
  <div
    className={`${backgroundColour} ${className} ${variant === 'big' ? 'h-9' : 'h-[27px]'} text-shadow flex w-16 max-w-16 min-w-16 flex-col items-center justify-center rounded-sm text-xs text-white shadow-black/70 transition-all duration-200 hover:brightness-105`}
  >
    {typeName.toUpperCase()}
  </div>
)

export const TypeCard: FC<TypeCardProps> = ({
  typeName,
  className,
  variant = 'small',
  isLink = true,
}) => {
  const typeKey = typeName?.toLowerCase()
  const backgroundColour = 'bg-' + typeMapping[typeKey]
  const targetLink = `/type/${typeName}`

  if (variant === 'text') {
    const fontColour = 'text-' + typeMapping[typeKey]
    const properName = typeName.charAt(0).toUpperCase() + typeName.slice(1)

    // nonTextFlag is for disabling the fancy unfolding underline animation on hover, replacing it with a simple underline
    return (
      <TransitionLink href={targetLink} nonTextFlag>
        <span className={`${fontColour} w-min hover:underline`}>{properName}</span>
      </TransitionLink>
    )
  }

  return (
    <>
      {isLink ? (
        <TransitionLink href={targetLink} nonTextFlag>
          <BaseTypeCard
            backgroundColour={backgroundColour}
            typeName={typeName}
            variant={variant}
            className={className}
          />
        </TransitionLink>
      ) : (
        <BaseTypeCard
          backgroundColour={backgroundColour}
          typeName={typeName}
          variant={variant}
          className={className}
        />
      )}
    </>
  )
}

interface MinCardProps {
  typeName: string
}

export const MiniTypeCard: React.FC<MinCardProps> = ({ typeName }) => {
  // This background colour is for the type NAME.
  const backgroundColourType = `bg-${typeMapping[typeName]}`

  return (
    <TransitionLink href={`/type/${typeName}`} nonTextFlag>
      <div
        className={`${backgroundColourType} text-shadow flex h-9 w-9 items-center justify-center rounded-sm text-xs tracking-tight text-white shadow-black/70 duration-300 hover:brightness-125`}
      >
        {typeName.slice(0, 3).toUpperCase()}
      </div>
    </TransitionLink>
  )
}
