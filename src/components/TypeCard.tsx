import Link from 'next/link'
import { FC } from 'react'
import typeMapping from '@/utils/typeMapping'

interface TypeCardProps {
  typeName: string
  useTextOnly?: boolean
  className?: string
}

const TypeCard: FC<TypeCardProps> = ({ typeName, useTextOnly, className }) => {
  const typeKey = typeName?.toLowerCase()
  const backgroundColour = 'bg-' + typeMapping[typeKey]
  const targetLink = `/types/${typeName}`

  if (useTextOnly) {
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
      className={`${backgroundColour} ${className} h-9 flex w-16 text-xs flex-col items-center justify-center rounded duration-200 hover:brightness-110`}
    >
      <Link href={targetLink}>{typeName?.toUpperCase()}</Link>
    </div>
  )
}

export default TypeCard
