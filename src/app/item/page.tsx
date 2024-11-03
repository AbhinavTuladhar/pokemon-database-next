import React, { FC } from 'react'

import { PageTitle } from '@/components/containers'
import BlueLink from '@/components/link'
import { ITEM_LIST_TEXT } from '@/data/hardCodedText'
import { ItemApi } from '@/services'
import formatName from '@/utils/formatName'

const getPocketNames = async () => {
  const response = await ItemApi.getAllItemPockets()
  return response.sort((a, b) => (a > b ? 1 : -1))
}

const Sidebar = async () => {
  const pocketNames = await getPocketNames()

  return (
    <aside className="self-start rounded bg-sky-100 px-4 pb-4 pt-px dark:bg-muted-blue">
      <h2 className="my-4 text-2xl font-bold"> Pokémon Items by Category </h2>
      <ul className="flex list-inside list-disc flex-col gap-y-1">
        {pocketNames.map(name => (
          <li key={name}>
            <BlueLink href={`/item/category/${name}`}>
              {formatName(name)} {name.endsWith('s') ? '' : 'Items'}
            </BlueLink>
          </li>
        ))}
      </ul>
    </aside>
  )
}

const MainDescription: FC = () => {
  const paragraphs = ITEM_LIST_TEXT.split('\n')

  return (
    <>
      <h2 className="text-4xl font-bold"> About Items </h2>
      {paragraphs.map((paragraph, index) => (
        <div key={paragraph + index}>
          {/* Capitalse the first letter of each paragraph. */}
          {paragraph.charAt(0).toUpperCase() + paragraph.slice(1)}
          {index !== paragraphs?.length - 1 && <br />}
        </div>
      ))}
    </>
  )
}

const ItemPage = async () => {
  return (
    <main>
      <PageTitle> Pokémon Items List</PageTitle>
      <div className="grid gap-x-8 lg:grid-cols-3">
        <Sidebar />
        <div className="lg:col-span-2">
          <MainDescription />
        </div>
      </div>
    </main>
  )
}

export default ItemPage
