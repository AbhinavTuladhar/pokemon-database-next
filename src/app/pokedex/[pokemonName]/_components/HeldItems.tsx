import React, { FC } from 'react'

import BlueLink from '@/components/BlueLink'
import SectionTitle from '@/components/containers/SectionTitle'
import TableCell from '@/components/containers/TableCell'
import TableCellHeader from '@/components/containers/TableCellHeader'
import TableContainer from '@/components/containers/TableContainer'
import TableRow from '@/components/containers/TableRow'
import { individualGameMap } from '@/data/gameNameMap'
import { PokemonHeldItem } from '@/types'
import formatName from '@/utils/formatName'

// type HeldItemProps = Pick<TransformedPokemon, 'held_items'>

interface HeldItemProps {
  held_items: Array<PokemonHeldItem>
}

const HeldItems: FC<HeldItemProps> = ({ held_items }) => {
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
        <span key={innerIndex}>
          {individualGameMap[versionName]} - {rarity}
          {innerIndex !== version_details.length - 1 ? ', ' : ''}
        </span>
      )
    })
    return (
      <TableRow key={index}>
        <TableCellHeader>
          <BlueLink href={`/item/${itemName}`}>{formatName(itemName)}</BlueLink>
        </TableCellHeader>
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
      <TableContainer>{tableRows}</TableContainer>
    </>
  )
}

export default HeldItems
