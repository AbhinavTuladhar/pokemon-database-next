import React, { FC } from 'react'
import Image, { ImageProps } from 'next/image'
import classNames from 'classnames'

interface ArtworkImageProps extends Omit<ImageProps, 'src'> {
  isVisible: boolean
  src: string | null
}

const ArtworkImage: FC<ArtworkImageProps> = ({ isVisible, src, ...props }) => {
  if (!src) return

  return (
    <Image
      {...props}
      src={src}
      height={400}
      width={300}
      alt="pokemon"
      style={{ width: 'auto' }}
      className={classNames('col-start-1 row-start-1', {
        visible: isVisible,
        invisible: !isVisible,
      })}
    />
  )
}

export default ArtworkImage
