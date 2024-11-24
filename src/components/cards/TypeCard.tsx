import { FC } from 'react'
import { Link } from 'next-view-transitions'

import typeMapping from '@/utils/typeMapping'

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
      <Link href={targetLink}>
        <span className={`${fontColour} w-min hover:underline`}>{properName}</span>
      </Link>
    )
  }
  return (
    <Link className="text-white shadow-black/70 text-shadow" href={targetLink}>
      <div
        className={`${backgroundColour} ${className} ${variant === 'big' ? 'h-9' : 'h-[27px]'} flex w-16 min-w-16 max-w-16 flex-col items-center justify-center rounded text-xs transition-all duration-200 hover:brightness-105`}
      >
        {typeName?.toUpperCase()}
      </div>
    </Link>
  )
}
