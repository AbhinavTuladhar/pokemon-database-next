import { PokemonForm } from '@/types'

export const transformPokemonForm = (data: PokemonForm) => {
  const { form_name, name, sprites, types } = data

  const { front_default, front_shiny } = sprites

  const typeNames = types.map(type => type.type.name)

  return {
    formName: form_name,
    name,
    defaultSprite: front_default,
    shinySprite: front_shiny,
    types: typeNames,
  }
}
