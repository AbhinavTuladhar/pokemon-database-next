import React, { FC } from 'react'
import Image from 'next/image'

interface ArtworkProps {
  caption: string
  src: string | null
  alt: string
}

const ArtworkImage: FC<ArtworkProps> = ({ caption, src, alt }) => {
  if (!src) {
    return null
  }
  return (
    <div className="flex flex-col items-center justify-center gap-y-1">
      <Image src={src} alt={alt} width={0} height={0} style={{ width: '280px' }} />
      <span>{caption}</span>
    </div>
  )
}

export default ArtworkImage
