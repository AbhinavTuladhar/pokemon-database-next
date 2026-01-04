'use client'

import { FC, useState } from 'react'

import { TypeCard } from '@/features/pokemon/components/TypeCard'
import { typeList } from '@/features/pokemon/data/type.data'
import { TransformedType } from '@/types'
import { combinationN } from '@/utils/array.utils'

interface Props {
  data: AttackingTypeInfo[]
}

interface AttackingTypeInfo {
  typeName: string
  attackingTypeInfo: AttackingType
}

interface AttackingType {
  doubleDamageTo: TransformedType['doubleDamageTo']
  halfDamageTo: TransformedType['halfDamageTo']
  noDamageTo: TransformedType['noDamageTo']
}

const MainPage: FC<Props> = ({ data }) => {
  const [selectedTypes, setSelectedTypes] = useState<string[]>([])

  // Dual type combinations, except for repeating types.
  const allDualCombinations = Array.from(combinationN(typeList, 2)).filter(
    ([firstType, secondType]) => firstType !== secondType,
  )

  const allCombinations = [...typeList.map(type => [type]), ...allDualCombinations]

  const handleClick = (type: string) => {
    if (selectedTypes.includes(type)) {
      setSelectedTypes(prevList => prevList.filter(innerType => innerType !== type))
    } else {
      setSelectedTypes(prevList => [...prevList, type])
    }
  }

  return (
    <div>
      <div className="grid grid-cols-9 gap-y-10">
        {typeList.map(type => (
          <button
            className="grid cursor-pointer place-items-center px-2 py-6 duration-300 hover:bg-gray-300 dark:hover:bg-gray-700"
            key={type}
            onClick={() => handleClick(type)}
          >
            <TypeCard typeName={type} key={type} isLink={false} />
          </button>
        ))}
      </div>
      <pre>{JSON.stringify(selectedTypes, null, 2)}</pre>
    </div>
  )
}

export default MainPage
