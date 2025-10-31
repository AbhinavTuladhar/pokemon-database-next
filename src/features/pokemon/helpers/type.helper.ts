import { TransformedType } from '@/types'

interface MappingInterface {
  [key: string]: number
}

export const calculateDefensiveTypeEffectiveness = (typeInfo: Array<TransformedType>) => {
  const typeList = [
    'normal',
    'fire',
    'water',
    'electric',
    'grass',
    'ice',
    'fighting',
    'poison',
    'ground',
    'flying',
    'psychic',
    'bug',
    'rock',
    'ghost',
    'dragon',
    'dark',
    'steel',
    'fairy',
  ]
  const typeEffectivenessList = typeList.reduce((acc, curr) => {
    acc[curr] = 1
    return acc
  }, {} as MappingInterface)

  typeInfo.forEach(type => {
    const { doubleDamageFrom, halfDamageFrom, noDamageFrom } = type

    const multiplierMapping = [
      { typeList: doubleDamageFrom, multiplier: 2 },
      { typeList: halfDamageFrom, multiplier: 0.5 },
      { typeList: noDamageFrom, multiplier: 0 },
    ]

    multiplierMapping?.forEach(row => {
      row?.typeList?.forEach(type => {
        typeEffectivenessList[type] *= row.multiplier
      })
    })
  })

  return typeEffectivenessList
}

export const calculateOffensiveTypeEffectiveness = (
  defendingTypeCombination: Array<string>,
  attackingTypeInfo: Pick<TransformedType, 'doubleDamageTo' | 'halfDamageTo' | 'noDamageTo'>,
) => {
  const { doubleDamageTo, halfDamageTo, noDamageTo } = attackingTypeInfo

  const multiplierMapping = [
    { typeList: doubleDamageTo, multiplier: 2 },
    { typeList: halfDamageTo, multiplier: 0.5 },
    { typeList: noDamageTo, multiplier: 0 },
  ]

  let totalEffectiveness = 1

  multiplierMapping.forEach(({ typeList, multiplier }) => {
    defendingTypeCombination.forEach(defendingType => {
      if (typeList.includes(defendingType)) {
        totalEffectiveness *= multiplier
      }
    })
  })

  return totalEffectiveness
}

export const multiplierToString = (value: number) => {
  switch (value) {
    case 1:
      return 'normal effectiveness'
    case 0.25:
    case 0.5:
      return 'not very effective'
    case 1.5:
    case 1.25:
    case 2:
    case 2.5:
    case 4:
    case 5:
      return 'super-effective'
    case 0:
      return 'no effect'
    default:
      return 'idk'
  }
}

export const typeMapping: Record<string, string> = {
  normal: 'gray-400',
  fire: 'red-500',
  water: 'blue-400',
  electric: 'amber-400',
  grass: 'green-500',
  ice: 'blue-300',
  fighting: 'red-600',
  poison: 'purple-400',
  ground: 'yellow-600',
  flying: 'indigo-400',
  psychic: 'pink-400',
  bug: 'green-600',
  rock: 'yellow-800',
  ghost: 'purple-600',
  dragon: 'indigo-600',
  dark: 'gray-600',
  steel: 'gray-500',
  fairy: 'pink-300',
}
