import React, { FC } from 'react'
import { Metadata } from 'next'
import Image from 'next/image'

import { Description, OtherLanguages } from '@/components/dynamicRoutes'
import { PageTitle } from '@/components/ui/Title'
import { berryBlackLists } from '@/data/blacklist.data'
import ItemService from '@/features/games/services/item.service'
import { transformItem } from '@/features/games/transformers/transform-item'
import { formatName } from '@/utils/string.utils'

import { BerryDetails, GameDescriptions, ItemData } from './_components'

const getItemData = async (name: string) => {
  const response = await ItemService.getByName(name)
  return transformItem(response)
}

interface PageProps {
  params: {
    itemName: string
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { itemName } = params
  return {
    title: `${formatName(itemName)} | Pokémon Items | Pokémon Database`,
  }
}

/**
 * Check whether an item is a berry or not on the basis of its name, fling effect and category.
 */
const checkBerry = (itemName: string, flingEffect: string | undefined, category: string) => {
  const allowedCategories = ['baking-only', 'type-protection', 'effort-drop', 'in-a-pinch', 'other']

  return (
    itemName.includes('berry') &&
    !berryBlackLists.includes(itemName) &&
    (flingEffect?.includes('berry') || allowedCategories.includes(category))
  )
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
    name: actualItemName,
  } = itemData

  const isBerry = checkBerry(itemName, fling_effect?.name, category)

  return (
    <main>
      <div className="flex flex-wrap items-center justify-center">
        <PageTitle>
          <span> {formatName(actualItemName)}</span>
          <span className="text-gray-400"> (item) </span>
        </PageTitle>
        <Image src={sprite} alt={actualItemName} width={64} height={64} />
      </div>
      <div className="grid grid-cols-1 gap-x-10 gap-y-6 min-[900px]:grid-cols-[1fr__3fr]">
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

      <div className="grid grid-cols-1 gap-x-10 gap-y-6 lg:grid-cols-[1fr__2fr]">
        <section>
          <OtherLanguages names={names} />
        </section>
        <section>
          <GameDescriptions descriptions={descriptions} />
        </section>
      </div>

      {isBerry ? <BerryDetails itemName={actualItemName} /> : null}
    </main>
  )
}

export default ItemPage
