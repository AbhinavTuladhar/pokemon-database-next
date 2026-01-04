'use client'

import { FC } from 'react'

import { typeList } from '@/features/pokemon/data/type.data'
import { AttackingTypeInfo } from '@/types'
import { combinationN } from '@/utils/array.utils'

interface Props {
  selectedTypes: string[]
  typeData: AttackingTypeInfo[]
}

const ToolResults: FC<Props> = ({ selectedTypes, typeData }) => {
  // Dual type combinations, except for repeating types.
  const allDualCombinations = Array.from(combinationN(typeList, 2)).filter(
    ([firstType, secondType]) => firstType !== secondType,
  )

  const allCombinations = [...typeList.map(type => [type]), ...allDualCombinations]

  // We now have to loop through all the type combinations. Within a single combination, we again
  // have to loop through all the selected types to calculate the final type effectiveness.
  return (
    <div>
      {selectedTypes.length > 0 && (
        <>
          <span> The results are</span>
          <pre>{JSON.stringify(selectedTypes, null, 2)}</pre>
        </>
      )}
    </div>
  )
}

export default ToolResults
