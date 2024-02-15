import { Type, NamedApiResource } from '@/types'

const TypeExtractor = (data: Type) => {
  const { damage_relations: damageRelations, moves: moveList, pokemon: pokemonList, name } = data
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
  const pokemonUrls = pokemonList
    .map((pokemon) => pokemon.pokemon)
    .filter((pokemon) => {
      const { name, url } = pokemon
      if (url === null) return
      // const idNumber = url?.match(/\/(\d+)\/$/)[1]
      // @ts-ignore: Object is possibly 'null'.
      const idNumber = parseInt(url!.match(/\/(\d+)\/$/)[1])
      return (idNumber >= 1 && idNumber <= 807) || (idNumber >= 10_000 && idNumber <= 10157)
    })
    .map((pokemon) => {
      const { name, url } = pokemon
      const replacedUrl = url.replace(/\/pokemon\/\d+\//, `/pokemon/${name}/`)
      return replacedUrl
    })

  const extractName = (arr: Array<NamedApiResource<Type>>) => arr.map((type) => type.name)

  return {
    doubleDamageFrom: extractName(doubleDamageFrom),
    doubleDamageTo: extractName(doubleDamageTo),
    halfDamageFrom: extractName(halfDamageFrom),
    halfDamageTo: extractName(halfDamageTo),
    noDamageFrom: extractName(noDamageFrom),
    noDamageTo: extractName(noDamageTo),
    moveList: moveList,
    pokemonList: pokemonUrls,
    name,
  }
}

export default TypeExtractor