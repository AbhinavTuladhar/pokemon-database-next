import React, { FC, Fragment, PropsWithChildren } from 'react'

import { MiniTypeCard, TypeCard, TypeMultiplierBox } from '@/components/cards'
import { SectionTitle } from '@/components/containers'
import typeList from '@/data/typeList'
import { TransformedType } from '@/types'
import formatName from '@/utils/formatName'
import multiplierToString from '@/utils/multiplierToString'
import calculateOffensiveTypeEffectiveness from '@/utils/typeEffectivenessOffensive'

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
  <div className="h-[37px] w-[46px] border border-bd-light p-2 text-center text-xs dark:border-bd-dark">
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
    <Fragment key={`${firstType} ${secondType}`}>
      <div className="flex flex-row gap-x-px">
        <TypeCard key={`${firstType} ${secondType}`} typeName={firstType} variant="big" />
        {firstType !== secondType ? (
          <TypeCard key={`${firstType} ${secondType}`} typeName={secondType} variant="big" />
        ) : (
          <div className="grid w-16 place-items-center rounded border border-bd-light bg-zinc-400 text-white dark:border-bd-dark">
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
    </Fragment>
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
          <div className="grid grid-cols-dual-type-chart">
            {/* Corner cell */}
            <div className="-mb-px flex h-[36px] flex-col items-center justify-center rounded border border-bd-light text-[10px] dark:border-bd-dark">
              <span> ATTACK → </span>
              <span> DEFENCE ↴ </span>
            </div>

            {/* First row */}
            <ScoreCell>Score</ScoreCell>
            {typeList.map(type => (
              <MiniTypeCard typeName={type} key={type} />
            ))}

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
