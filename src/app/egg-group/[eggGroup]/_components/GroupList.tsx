import React from 'react'

import BlueLink from '@/components/BlueLink'
import SectionTitle from '@/components/containers/SectionTitle'
import EggGroupExtractor from '@/extractors/EggGroupExtractor'
import { EggGroupApi } from '@/services/EggGroupApi'
import formatName from '@/utils/formatName'

const getGroupList = async () => {
  const response = await EggGroupApi.getAll()
  return response
}

const getAllGroupData = async (urls: string[]) => {
  const response = await EggGroupApi.getByUrls(urls)

  // We now filter out gen 8+ pokemon from the list
  return response.sort((a, b) => (a.name > b.name ? 1 : -1)).map(EggGroupExtractor)
}

const GroupList = async () => {
  const groupList = await getGroupList()
  const urlList = groupList.results.map((group) => group.url)

  const eggGroupData = await getAllGroupData(urlList)
  return (
    <section className="w-96 self-start rounded bg-[#19272d] px-4 pb-4 pt-px">
      <SectionTitle>Egg Groups</SectionTitle>
      <ul className="list-inside list-disc">
        {eggGroupData.map((group) => {
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

export default GroupList
