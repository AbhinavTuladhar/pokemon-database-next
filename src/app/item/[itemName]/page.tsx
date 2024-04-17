import React, { FC } from 'react'

import PageTitle from '@/components/containers/PageTitle'
import { ItemExtractor } from '@/extractors/ItemExtractors'
import { ItemApi } from '@/services/ItemApi'
import formatName from '@/utils/formatName'

import ItemData from './_components/ItemData'
import ItemEffect from './_components/ItemEffect'

const getItemData = async (name: string) => {
  const response = await ItemApi.getByName(name)
  return ItemExtractor(response)
}

interface PageProps {
  params: {
    itemName: string
  }
}

const ItemPage: FC<PageProps> = async ({ params: { itemName } }) => {
  const itemData = await getItemData(itemName)

  const {
    attributes,
    longEntry,
    flavourTextEntries,
    fling_effect,
    fling_power,
    cost,
    names,
    category,
  } = itemData
  return (
    <main>
      <PageTitle> {formatName(itemName)}</PageTitle>
      <div className="grid grid-cols-1 gap-x-10 gap-y-6 min-[900px]:grid-cols-[1fr,_3fr]">
        <section>
          <ItemData
            attributes={attributes}
            category={category}
            cost={cost}
            fling_effect={fling_effect}
            fling_power={fling_power}
          />
        </section>
        <section>
          <ItemEffect entry={longEntry} />
        </section>
      </div>
    </main>
  )
}

export default ItemPage
