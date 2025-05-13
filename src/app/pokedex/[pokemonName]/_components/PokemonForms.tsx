import React, { FC } from 'react'

import { SectionTitle } from '@/components/ui/Title'
import { PokeFormCard } from '@/features/pokemon/components/PokeFormCard'
import PokemonService from '@/features/pokemon/services/pokemon.service'
import { transformPokemonForm } from '@/features/pokemon/transformers/transformPokemonForm'
import { getResourceId } from '@/utils/urlUtils'

const getFormData = async (ids: Array<string>) => {
  const response = await PokemonService.getFormsByIds(ids)
  return response.map(transformPokemonForm)
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
      <div className="flex flex-wrap justify-center gap-x-6 gap-y-8">
        {formsData.map((data, index) => {
          const { defaultSprite, shinySprite, name, types } = data
          return (
            <PokeFormCard
              key={data.name + index}
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
