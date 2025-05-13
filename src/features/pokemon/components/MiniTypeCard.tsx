import React from 'react'
import { Link } from 'next-view-transitions'

import typeMapping from '@/utils/typeMapping'

interface CardProps {
  typeName: string
}

export const MiniTypeCard: React.FC<CardProps> = ({ typeName }) => {
  // This background colour is for the type NAME.
  const backgroundColourType = `bg-${typeMapping[typeName]}`

  return (
    <Link className="text-shadow shadow-black/70" href={`/type/${typeName}`}>
      <div
        className={`${backgroundColourType} flex h-[36px] w-[36px] items-center justify-center rounded-sm text-xs tracking-tight text-white duration-300 hover:brightness-125`}
      >
        {typeName.slice(0, 3).toUpperCase()}
      </div>
    </Link>
  )
}
