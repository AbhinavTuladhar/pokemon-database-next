import { NamedApiResource, Type } from '@/types'
import { getResourceId } from '@/utils/url.utils'

import { isGen1to7 } from '../helpers/pokemon.helper'

export const transformType = (data: Type) => {
  const {
    damage_relations: damageRelations,
    moves: moveList,
    pokemon: pokemonList,
    name,
    sprites,
  } = data
  const {
    double_damage_from: doubleDamageFrom,
    double_damage_to: doubleDamageTo,
    half_damage_from: halfDamageFrom,
    half_damage_to: halfDamageTo,
    no_damage_from: noDamageFrom,
    no_damage_to: noDamageTo,
  } = damageRelations

  // Use the actual pokemon name in the url instead of their id.
  // Also filter out gen 7+ forms.
  const pokemon = pokemonList
    .map(pokemon => pokemon.pokemon)
    .filter(pokemon => {
      const { url } = pokemon
      if (url === null) return
      // const idNumber = url?.match(/\/(\d+)\/$/)[1]
      // @ts-ignore: Object is possibly 'null'.
      const idNumber = parseInt(url!.match(/\/(\d+)\/$/)[1])
      return isGen1to7(idNumber)
    })
    .map(pokemon => pokemon.name)

  // Remove gen 7+ moves.
  const moveListFiltered = moveList.filter(move => {
    const { url } = move
    const moveId = parseInt(getResourceId(url))
    return moveId <= 742
  })

  const extractName = (arr: Array<NamedApiResource<Type>>) => arr.map(type => type.name)

  const {
    'generation-iii': {
      'firered-leafgreen': { name_icon: fireredLeafgreenSprite },
      'ruby-sapphire': { name_icon: rubySapphireSprite = '' } = {},
      'emerald': { name_icon: emeraldSprite },
    },
    'generation-iv': {
      'diamond-pearl': { name_icon: diamondPearlSprite },
      'heartgold-soulsilver': { name_icon: heartgoldSoulsilverSprite },
      'platinum': { name_icon: platinumSprite },
    },
    'generation-v': {
      'black-white': { name_icon: blackWhiteSprite },
      'black-2-white-2': { name_icon: black2White2Sprite },
    },
    'generation-vi': {
      'x-y': { name_icon: xySprite },
      'omega-ruby-alpha-sapphire': { name_icon: omegaRubyAlphaSapphireSprite },
    },
    'generation-vii': {
      'ultra-sun-ultra-moon': { name_icon: ultraSunUltraMoonSprite },
      'sun-moon': { name_icon: sunMoonSprite },
    },
  } = sprites

  return {
    doubleDamageFrom: extractName(doubleDamageFrom),
    doubleDamageTo: extractName(doubleDamageTo),
    halfDamageFrom: extractName(halfDamageFrom),
    halfDamageTo: extractName(halfDamageTo),
    noDamageFrom: extractName(noDamageFrom),
    noDamageTo: extractName(noDamageTo),
    moveList: moveListFiltered,
    pokemon,
    name,
    spriteCollection: {
      fireredLeafgreenSprite,
      rubySapphireSprite,
      emeraldSprite,
      diamondPearlSprite,
      heartgoldSoulsilverSprite,
      platinumSprite,
      blackWhiteSprite,
      black2White2Sprite,
      xySprite,
      omegaRubyAlphaSapphireSprite,
      ultraSunUltraMoonSprite,
      sunMoonSprite,
    },
  }
}
