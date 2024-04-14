import React from 'react'

import BlueLink from '@/components/BlueLink'
import PageTitle from '@/components/containers/PageTitle'
import SectionTitle from '@/components/containers/SectionTitle'
import { ItemApi } from '@/services/ItemApi'
import formatName from '@/utils/formatName'

const getItemPockets = async () => {
  const response = await ItemApi.getAllItemPockets()
  return response
}

const ItemPage = async () => {
  const itemPocketsList = await getItemPockets()
  return (
    <main>
      <PageTitle>Pokémon Items List</PageTitle>
      <section>
        <SectionTitle> Item categories </SectionTitle>
        <ul className="list-disc">
          {itemPocketsList.map(itemPocket => (
            <li key={itemPocket}>
              <BlueLink href={`/item/category/${itemPocket}`}>{formatName(itemPocket)}</BlueLink>
            </li>
          ))}
        </ul>
      </section>
    </main>
  )
}

export default ItemPage
