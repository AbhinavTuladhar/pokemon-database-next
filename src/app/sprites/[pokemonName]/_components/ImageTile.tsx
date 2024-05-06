import React, { FC } from 'react'
import Image from 'next/image'

import formatName from '@/utils/formatName'

interface TileProps {
  imageSource: string | null
  caption?: string
}

export const ImageTile: FC<TileProps> = ({ caption, imageSource }) => {
  if (!imageSource) {
    return null
  }

  return (
    <div className="flex flex-col gap-y-2">
      <Image src={imageSource} alt={caption || 'sprite'} width={120} height={120} />
      {caption ? <span className="text-sm">{formatName(caption)}</span> : null}
    </div>
  )
}
