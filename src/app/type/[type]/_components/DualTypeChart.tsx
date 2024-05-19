import { FC, Fragment } from 'react'

import { MiniTypeCard, TypeCard, TypeMultiplierBox } from '@/components/cards'
import typeList from '@/data/typeList'
import formatName from '@/utils/formatName'
import multiplierToString from '@/utils/multiplierToString'
import calculateOffensiveTypeEffectiveness from '@/utils/typeEffectivenessOffensive'

const FirstRow = () => (
  <>
    <div className="-mb-px flex h-[36px] w-16 flex-col items-center justify-center rounded border border-gray-100 text-[10px] dark:border-table-border" />
    {typeList.map(type => (
      <MiniTypeCard typeName={type} key={type} />
    ))}
  </>
)

interface DualTypeChartProps {
  typeName: string
  doubleDamageTo: Array<string>
  halfDamageTo: Array<string>
  noDamageTo: Array<string>
}

export const DualTypeChart: FC<DualTypeChartProps> = ({
  doubleDamageTo,
  halfDamageTo,
  noDamageTo,
  typeName,
}) => {
  const mainType = typeName

  // Calculate all the dual-type combinations possible
  const typeRows = typeList.flatMap(type => {
    return typeList.map(innerType => {
      return [type, innerType]
    })
  })

  const newRowsAgain = typeList.map(typeRow => {
    const test = typeRows.filter(row => row[0] === typeRow)
    const cellData = test.map(typeCombo => {
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

      if (firstType === secondType) {
        return <TypeMultiplierBox multiplier={1} className="bg-zinc-200 dark:bg-gray-700" key={2} />
      }

      return (
        <div data-tooltip-id="my-tooltip" data-tooltip-content={tooltipContent} key={3}>
          <TypeMultiplierBox multiplier={multiplierValue} />
        </div>
      )
    })

    return (
      <Fragment key={typeRow}>
        <TypeCard variant="big" key={typeRow} typeName={typeRow} />
        {cellData}
      </Fragment>
    )
  })

  return (
    <div className="overflow-auto">
      <div className="inline-flex">
        <div className="grid grid-cols-type-chart">
          <FirstRow />
          {newRowsAgain}
        </div>
      </div>
    </div>
  )
}
