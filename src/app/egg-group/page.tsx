import React from 'react'
import { Metadata } from 'next'

import { PageTitle } from '@/components/ui/Title'
import EggGroupService from '@/features/pokemon/services/egg-group.service'
import { transformEggGroup } from '@/features/pokemon/transformers/transform-egg-group'

import { EggGroupTable } from './_components'

export const metadata: Metadata = {
  title: 'Pokémon Egg Groups | Pokémon Database',
}

const getGroupList = async () => {
  const response = await EggGroupService.getAll()
  return response
}

const getAllGroupData = async (names: string[]) => {
  const response = await EggGroupService.getByNames(names)

  // We now filter out gen 8+ pokemon from the list
  return response.sort((a, b) => (a.name > b.name ? 1 : -1)).map(transformEggGroup)
}

const EggGroupPage = async () => {
  const groupNames = await getGroupList()
  const eggGroupData = await getAllGroupData(groupNames)

  return (
    <>
      <PageTitle>Pokémon Egg Groups</PageTitle>

      <div className="flex w-full justify-center">
        <div className="w-72 max-w-full">
          <EggGroupTable eggGroupData={eggGroupData} />
        </div>
      </div>
    </>
  )
}

export default EggGroupPage
