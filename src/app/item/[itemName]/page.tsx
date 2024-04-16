import React, { FC } from 'react'

import PageTitle from '@/components/containers/PageTitle'
import { ItemApi } from '@/services/ItemApi'
import formatName from '@/utils/formatName'

const getItemData = async (name: string) => {
  const response = await ItemApi.getByName(name)
  return response
}

interface PageProps {
  params: {
    itemName: string
  }
}

const ItemPage: FC<PageProps> = async ({ params: { itemName } }) => {
  const itemData = await getItemData(itemName)
  return (
    <main>
      <PageTitle> {formatName(itemName)}</PageTitle>
      <div>{JSON.stringify(itemData, null, 4)}</div>
    </main>
  )
}

export default ItemPage
