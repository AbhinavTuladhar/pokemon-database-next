import React, { FC } from 'react'

import formatName from '@/utils/formatName'

import GroupList from './_components/GroupList'

interface PageProps {
  params: {
    eggGroup: string
  }
}

const EggPage: FC<PageProps> = ({ params: { eggGroup } }) => {
  return (
    <main>
      <h1 className="my-4 text-center text-5xl font-bold">
        <span> {formatName(eggGroup)} </span>
        <span className="text-gray-600"> (egg group) </span>
      </h1>
      <GroupList />
    </main>
  )
}

export default EggPage
