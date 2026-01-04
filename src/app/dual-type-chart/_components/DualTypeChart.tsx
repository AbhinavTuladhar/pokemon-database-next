import React, { FC, PropsWithChildren } from 'react'

import { SectionTitle } from '@/components/ui/Title'
import { MiniTypeCard, TypeCard } from '@/features/pokemon/components/TypeCard'
import { TypeMultiplierBox } from '@/features/pokemon/components/TypeMultiplierBox'
import { typeList } from '@/features/pokemon/data/type.data'
import { calculateOffensiveTypeEffectiveness } from '@/features/pokemon/helpers/type.helper'
import { multiplierToString } from '@/features/pokemon/helpers/type.helper'
import { TransformedType } from '@/types'
import { formatName } from '@/utils/string.utils'

type AttackingType = Pick<TransformedType, 'doubleDamageTo' | 'halfDamageTo' | 'noDamageTo'>

interface DualTypeChartProps {
  baseType: string
  attackingTypeInfo: Array<AttackingType>
  sectionTitleFlag: boolean
}

interface RowProps {
  typeCombination: Array<string>
  attackingTypeInfo: Array<AttackingType>
}

const calculateScoresAndMultipliers = (
  typeCombo: Array<string>,
  attackingTypeInfo: Array<AttackingType>,
) => {
  let score = 0
  const multiplierValues = typeList.map((type, index) => {
    const [firstType, secondType] = typeCombo
    const multiplierValue = calculateOffensiveTypeEffectiveness(
      firstType === secondType ? [firstType] : typeCombo,
      attackingTypeInfo[index],
    )
    score += multiplierValue
    return { multiplier: multiplierValue, type: type }
  })

  return { score, multiplierValues }
}

const ScoreCell: FC<PropsWithChildren> = ({ children }) => (
  <div className="border-bd-light dark:border-bd-dark h-[37px] w-[46px] border p-2 text-center text-xs">
    {children}
  </div>
)

const TableRow: FC<RowProps> = ({ typeCombination, attackingTypeInfo }) => {
  const { score, multiplierValues } = calculateScoresAndMultipliers(
    typeCombination,
    attackingTypeInfo,
  )

  const typeComboString = typeCombination.map(formatName).join('/')
  const [firstType, secondType] = typeCombination

  return (
    <div className="actual-rows contents" key={`row-${firstType}-${secondType}`}>
      <div className="flex flex-row gap-x-px">
        <TypeCard key={`first-${firstType}-${secondType}`} typeName={firstType} variant="big" />
        {firstType !== secondType ? (
          <TypeCard key={`second-${firstType}-${secondType}`} typeName={secondType} variant="big" />
        ) : (
          <div className="border-bd-light dark:border-bd-dark grid w-16 place-items-center rounded-sm border bg-zinc-400 text-white">
            -
          </div>
        )}
      </div>
      <ScoreCell>{score}</ScoreCell>
      {multiplierValues.map(({ multiplier, type }) => {
        const multiplierString = multiplierToString(multiplier)
        const tooltipContent = `${formatName(type)} → ${typeComboString} = ${multiplierString}`
        return (
          <div key={type} data-tooltip-content={tooltipContent} data-tooltip-id="my-tooltip">
            <TypeMultiplierBox multiplier={multiplier} key={type} />
          </div>
        )
      })}
    </div>
  )
}

export const DualTypeChart: FC<DualTypeChartProps> = ({
  baseType,
  attackingTypeInfo,
  sectionTitleFlag,
}) => {
  // Sorting like this brings the identical array ('fire', 'fire') to the top.
  const typeCombinations = typeList
    .map(type => [baseType, type])
    .sort((a, b) => {
      if (a[0] === a[1]) return -1
      if (b[0] === b[1]) return 1
      return 0
    })

  return (
    <section>
      {sectionTitleFlag && <SectionTitle> Type Chart </SectionTitle>}
      <div className="flex justify-center">
        <div className="overflow-auto">
          <div className="grid-cols-dual-type-chart grid">
            {/* First row */}
            <div className="first-row contents">
              {/* Corner cell */}
              <div className="border-bd-light dark:border-bd-dark -mb-px flex h-9 flex-col items-center justify-center rounded-sm border text-[10px]">
                <span> ATTACK → </span>
                <span> DEFENCE ↴ </span>
              </div>

              {/* First row */}
              <ScoreCell>Score</ScoreCell>
              {typeList.map(type => (
                <MiniTypeCard typeName={type} key={type} />
              ))}
            </div>

            {/* Other cells */}
            {typeCombinations.map(typeCombo => (
              <TableRow
                key={`${typeCombo[0]} ${typeCombo[1]}`}
                attackingTypeInfo={attackingTypeInfo}
                typeCombination={typeCombo}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
