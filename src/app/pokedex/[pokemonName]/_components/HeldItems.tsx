import React, { FC } from 'react'

import { BlueLink } from '@/components/ui/Link'
import { Table, TableCell, TableHeader, TableRow } from '@/components/ui/Table'
import { SectionTitle } from '@/components/ui/Title'
import { individualGameMap } from '@/data/gameNameMap'
import { PokemonHeldItem } from '@/types'
import formatName from '@/utils/formatName'

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
          {individualGameMap[versionName]} - {rarity}
          {innerIndex !== version_details.length - 1 ? ', ' : ''}
        </span>
      )
    })
    return (
      <TableRow key={item.item.name + index}>
        <TableHeader>
          <BlueLink href={`/item/${itemName}`}>{formatName(itemName)}</BlueLink>
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
