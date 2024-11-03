import React from 'react'

import { SectionTitle } from '@/components/containers'
import BlueLink from '@/components/link'
import EggGroupExtractor from '@/extractors/EggGroupExtractor'
import { EggGroupApi } from '@/services'
import formatName from '@/utils/formatName'

const getGroupList = async () => {
  const response = await EggGroupApi.getAll()
  return response
}

const getAllGroupData = async (names: string[]) => {
  const response = await EggGroupApi.getByNames(names)

  // We now filter out gen 8+ pokemon from the list
  return response.sort((a, b) => (a.name > b.name ? 1 : -1)).map(EggGroupExtractor)
}

export const GroupList = async () => {
  const groupList = await getGroupList()

  const eggGroupData = await getAllGroupData(groupList)
  return (
    <section className="dark:bg-muted-blue self-start rounded bg-sky-100 px-4 pb-4 pt-px">
      <SectionTitle>Egg Groups</SectionTitle>
      <ul className="list-inside list-disc">
        {eggGroupData.map(group => {
          const { id, name, pokemonSpecies } = group
          const pokemonCount = pokemonSpecies.length
          return (
            <li key={id}>
              <BlueLink href={`/egg-group/${name}`}>{formatName(name)}</BlueLink>{' '}
              <span>({pokemonCount})</span>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
