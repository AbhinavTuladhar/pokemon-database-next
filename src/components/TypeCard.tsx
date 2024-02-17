import Link from 'next/link'
import { FC } from 'react'
import typeMapping from '@/utils/typeMapping'

interface TypeCardProps {
  typeName: string
  className?: string
  variant?: 'small' | 'big' | 'text'
}

const TypeCard: FC<TypeCardProps> = ({ typeName, className, variant = 'small' }) => {
  const typeKey = typeName?.toLowerCase()
  const backgroundColour = 'bg-' + typeMapping[typeKey]
  const targetLink = `/types/${typeName}`

  if (variant === 'text') {
    const fontColour = 'text-' + typeMapping[typeKey]
    const properName = typeName.charAt(0).toUpperCase() + typeName.slice(1)
    return (
      <span className={`${fontColour} w-min hover:underline`}>
        <Link href={targetLink}>{properName}</Link>
      </span>
    )
  }
  return (
    <div
      className={`${backgroundColour} ${className} ${variant === 'big' ? 'h-9' : 'h-[27px]'} flex w-16 text-xs flex-col items-center justify-center rounded duration-200 hover:brightness-110`}
    >
      <Link className="text-shadow shadow-black/70" href={targetLink}>
        {typeName?.toUpperCase()}
      </Link>
    </div>
  )
}

export default TypeCard
