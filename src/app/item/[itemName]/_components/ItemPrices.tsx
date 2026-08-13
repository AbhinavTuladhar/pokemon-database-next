import React, { FC } from 'react'

import VersionNameList from '@/components/game-wise-descriptions/VersionNameList'
import { Table, TableCell, TableHeader, TableRow } from '@/components/ui/Table'
import { SectionTitle } from '@/components/ui/Title'
import { gameBlackLists } from '@/data/blacklist.data'
import { TransformedItem } from '@/types'

interface PricesProps {
  pricesList: TransformedItem['pricesList']
}

interface GroupedPrices {
  purchasePrice: number | null
  sellPrice: number | null
  versionGroups: string[]
}

// Group the games together if they have the same purchase AND selling prices
const groupItemPrices = (pricesData: TransformedItem['pricesList']): GroupedPrices[] => {
  // Filter out latest generations
  return pricesData
    .filter(item => !gameBlackLists.includes(item.versionGroup))
    .reduce<GroupedPrices[]>((acc, item) => {
      const { purchasePrice, sellPrice, versionGroup } = item

      // Find an existing group with the same purchase and selling price.
      const foundGroup = acc.find(
        group => group.purchasePrice === purchasePrice && group.sellPrice === sellPrice,
      )

      if (foundGroup) {
        foundGroup.versionGroups.push(versionGroup)
      } else {
        acc.push({
          purchasePrice,
          sellPrice,
          versionGroups: [versionGroup],
        })
      }

      return acc
    }, [])
}

interface TableRowProps {
  versionGroups: string[]
  purchasePrice: number | null
  sellPrice: number | null
}

const ItemTableRow: FC<TableRowProps> = ({ versionGroups, purchasePrice, sellPrice }) => (
  <TableRow>
    <TableCell>
      <VersionNameList versionNames={versionGroups} inlineFlag />
    </TableCell>
    <TableCell>{purchasePrice ?? '—'}</TableCell>
    <TableCell>{sellPrice ?? '—'}</TableCell>
  </TableRow>
)

const ItemPrices: FC<PricesProps> = ({ pricesList }) => {
  const groupedData = groupItemPrices(pricesList)
  const headers = ['Version Groups', 'Purchase Price', 'Sell Price']

  return (
    <>
      <SectionTitle> Item Prices </SectionTitle>
      <Table>
        <thead>
          <TableRow className="dark:bg-hdr-dark bg-neutral-200 font-bold duration-75">
            {headers.map(header => (
              <TableHeader
                className="border-r-bd-light dark:border-r-bd-dark border-r last:border-r-0"
                type="column"
                key={header}
              >
                {header}
              </TableHeader>
            ))}
          </TableRow>
        </thead>
        <tbody>
          {groupedData.map(({ versionGroups, purchasePrice, sellPrice }) => (
            <ItemTableRow
              key={versionGroups.join(', ')}
              versionGroups={versionGroups}
              purchasePrice={purchasePrice}
              sellPrice={sellPrice}
            />
          ))}
        </tbody>
      </Table>
    </>
  )
}

export default ItemPrices
