'use client'

import React, { FC, useEffect, useState } from 'react'
import { HiSpeakerWave } from 'react-icons/hi2'

import { SectionTitle } from '@/components/ui/Title'
import formatName from '@/utils/formatName'

interface CryProps {
  pokemonName: string
  latest: string
  legacy: string | undefined
}

export const PokemonCry: FC<CryProps> = ({ pokemonName, latest, legacy }) => {
  const [latestAudio, setLatestAudio] = useState<HTMLAudioElement>()
  const [legacyAudio, setLegacyAudio] = useState<HTMLAudioElement | null>()

  useEffect(() => {
    setLatestAudio(() => {
      const tempAudio = new Audio(latest)
      tempAudio.volume = 0.5
      return tempAudio
    })
    setLegacyAudio(() => {
      const tempAudio = new Audio(legacy)
      tempAudio.volume = 0.5
      return tempAudio
    })
  }, [latest, legacy])

  return (
    <>
      <SectionTitle> {`${formatName(pokemonName)}'s`} cries </SectionTitle>
      <div className="space-y-4">
        <div className="flex flex-row items-center gap-x-1">
          <span> Latest cry: </span>
          <HiSpeakerWave
            className="h-8 w-8 duration-300 hover:cursor-pointer hover:text-blue-500"
            onClick={() => latestAudio?.play()}
          />
        </div>
        {legacy ? (
          <div className="flex flex-row items-center gap-x-1">
            <span> Legacy cry: </span>
            <HiSpeakerWave
              className="h-8 w-8 duration-300 hover:cursor-pointer hover:text-blue-500"
              onClick={() => legacyAudio?.play()}
            />
          </div>
        ) : null}
      </div>
    </>
  )
}
