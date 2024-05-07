import React, { FC } from 'react'
import Image from 'next/image'

import { TableCell, TableRow } from '@/components/containers'
import BlueLink from '@/components/link'
import generationToGameListMap from '@/data/generationToGameListMap'
import { GroupedLocationArea } from '@/types'
import formatName from '@/utils/formatName'
import { getFullRarityImage, getRarityString } from '@/utils/getRarityInfo'
import getFullTimeImage from '@/utils/getTimeImage'

import { GameBox } from './GameBox'

interface RowProps {
  encounter: GroupedLocationArea
  method: string
  hasEncounterCondition: boolean
}

export const EncounterRow: FC<RowProps> = ({ encounter, method, hasEncounterCondition }) => {
  const {
    iconSprite,
    pokemonName,
    generationInternal,
    gameName,
    levelRange,
    chance,
    condition_values,
  } = encounter

  const rarityImagePath = getFullRarityImage(chance, method)
  const rarityString = getRarityString(chance, method)

  const idDiv = (
    <div className="flex flex-row items-center pr-12 md:pr-4">
      <Image src={iconSprite} alt={pokemonName} width={66} height={66} />
      <BlueLink href={`/pokedex/${pokemonName}`}>{formatName(pokemonName)}</BlueLink>
    </div>
  )

  // For the game boxes
  const gameBoxDiv = (
    <div className="flex flex-row">
      {generationToGameListMap[generationInternal].map((game, index) => (
        <GameBox gameName={game} activeFlag={gameName.includes(game)} key={index} />
      ))}
    </div>
  )

  // For the pie-chart rarity image
  const rarityImage = (
    <Image
      src={rarityImagePath}
      alt={`${chance}`}
      width={30}
      height={30}
      className="hover:cursor-help"
      id={rarityString}
    />
  )

  // For the encounter conditions, if any.
  const conditionImages = hasEncounterCondition
    ? condition_values.length > 0
      ? condition_values.map(condition => {
          const imageFile = getFullTimeImage(condition)
          return <Image key={condition} alt={condition} src={imageFile} width={20} height={20} />
        })
      : ['time-morning', 'time-day', 'time-night'].map(condition => {
          const imageFile = getFullTimeImage(condition)
          return <Image key={condition} alt={condition} src={imageFile} width={20} height={20} />
        })
    : null

  const conditionDiv = <div className="flex gap-x-4">{conditionImages}</div>

  const cellData = [
    { key: 'pokemon', value: idDiv },
    { key: 'game', value: gameBoxDiv },
    ...(hasEncounterCondition ? [{ key: 'condition', value: conditionDiv }] : []),
    { key: 'chance', value: rarityImage },
    { key: 'level range', value: levelRange },
  ]
  return (
    <TableRow>
      {cellData.map(({ key, value }, index) => (
        <TableCell
          key={index}
          extraClassName={`${key === 'game' ? '!px-0' : ''} !py-0`}
          variant="column"
        >
          {value}
        </TableCell>
      ))}
    </TableRow>
  )
}
