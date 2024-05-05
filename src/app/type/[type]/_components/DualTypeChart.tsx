import { FC } from 'react'

import { MiniTypeCard, TypeCard, TypeMultiplierBox } from '@/components/cards'
import { Tooltip } from '@/components/client-components'
import typeList from '@/data/typeList'
import formatName from '@/utils/formatName'
import multiplierToString from '@/utils/multiplierToString'
import calculateOffensiveTypeEffectiveness from '@/utils/typeEffectivenessOffensive'

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

  // This is for the first row.
  const firstRow = ['', ...typeList]?.map((type, index) => {
    if (index === 0) {
      return <div className="h-[37px] w-16 border border-[#292e38]" key={index} />
    } else {
      return <MiniTypeCard typeName={type} key={index} />
    }
  })

  // To take into account the row header.
  const dummy = ['', '']

  const tableRows = typeList?.map((type, rowIndex) => {
    // For each row, we want only those subarrays in which the first item is equal to `type`
    const cellData = typeRows?.filter(subarray => subarray === null || subarray[0] === type)

    const cellDivs = [dummy, ...cellData]?.map((arr, cellIndex) => {
      const [firstType, secondType] = arr
      const attackingTypeInfo = {
        doubleDamageTo,
        halfDamageTo,
        noDamageTo,
      }
      const combinedTypeString = arr.map(type => formatName(type)).join('/')
      const multiplierValue =
        firstType !== '' || firstType !== null
          ? calculateOffensiveTypeEffectiveness(arr, attackingTypeInfo)
          : 1
      const multiplierString = multiplierToString(multiplierValue)

      const tooltipContent = `${formatName(mainType)} → ${combinedTypeString} = ${multiplierString}`

      if (cellIndex === 0) {
        return <TypeCard typeName={type} variant="big" key={cellIndex} />
      } else if (firstType === secondType) {
        return <TypeMultiplierBox multiplier={1} className="bg-gray-700" key={cellIndex} />
      } else {
        return (
          <div data-tooltip-id="my-tooltip" data-tooltip-content={tooltipContent} key={cellIndex}>
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
          <Tooltip id="my-tooltip" style={{ fontSize: '0.75rem' }} />
        </div>
      </div>
    </>
  )
}
