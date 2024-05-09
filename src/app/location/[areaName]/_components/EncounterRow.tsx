import React, { FC } from 'react'
import Image from 'next/image'
import classNames from 'classnames'

import { TableCell, TableRow } from '@/components/containers'
import BlueLink from '@/components/link'
import encounterConditionData from '@/data/encounterConditionData'
import generationToGameListMap from '@/data/generationToGameListMap'
import { GroupedLocationArea } from '@/types'
import buildConditionArray from '@/utils/buildConditionArray'
import formatName, { capitaliseFirstLetter } from '@/utils/formatName'
import { getFullRarityImage, getRarityString } from '@/utils/getRarityInfo'
import getFullSeasonImage from '@/utils/getSeasonImage'
import getFullTimeImage from '@/utils/getTimeImage'

import { GameBox } from './GameBox'
import { ConditionArray, EncounterConditionName } from './types'

interface ImageRowProps {
  conditions: ConditionArray
  encounterConditionName: EncounterConditionName
}

// Used when there are other time or season-based encounters in the other rows of the same table,
// but not in the current row.
const getFallBackCondition = (encounterConditionName: EncounterConditionName): ConditionArray => {
  return encounterConditionName === 'season'
    ? ['season-spring', 'season-summer', 'season-autumn', 'season-winter']
    : ['time-morning', 'time-day', 'time-night']
}

// Used for dealing with the index position of the tooltip
const getFallBackTooltip = (encounterConditionName: EncounterConditionName, index: number) => {
  const baseString = 'Not in the'

  switch (encounterConditionName) {
    case 'season':
      const seasonValue = encounterConditionData['season'][index]
      return `${baseString} ${seasonValue}`
    case 'time':
      const timeValue = encounterConditionData['time'][index]
      return `${baseString} ${timeValue}`
    default:
      return ''
  }
}

const ConditionImages: FC<ImageRowProps> = ({ conditions, encounterConditionName }) => {
  return conditions.map((condition, index) => {
    const tooltipContent = getFallBackTooltip(encounterConditionName, index)
    if (condition === '') {
      return (
        <div
          data-tooltip-id="my-tooltip"
          data-tooltip-content={tooltipContent}
          key={index}
          className="grid h-8 w-8 cursor-help place-items-center"
        >
          <div className="h-1.5 w-1.5 rounded-full bg-zinc-400" />
        </div>
      )
    }
    const imageFile =
      encounterConditionName === 'time'
        ? getFullTimeImage(condition)
        : getFullSeasonImage(condition)
    const [_, conditionName] = condition.split('-')
    const conditionTooltipContent = capitaliseFirstLetter(conditionName)
    return (
      <Image
        data-tooltip-id="my-tooltip"
        data-tooltip-content={conditionTooltipContent}
        className="cursor-help"
        key={condition}
        alt={condition}
        src={imageFile}
        width={32}
        height={32}
      />
    )
  })
}

interface RowProps {
  encounter: GroupedLocationArea
  method: string
  hasEncounterCondition: boolean
  encounterConditionName: EncounterConditionName
}

export const EncounterRow: FC<RowProps> = ({
  encounter,
  method,
  hasEncounterCondition,
  encounterConditionName,
}) => {
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
    <div className="flex items-center pr-12 md:pr-4">
      <Image src={iconSprite} alt={pokemonName} width={66} height={66} />
      <BlueLink boldFlag href={`/pokedex/${pokemonName}`}>
        {formatName(pokemonName)}
      </BlueLink>
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
      data-tooltip-id="my-tooltip"
      data-tooltip-content={rarityString}
    />
  )

  // We are concerned only with encounters dependent on the time of day and the season.
  const conditionValuesFiltered = condition_values.filter(
    condition => condition.includes('time') || condition.includes('season'),
  )

  const conditionImagesData =
    encounterConditionName === 'time'
      ? buildConditionArray('time', conditionValuesFiltered)
      : buildConditionArray('season', conditionValuesFiltered)

  const conditionImages = hasEncounterCondition ? (
    conditionValuesFiltered.length > 0 ? (
      <ConditionImages
        conditions={conditionImagesData}
        encounterConditionName={encounterConditionName}
      />
    ) : (
      <ConditionImages
        conditions={getFallBackCondition(encounterConditionName)}
        encounterConditionName={encounterConditionName}
      />
    )
  ) : null

  const conditionDiv = (
    <div
      className={classNames(
        'grid items-center justify-between gap-x-4',
        { 'grid-cols-[repeat(3,_32px)]': encounterConditionName === 'time' },
        { 'grid-cols-[repeat(4,_32px)]': encounterConditionName === 'season' },
      )}
    >
      {conditionImages}
    </div>
  )

  const cellData = [
    { key: 'pokemon', value: idDiv },
    { key: 'game', value: gameBoxDiv },
    ...(hasEncounterCondition ? [{ key: 'condition', value: conditionDiv }] : []),
    { key: 'chance', value: rarityImage },
    { key: 'level range', value: levelRange },
  ]

  return (
    <TableRow className="duration-300 hover:bg-amber-50 dark:hover:bg-dark-highlighted">
      {cellData.map(({ key, value }, index) => (
        <TableCell
          key={index}
          extraClassName={classNames(
            '!py-0',
            { '!px-0': key === 'game' },
            { 'min-w-40': key === 'pokemon' },
            { '!pr-4': key === 'condition' },
          )}
          variant="column"
        >
          {value}
        </TableCell>
      ))}
    </TableRow>
  )
}
