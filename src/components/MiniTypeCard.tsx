import React from 'react'
import Link from 'next/link'
import typeMapping from '@/utils/typeMapping'

interface CardProps {
  typeName: string
}

const MiniTypeCard: React.FC<CardProps> = ({ typeName }) => {
  // This background colour is for the type NAME.
  const backgroundColourType = `bg-${typeMapping[typeName]}`

  return (
    <div
      className={`${backgroundColourType} flex h-[36px] w-[36px] items-center justify-center rounded text-xs tracking-tight duration-300 hover:brightness-125`}
    >
      <Link className="text-shadow shadow-black/70" href={`/types/${typeName}`}>
        {typeName.slice(0, 3).toUpperCase()}
      </Link>
    </div>
  )
}

export default MiniTypeCard
