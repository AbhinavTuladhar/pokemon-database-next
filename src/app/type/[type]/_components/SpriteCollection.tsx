import React, { FC } from 'react'
import Image from 'next/image'

import { Table } from '@/components/ui/Table'
import { TransformedType } from '@/types'

import { GameTypeSprite } from './types'

interface SpriteCollectionProps {
  spriteCollection: TransformedType['spriteCollection']
}

const getOrganisedSpriteList = (spriteCollection: TransformedType['spriteCollection']) => {
  const {
    rubySapphireSprite,
    emeraldSprite,
    fireredLeafgreenSprite,
    diamondPearlSprite,
    platinumSprite,
    heartgoldSoulsilverSprite,
    blackWhiteSprite,
    black2White2Sprite,
    xySprite,
    omegaRubyAlphaSapphireSprite,
    sunMoonSprite,
    ultraSunUltraMoonSprite,
  } = spriteCollection

  return [
    {
      generationNumber: 3,
      spritesList: [
        {
          sprite: rubySapphireSprite,
          versionGroupName: 'Ruby / Sapphire',
        },
        {
          sprite: emeraldSprite,
          versionGroupName: 'Emerald',
        },
        {
          sprite: fireredLeafgreenSprite,
          versionGroupName: 'FireRed / LeafGreen',
        },
      ],
    },
    {
      generationNumber: 4,
      spritesList: [
        {
          sprite: diamondPearlSprite,
          versionGroupName: 'Diamond Pearl',
        },
        {
          sprite: platinumSprite,
          versionGroupName: 'Platinum',
        },
        {
          sprite: heartgoldSoulsilverSprite,
          versionGroupName: 'HeartGold SoulSilver',
        },
      ],
    },
    {
      generationNumber: 5,
      spritesList: [
        {
          sprite: blackWhiteSprite,
          versionGroupName: 'Black / White',
        },
        {
          sprite: black2White2Sprite,
          versionGroupName: 'Black 2 / White 2',
        },
      ],
    },
    {
      generationNumber: 6,
      spritesList: [
        {
          sprite: xySprite,
          versionGroupName: 'X / Y',
        },
        {
          sprite: omegaRubyAlphaSapphireSprite,
          versionGroupName: 'Omega Ruby / Alpha Sapphire',
        },
      ],
    },
    {
      generationNumber: 7,
      spritesList: [
        {
          sprite: sunMoonSprite,
          versionGroupName: 'Sun / Moon',
        },
        {
          sprite: ultraSunUltraMoonSprite,
          versionGroupName: 'Ultra Sun / Ultra Moon',
        },
      ],
    },
  ]
}

interface SpriteTableProps {
  generationNumber: number
  spritesList: Array<GameTypeSprite>
}

const SpriteCard: FC<GameTypeSprite> = ({ sprite, versionGroupName }) => {
  if (!sprite) return null

  return (
    <div className="flex flex-col items-center gap-y-2">
      <Image src={sprite} alt={versionGroupName} width={80} height={30} />
      <span className="text-sm">{versionGroupName}</span>
    </div>
  )
}

const SpriteTable: FC<SpriteTableProps> = ({ generationNumber, spritesList }) => {
  // Don't show the table if there is even one null sprite
  if (spritesList.some(sprite => sprite.sprite === null)) return null

  return (
    <Table useFullWidth={true}>
      <thead>
        <th
          className="border-bd-light dark:border-bd-dark dark:bg-hdr-dark border-x bg-neutral-200 py-2"
          colSpan={2}
        >
          Generation {generationNumber}
        </th>
      </thead>
      <tbody>
        <tr className="border-bd-light dark:border-bd-dark flex flex-wrap justify-evenly gap-4 border-x px-4 py-6">
          {spritesList.map((data, index) => {
            const { sprite, versionGroupName } = data
            return <SpriteCard key={index} sprite={sprite} versionGroupName={versionGroupName} />
          })}
        </tr>
      </tbody>
    </Table>
  )
}

export const SpriteCollection: FC<SpriteCollectionProps> = ({ spriteCollection }) => {
  const spriteList = getOrganisedSpriteList(spriteCollection)

  return (
    <div className="space-y-4">
      {spriteList.map((data, index) => {
        const { generationNumber, spritesList } = data
        return (
          <SpriteTable key={index} generationNumber={generationNumber} spritesList={spritesList} />
        )
      })}
    </div>
  )
}
