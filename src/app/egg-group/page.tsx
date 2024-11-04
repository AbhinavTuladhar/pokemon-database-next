import React from 'react'
import { Metadata } from 'next'

import { PageTitle } from '@/components/containers'
import EggGroupExtractor from '@/extractors/EggGroupExtractor'
import { EggGroupApi } from '@/services'

import { EggGroupTable } from './_components'

export const metadata: Metadata = {
  title: 'Pokémon Egg Groups | Pokémon Database',
}

const getGroupList = async () => {
  const response = await EggGroupApi.getAll()
  return response
}

const getAllGroupData = async (names: string[]) => {
  const response = await EggGroupApi.getByNames(names)

  // We now filter out gen 8+ pokemon from the list
  return response.sort((a, b) => (a.name > b.name ? 1 : -1)).map(EggGroupExtractor)
}

const EggGroupPage = async () => {
  const groupNames = await getGroupList()

  const eggGroupData = await getAllGroupData(groupNames)
  return (
    <main>
      <PageTitle>Pokémon Egg Groups</PageTitle>

      <div className="flex w-full justify-center">
        <div className="w-60 max-w-full">
          <EggGroupTable eggGroupData={eggGroupData} />
        </div>
      </div>
    </main>
  )
}

export default EggGroupPage
