import React, { FC, PropsWithChildren } from 'react'

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
  let multiplierValues: Array<{ multiplier: number; type: string }> = []

  typeList.forEach((type, index) => {
    const [firstType, secondType] = typeCombo
    const multiplierValue = calculateOffensiveTypeEffectiveness(
      firstType === secondType ? [firstType] : typeCombo,
      attackingTypeInfo[index],
    )
    score += multiplierValue
    multiplierValues.push({ multiplier: multiplierValue, type: type })
  })
  return { score, multiplierValues }
}

const ScoreCell: FC<PropsWithChildren> = ({ children }) => (
  <div className="h-[37px] w-[46px] border border-gray-200 p-2 text-center text-xs dark:border-table-border">
    {children}
  </div>
)

const TableRow: FC<RowProps> = ({ typeCombination, attackingTypeInfo }) => {
  const { score, multiplierValues } = calculateScoresAndMultipliers(
    typeCombination,
    attackingTypeInfo,
  )

  const typeComboString = typeCombination.map(formatName).join('/')

  return (
    <div className="flex">
      <ScoreCell>{score}</ScoreCell>
      {multiplierValues.map(({ multiplier, type }, index) => {
        const multiplierString = multiplierToString(multiplier)
        const tooltipContent = `${formatName(type)} → ${typeComboString} = ${multiplierString}`
        return (
          <div key={index} data-tooltip-content={tooltipContent} data-tooltip-id="my-tooltip">
            <TypeMultiplierBox multiplier={multiplier} key={index} />
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

  const cornerDiv = (
    <div className="-mb-px flex h-[36px] flex-col items-center justify-center rounded border border-gray-200 text-[10px] dark:border-table-border">
      <span> ATTACK → </span>
      <span> DEFENCE ↴ </span>
    </div>
  )

  const firstColumnCards = typeCombinations.map((type, index) => {
    const [firstType, secondType] = type
    return (
      <div className="flex gap-x-px" key={index}>
        <TypeCard key={index} typeName={firstType} variant="big" />
        {firstType !== secondType ? (
          <TypeCard key={index} typeName={secondType} variant="big" />
        ) : null}
      </div>
    )
  })

  const firstRow = (
    <div className="flex gap-x-px">
      <ScoreCell>Score</ScoreCell>
      {typeList.map((type, index) => (
        <MiniTypeCard typeName={type} key={index} />
      ))}
    </div>
  )

  const otherRows = typeCombinations.map((typeCombo, rowIndex) => (
    <TableRow key={rowIndex} attackingTypeInfo={attackingTypeInfo} typeCombination={typeCombo} />
  ))

  const tableRows = (
    <div className="flex flex-col">
      {firstRow}
      {otherRows}
    </div>
  )

  return (
    <section>
      {sectionTitleFlag && <SectionTitle> Type Chart </SectionTitle>}
      <div className="overflow-auto">
        <div className="flex gap-x-px">
          <div className="flex flex-col gap-y-px">
            {cornerDiv}
            {firstColumnCards}
          </div>
          <div className="flex flex-col gap-y-px">{tableRows}</div>
        </div>
      </div>
    </section>
  )
}
