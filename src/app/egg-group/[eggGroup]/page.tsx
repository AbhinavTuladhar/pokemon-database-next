import React, { FC } from 'react'

import EggGroupExtractor from '@/extractors/EggGroupExtractor'
import PokemonExtractor from '@/extractors/PokemonExtractor'
import SpeciesExtractor from '@/extractors/SpeciesExtractor'
import { EggGroupApi } from '@/services/EggGroupApi'
import { PokemonApi } from '@/services/PokemonApi'
import { SpeciesApi } from '@/services/SpeciesApi'
import formatName from '@/utils/formatName'

import GroupList from './_components/GroupList'
import PokemonTable from './_components/PokemonTable'

interface PageProps {
  params: {
    eggGroup: string
  }
}

const getEggGroupData = async (name: string) => {
  const response = await EggGroupApi.get(name)
  return EggGroupExtractor(response)
}

const getSpeciesData = async (urls: string[], eggGroupName: string) => {
  const responses = await SpeciesApi.getByUrls(urls)
  return responses.map((species) => {
    const { id, egg_groups } = SpeciesExtractor(species)
    const otherEggGroup = egg_groups
      .map((group) => group.name)
      .filter((group) => group !== eggGroupName)[0]
    return { id, otherEggGroup }
  })
}

const getPokemonData = async (urls: string[]) => {
  const responses = await PokemonApi.getByUrls(urls)
  return responses.map((pokemon) => {
    const { id, nationalNumber, gameSprite, name, types } = PokemonExtractor(pokemon)
    return { id, nationalNumber, gameSprite, name, types }
  })
}

const EggPage: FC<PageProps> = async ({ params: { eggGroup } }) => {
  const data = await getEggGroupData(eggGroup)

  const speciesUrls = data.pokemonSpecies.map((species) => species.url)
  const pokemonUrls = speciesUrls.map((url) => url.replace('pokemon-species', 'pokemon'))

  const [speciesData, pokemonData] = await Promise.all([
    getSpeciesData(speciesUrls, eggGroup),
    getPokemonData(pokemonUrls),
  ])

  // Joinig the data
  const finalTableData = pokemonData
    .map((obj1) => {
      const obj2 = speciesData.find((obj2) => obj2.id === obj1.id)
      return { ...obj1, ...obj2 }
    })
    .filter(
      (entry) => (entry.id >= 1 && entry.id <= 807) || (entry.id >= 10001 && entry.id <= 10157),
    )

  return (
    <main>
      <h1 className="my-4 text-center text-5xl font-bold">
        <span> {formatName(eggGroup)} </span>
        <span className="text-gray-600"> (egg group) </span>
      </h1>
      <div className="flex flex-wrap gap-x-8">
        <GroupList />
        <PokemonTable finalTableData={finalTableData} />
      </div>
    </main>
  )
}

export default EggPage
