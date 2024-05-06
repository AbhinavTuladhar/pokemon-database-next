import React, { FC } from 'react'
import Image from 'next/image'

interface TileProps {
  imageSource: string | null
}

export const ImageTile: FC<TileProps> = ({ imageSource }) => {
  if (!imageSource) {
    return null
  }

  return (
    <div className="grid place-items-center gap-y-2">
      <Image
        src={imageSource}
        alt={'sprite'}
        width={120}
        height={120}
        className="object-contain"
        style={{ width: '120px', height: 'auto' }}
      />
    </div>
  )
}
