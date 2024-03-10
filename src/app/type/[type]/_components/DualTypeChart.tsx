import { FC, JSX } from 'react'

import MiniTypeCard from '@/components/MiniTypeCard'
import { Tooltip } from '@/components/ReactTooltip'
import TypeCard from '@/components/TypeCard'
import TypeMultiplierBox from '@/components/TypeMultiplierBox'
import formatName from '@/utils/formatName'
import multiplierToString from '@/utils/multiplierToString'
import calculateOffensiveTypeEffectiveness from '@/utils/typeEffectivenessOffensive'

interface DualTypeChartProps {
  typeName: string
  doubleDamageTo: Array<string>
  halfDamageTo: Array<string>
  noDamageTo: Array<string>
}

const DualTypeChart: FC<DualTypeChartProps> = ({
  doubleDamageTo,
  halfDamageTo,
  noDamageTo,
  typeName,
}) => {
  const mainType = typeName
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

  const toolTips: Array<JSX.Element> = []

  // Calculate all the dual-type combinations possible
  const typeRows = typeList.flatMap((type) => {
    return typeList.map((innerType) => {
      return [type, innerType]
    })
  })

  // This is for the first row.
  const firstRow = ['', ...typeList]?.map((type, index) => {
    if (index === 0) {
      return <div className="h-[37px] w-16 border border-slate-900" key={index} />
    } else {
      return <MiniTypeCard typeName={type} key={index} />
    }
  })

  // To take into account the row header.
  const dummy = ['', '']

  const tableRows = typeList?.map((type, rowIndex) => {
    // For each row, we want only those subarrays in which the first item is equal to `type`
    const cellData = typeRows?.filter((subarray) => subarray === null || subarray[0] === type)

    const cellDivs = [dummy, ...cellData]?.map((arr, cellIndex) => {
      const [firstType, secondType] = arr
      const attackingTypeInfo = {
        doubleDamageTo,
        halfDamageTo,
        noDamageTo,
      }
      const combinedTypeString = arr.map((type) => formatName(type)).join('/')
      const multiplierValue =
        firstType !== '' || firstType !== null
          ? calculateOffensiveTypeEffectiveness(arr, attackingTypeInfo)
          : 1
      const multiplierString = multiplierToString(multiplierValue)

      toolTips.push(
        <Tooltip anchorSelect={`#${firstType || 'a'}-${secondType || 'b'}`} key={cellIndex}>
          <span className="text-xs">{`${formatName(mainType)} → ${combinedTypeString} = ${multiplierString}`}</span>
        </Tooltip>,
      )

      if (cellIndex === 0) {
        return <TypeCard typeName={type} variant="big" key={cellIndex} />
      } else if (firstType === secondType) {
        return <TypeMultiplierBox multiplier={1} className="bg-gray-700" key={cellIndex} />
      } else {
        return (
          <div id={`${firstType}-${secondType}`} key={cellIndex}>
            <TypeMultiplierBox multiplier={multiplierValue} />
          </div>
        )
      }
    })

    return (
      <div className="gap-x flex flex-row items-end" key={rowIndex}>
        {cellDivs}
      </div>
    )
  })

  return (
    <>
      <div className="overflow-auto">
        <div className="inline-flex flex-col">
          <div className="flex flex-row gap-x-px">{firstRow}</div>
          <>{tableRows}</>
          <>{toolTips}</>
        </div>
      </div>
    </>
  )
}

export default DualTypeChart
