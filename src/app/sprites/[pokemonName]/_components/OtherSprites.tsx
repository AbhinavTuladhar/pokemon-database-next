import React, { FC, ReactNode } from 'react'

import { SectionTitle } from '@/components/ui/Title'
import { TransformedSprites } from '@/types'

import ArtworkImage from './ArtworkImage'

interface SectionWrapperProps {
  children: ReactNode
}

const SectionWrapper: FC<SectionWrapperProps> = ({ children }) => (
  <div className="flex flex-wrap items-center justify-center gap-x-8">{children}</div>
)

interface TileProps {
  imageData: Pick<TransformedSprites, 'otherSprites'>
}

export const OtherSprites: FC<TileProps> = ({ imageData }) => {
  const {
    otherSprites: {
      dreamWorldSprites: { dreamWorldFrontDefault, dreamWorldFrontFemale },
      homeSprites: { homeFrontDefault, homeFrontFemale, homeFrontShiny, homeFrontShinyFemale },
      officialArtworkSprites: { officialArtworkFrontDefault, officialArtworkFrontShiny },
    },
  } = imageData

  const officialArtworkSection = (
    <section>
      <SectionTitle> Official Artwork </SectionTitle>
      <SectionWrapper>
        <ArtworkImage
          src={officialArtworkFrontDefault}
          alt="Official Artwork"
          caption="Official Artwork"
        />
        <ArtworkImage
          src={officialArtworkFrontShiny}
          alt="Official Artwork shiny"
          caption="Official Artwork (shiny)"
        />
      </SectionWrapper>
    </section>
  )

  const dreamworkSection = (
    <section>
      {dreamWorldFrontDefault ? (
        <>
          <SectionTitle> Dreamworld sprites </SectionTitle>
          <SectionWrapper>
            <ArtworkImage src={dreamWorldFrontDefault} caption="Dreamwork" alt="Dreamwork" />
            <ArtworkImage
              src={dreamWorldFrontFemale}
              caption="Dreamwork (female)"
              alt="Dreamwork (female)"
            />
          </SectionWrapper>
        </>
      ) : null}
    </section>
  )

  const homeSpriteSection = (
    <section>
      <SectionTitle> Home sprites </SectionTitle>
      <SectionWrapper>
        <ArtworkImage src={homeFrontDefault} alt="Home" caption="Home" />
        <ArtworkImage src={homeFrontFemale} alt="Home (female)" caption="Home (female)" />
        <ArtworkImage src={homeFrontShiny} alt="Home shiny" caption="Home shiny" />
        <ArtworkImage
          src={homeFrontShinyFemale}
          alt="Home shiny (female)"
          caption="Home shiny (female)"
        />
      </SectionWrapper>
    </section>
  )

  return (
    <div className="grid lg:grid-cols-2">
      <div>
        {officialArtworkSection}
        {dreamworkSection}
      </div>
      {homeSpriteSection}
    </div>
  )
}
