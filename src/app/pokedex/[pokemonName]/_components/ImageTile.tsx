'use client'

import { FC, useState } from 'react'
import Image from 'next/image'

interface ImageTileProps {
  defaultSprite: string | null
  shinySprite: string | null
}

const ImageTile: FC<ImageTileProps> = ({ defaultSprite, shinySprite }) => {
  type PossibleStates = 'normal' | 'shiny'

  const [selectedImage, setSelectedImage] = useState<PossibleStates>('normal')

  // These are for detecting and hence styling the selected and unselected buttons.
  const imageSrc = selectedImage === 'normal' ? defaultSprite : shinySprite
  const selectedButtonStyle = 'text-black bg-white w-24 py-0 px-4 rounded-3xl border duration-300'
  const unselectedButtonStyle = 'text-white bg-black w-24 py-0 px-4 rounded-3xl border duration-300'

  // For toggling between normal and shiny versions.
  const handleClick = () => {
    setSelectedImage(prevStatus => {
      return prevStatus === 'normal' ? 'shiny' : 'normal'
    })
  }

  return (
    <div className="mt-5 flex flex-col">
      <div className="my-2 flex flex-row justify-center gap-x-4">
        <button
          className={selectedImage === 'normal' ? selectedButtonStyle : unselectedButtonStyle}
          onClick={handleClick}
        >
          Normal
        </button>
        <button
          className={selectedImage === 'normal' ? unselectedButtonStyle : selectedButtonStyle}
          onClick={handleClick}
        >
          Shiny
        </button>
      </div>
      <div className="flex flex-row justify-center">
        {imageSrc && (
          <Image
            src={imageSrc}
            height={400}
            width={300}
            alt={'pokemon'}
            style={{ width: 'auto' }}
          />
        )}
      </div>
    </div>
  )
}

export default ImageTile
