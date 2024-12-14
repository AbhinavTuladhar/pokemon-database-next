'use client'

import React, { FC, useState } from 'react'

import ArtworkImage from './ArtworkImage'
import ImageSwitcher from './ImageSwitcher'

interface ArtworkProps {
  pokemonName: string
  defaultSprite: string | null
  shinySprite: string | null
}
type PossibleStates = 'normal' | 'shiny'

export const PokemonArtwork: FC<ArtworkProps> = ({ defaultSprite, shinySprite, pokemonName }) => {
  const [selectedImage, setSelectedImage] = useState<PossibleStates>('normal')

  return (
    <div className="mt-5 flex flex-col">
      <div className="my-2 flex flex-row justify-center gap-x-4">
        <ImageSwitcher
          isSelected={selectedImage === 'normal'}
          onClick={() => setSelectedImage('normal')}
          text="Normal"
        />
        <ImageSwitcher
          isSelected={selectedImage === 'shiny'}
          onClick={() => setSelectedImage('shiny')}
          text="Shiny"
        />
      </div>
      {/* Overlap the empty div and the two images in the same area
      - prevent layout shift when the image loads
      - load both images at once to prevent loading upon state change */}
      <div className="grid justify-center pt-4">
        <div className="col-start-1 row-start-1 h-[400px] w-[300px]" />
        <ArtworkImage
          src={defaultSprite}
          alt={`Default sprite for ${pokemonName}`}
          isVisible={selectedImage === 'normal'}
        />
        <ArtworkImage
          src={shinySprite}
          alt={`Shiny sprite for ${pokemonName}`}
          isVisible={selectedImage === 'shiny'}
        />
      </div>
    </div>
  )
}
