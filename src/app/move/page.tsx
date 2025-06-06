import React, { FC } from 'react'
import { Metadata } from 'next'

import { TransitionLink } from '@/components/ui/Link'
import { PageTitle, SectionTitle } from '@/components/ui/Title'
import { MOVE_LIST_TEXT } from '@/data/hardCodedText'

export const metadata: Metadata = {
  title: 'Pokémon move list | Pokémon Database',
}

const SideBar: FC = () => {
  const numbers = Array.from({ length: 7 }, (_, index) => index + 1)

  return (
    <aside className="dark:bg-muted-blue self-start rounded-sm bg-sky-100 px-4 pt-px pb-4">
      <SectionTitle> Moves by Generation </SectionTitle>
      <ul className="list-inside list-disc space-y-2">
        {numbers.map(number => (
          <li key={number}>
            <TransitionLink href={`/move/generation/${number}`} key={number}>
              Generation {number}
            </TransitionLink>
          </li>
        ))}
      </ul>
    </aside>
  )
}

const MainDescription: FC = () => {
  const paragraphs = MOVE_LIST_TEXT.split('\n')

  return (
    <>
      <h2 className="text-4xl font-bold"> About Pokémon Moves </h2>
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

const MoveList = async () => {
  return (
    <main>
      <PageTitle> Pokémon Moves</PageTitle>
      <div className="grid gap-x-8 gap-y-4 lg:grid-cols-3">
        <SideBar />
        <div className="lg:col-span-2">
          <MainDescription />
        </div>
      </div>
    </main>
  )
}

export default MoveList
