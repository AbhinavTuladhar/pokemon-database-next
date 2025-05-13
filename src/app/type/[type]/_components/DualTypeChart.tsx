import { FC } from 'react'

import typeList from '@/data/typeList'
import { MiniTypeCard } from '@/features/pokemon/components/MiniTypeCard'
import { TypeCard } from '@/features/pokemon/components/TypeCard'
import { TypeMultiplierBox } from '@/features/pokemon/components/TypeMultiplierBox'
import formatName from '@/utils/formatName'
import multiplierToString from '@/utils/multiplierToString'
import calculateOffensiveTypeEffectiveness from '@/utils/typeEffectivenessOffensive'

// FirstRow component to display the first row with type cards
const FirstRow: FC = () => (
  <>
    <div className="border-bd-light dark:border-bd-dark -mb-px flex h-[36px] w-16 flex-col items-center justify-center rounded-sm border text-[10px]" />
    {typeList.map(type => (
      <MiniTypeCard typeName={type} key={type} />
    ))}
  </>
)

// TypeEffectivenessCell component to display a cell with type effectiveness data
const TypeEffectivenessCell: FC<{
  mainType: string
  typeCombo: [string, string]
  doubleDamageTo: string[]
  halfDamageTo: string[]
  noDamageTo: string[]
}> = ({ mainType, typeCombo, doubleDamageTo, halfDamageTo, noDamageTo }) => {
  const [firstType, secondType] = typeCombo
  const combinedTypeString = typeCombo.map(combo => formatName(combo)).join('/')
  const multiplierValue =
    firstType === secondType
      ? 1
      : calculateOffensiveTypeEffectiveness([firstType, secondType], {
          doubleDamageTo,
          halfDamageTo,
          noDamageTo,
        })
  const multiplierString = multiplierToString(multiplierValue)
  const tooltipContent = `${formatName(mainType)} → ${combinedTypeString} = ${multiplierString}`

  return firstType === secondType ? (
    <TypeMultiplierBox multiplier={1} className="bg-zinc-200 dark:bg-gray-700" key={firstType} />
  ) : (
    <div
      data-tooltip-id="my-tooltip"
      data-tooltip-content={tooltipContent}
      key={`${firstType}-${secondType}`}
    >
      <TypeMultiplierBox multiplier={multiplierValue} />
    </div>
  )
}

// TypeRow component to display a row of type effectiveness data
const TypeRow: FC<{
  mainType: string
  typeRow: string
  doubleDamageTo: string[]
  halfDamageTo: string[]
  noDamageTo: string[]
}> = ({ mainType, typeRow, doubleDamageTo, halfDamageTo, noDamageTo }) => {
  const typeCombos = typeList.map(innerType => [typeRow, innerType] as [string, string])

  return (
    <>
      <TypeCard variant="big" key={typeRow} typeName={typeRow} />
      {typeCombos.map(typeCombo => (
        <TypeEffectivenessCell
          mainType={mainType}
          typeCombo={typeCombo}
          doubleDamageTo={doubleDamageTo}
          halfDamageTo={halfDamageTo}
          noDamageTo={noDamageTo}
          key={typeCombo.join('-')}
        />
      ))}
    </>
  )
}

interface DualTypeChartProps {
  typeName: string
  doubleDamageTo: string[]
  halfDamageTo: string[]
  noDamageTo: string[]
}

// DualTypeChart component to display the entire dual-type chart
export const DualTypeChart: FC<DualTypeChartProps> = ({
  typeName,
  doubleDamageTo,
  halfDamageTo,
  noDamageTo,
}) => {
  return (
    <div className="overflow-auto">
      <div className="inline-flex">
        <div className="grid-cols-type-chart grid">
          <FirstRow />
          {typeList.map(typeRow => (
            <TypeRow
              key={typeRow}
              mainType={typeName}
              typeRow={typeRow}
              doubleDamageTo={doubleDamageTo}
              halfDamageTo={halfDamageTo}
              noDamageTo={noDamageTo}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
