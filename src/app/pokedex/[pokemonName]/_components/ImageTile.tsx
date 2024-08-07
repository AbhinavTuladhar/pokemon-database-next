'use client'

import { FC, useState } from 'react'
import Image from 'next/image'

interface ImageTileProps {
  defaultSprite: string | null
  shinySprite: string | null
}

export const ImageTile: FC<ImageTileProps> = ({ defaultSprite, shinySprite }) => {
  type PossibleStates = 'normal' | 'shiny'

  const [selectedImage, setSelectedImage] = useState<PossibleStates>('normal')

  // These are for detecting and hence styling the selected and unselected buttons.
  const imageSrc = selectedImage === 'normal' ? defaultSprite : shinySprite
  const selectedButtonStyle =
    'text-white bg-black dark:text-black dark:bg-white w-24 py-0 px-4 rounded-3xl border duration-300'
  const unselectedButtonStyle =
    'text-black bg-white dark:text-white dark:bg-black w-24 py-0 px-4 rounded-3xl border duration-300'

  return (
    <div className="mt-5 flex flex-col">
      <div className="my-2 flex flex-row justify-center gap-x-4">
        <button
          className={selectedImage === 'normal' ? selectedButtonStyle : unselectedButtonStyle}
          onClick={() => setSelectedImage('normal')}
        >
          Normal
        </button>
        <button
          className={selectedImage === 'normal' ? unselectedButtonStyle : selectedButtonStyle}
          onClick={() => setSelectedImage('shiny')}
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
