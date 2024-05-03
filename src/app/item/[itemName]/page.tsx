import React, { FC } from 'react'
import Image from 'next/image'

import { PageTitle } from '@/components/containers'
import Description from '@/components/dynamicRoutes/Description'
import OtherLanguages from '@/components/dynamicRoutes/OtherLanguages'
import { ItemExtractor } from '@/extractors/ItemExtractors'
import { ItemApi } from '@/services/ItemApi'
import formatName from '@/utils/formatName'

import { GameDescriptions, ItemData } from './_components'

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
    descriptions,
    fling_effect,
    fling_power,
    cost,
    names,
    category,
    sprite,
  } = itemData
  return (
    <main>
      <div className="flex flex-wrap items-center justify-center">
        <PageTitle>
          <span> {formatName(itemName)}</span>
          <span className="text-gray-400"> (item) </span>
        </PageTitle>
        <Image src={sprite} alt={itemName} width={64} height={64} />
      </div>
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
          <Description entry={longEntry} />
        </section>
      </div>

      <div className="grid grid-cols-1 gap-x-10 gap-y-6 lg:grid-cols-[1fr,_2fr]">
        <section>
          <OtherLanguages names={names} />
        </section>
        <section>
          <GameDescriptions descriptions={descriptions} />
        </section>
      </div>
    </main>
  )
}

export default ItemPage
