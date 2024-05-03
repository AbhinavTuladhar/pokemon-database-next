import React, { FC } from 'react'

import { SectionTitle } from '@/components/containers/SectionTitle'
import PokeFormCard from '@/components/PokeFormCard'
import PokemonFormExtractor from '@/extractors/PokemonFormExtractor'
import { PokemonApi } from '@/services/PokemonApi'
import { getResourceId } from '@/utils/urlUtils'

const getFormData = async (ids: Array<string>) => {
  const response = await PokemonApi.getFormsByIds(ids)
  return response.map(PokemonFormExtractor)
}

interface FormProps {
  urls: Array<string>
}

export const PokemonForms: FC<FormProps> = async ({ urls }) => {
  if (urls.length === 1) {
    return
  }

  // Get the value of the form ids
  const formIds = urls.map(url => getResourceId(url))
  const formsData = await getFormData(formIds)

  return (
    <>
      <SectionTitle> Pokémon Forms </SectionTitle>
      <div className="flex flex-wrap justify-center  gap-x-6 gap-y-8">
        {formsData.map((data, index) => {
          const { defaultSprite, shinySprite, name, types } = data
          return (
            <PokeFormCard
              key={index}
              typeNames={types}
              defaultSprite={defaultSprite}
              shinySprite={shinySprite}
              pokemonName={name}
            />
          )
        })}
      </div>
    </>
  )
}
