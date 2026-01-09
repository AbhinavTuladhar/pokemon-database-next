'use client'

import { FC, memo } from 'react'

import { typeList } from '@/features/pokemon/data/type.data'
import { calculateOffensiveTypeEffectiveness } from '@/features/pokemon/helpers/type.helper'
import { AttackingTypeInfo } from '@/types'
import { combinationN } from '@/utils/array.utils'

interface Props {
  selectedTypes: string[]
  typeData: AttackingTypeInfo[]
}

type EffectType = 'immune' | 'not-very-effective' | 'normal' | 'super-effective'

const ToolResults: FC<Props> = memo(({ selectedTypes, typeData }) => {
  const finalResults = computeFinalResults(selectedTypes, typeData)

  return (
    <div>
      {selectedTypes.length > 0 && (
        <>
          <span>The results are</span>
          <pre>{JSON.stringify(finalResults, null, 2)}</pre>
        </>
      )}
    </div>
  )
})

ToolResults.displayName = 'ToolResults'

const computeFinalResults = (selectedTypes: string[], typeData: AttackingTypeInfo[]) => {
  // Dual type combinations, except for repeating types.
  const allDualCombinations = Array.from(combinationN(typeList, 2)).filter(
    ([firstType, secondType]) => firstType !== secondType,
  )

  const allCombinations = [...typeList.map(type => [type]), ...allDualCombinations]

  /**
   * For each type combination, find the highest multiplier from the attacking type combinations
   * that are set by the user
   */
  const finalResults = allCombinations.map(combination => {
    const totalResults = getTotalResults(selectedTypes, combination, typeData)

    const highestMultiplier = totalResults.reduce((acc, result) => {
      return result.multiplier > acc ? result.multiplier : acc
    }, 0)

    return { combination, multiplier: highestMultiplier }
  })

  /**
   * Finally, group the results bu the highest  multiplier into four distinct groups:
   * 1. No effect - 0
   * 2. Not very effective - between 0 and 1
   * 3. Normal effectiveness - exactly 1
   * 4. Super effective - more than 1
   */
  return finalResults.reduce(
    (acc, item) => {
      const { combination, multiplier } = item
      const effectType = getEffectType(multiplier)
      acc[effectType].push(combination)

      return acc
    },
    {
      'immune': [],
      'not-very-effective': [],
      'normal': [],
      'super-effective': [],
    } as Record<EffectType, string[][]>,
  )
}

/**
 * Required data type:
 * Array of { typeCombination: string, multiplier: number }
 */

const getTotalResults = (
  attackingTypes: string[],
  defendingTypes: string[],
  typeData: AttackingTypeInfo[],
) => {
  const value = attackingTypes.map(attacker => {
    const foundAttackerInfo = typeData.find(data => data.typeName === attacker) as AttackingTypeInfo

    const multiplier = calculateOffensiveTypeEffectiveness(
      defendingTypes,
      foundAttackerInfo.attackingTypeInfo,
    )

    return { typeCombination: defendingTypes, multiplier }
  })

  return value
}

const getEffectType = (multiplier: number): EffectType => {
  if (multiplier === 0) {
    return 'immune'
  } else if (multiplier > 0 && multiplier < 1) {
    return 'not-very-effective'
  } else if (multiplier === 1) {
    return 'normal'
  } else {
    return 'super-effective'
  }
}

export default ToolResults
