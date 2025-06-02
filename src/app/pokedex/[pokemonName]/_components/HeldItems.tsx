import React, { FC } from 'react'

import { TransitionLink } from '@/components/ui/Link'
import { Table, TableCell, TableHeader, TableRow } from '@/components/ui/Table'
import { SectionTitle } from '@/components/ui/Title'
import { gameToProperName } from '@/features/games/data/game-name.data'
import { PokemonHeldItem } from '@/types'
import { formatName } from '@/utils/string.utils'

// type HeldItemProps = Pick<TransformedPokemon, 'held_items'>

interface HeldItemProps {
  held_items: Array<PokemonHeldItem>
}

export const HeldItems: FC<HeldItemProps> = ({ held_items }) => {
  if (held_items.length === 0) {
    return
  }

  const tableRows = held_items.map((item, index) => {
    const {
      item: { name: itemName },
      version_details,
    } = item
    const gamesAndRarity = version_details.map((version, innerIndex) => {
      const {
        rarity,
        version: { name: versionName },
      } = version
      return (
        <span key={version.version.name + innerIndex}>
          {gameToProperName[versionName]} - {rarity}
          {innerIndex !== version_details.length - 1 ? ', ' : ''}
        </span>
      )
    })
    return (
      <TableRow key={item.item.name + index}>
        <TableHeader>
          <TransitionLink href={`/item/${itemName}`}>{formatName(itemName)}</TransitionLink>
        </TableHeader>
        <TableCell>
          <span>{gamesAndRarity}</span>
        </TableCell>
      </TableRow>
    )
  })

  return (
    <>
      <SectionTitle> Possible Held Items </SectionTitle>
      <div className="mb-4">
        <span> The name of the game is followed by the rarity. </span>
      </div>
      <Table>{tableRows}</Table>
    </>
  )
}
