import { FC } from 'react'

import { MiniTypeCard, TypeMultiplierBox } from '@/components/cards'
import formatName from '@/utils/formatName'
import multiplierToString from '@/utils/multiplierToString'

interface TypeRowProps {
  typeDefenceInfo: Array<{
    type: string
    multiplier: number
  }>
  extraClassName: string
  defendingType: string
}

const TypeRow: FC<TypeRowProps> = ({ typeDefenceInfo, extraClassName, defendingType }) => (
  <div
    className={`mx-auto flex flex-row justify-center gap-x-px overflow-x-hidden overflow-y-hidden sm:mx-0 ${extraClassName}`}
  >
    {typeDefenceInfo.map((row, rowIndex) => {
      const { multiplier, type } = row
      const effectivenessString = multiplierToString(multiplier)
      const tooltipContent = `${formatName(type)} → ${defendingType} = ${effectivenessString}`
      return (
        <div className="flex w-9 flex-col text-center" key={rowIndex}>
          <MiniTypeCard typeName={row.type} />
          <div data-tooltip-id="my-tooltip" data-tooltip-content={tooltipContent} id={row.type}>
            <TypeMultiplierBox multiplier={row.multiplier} />
          </div>
        </div>
      )
    })}
  </div>
)

export default TypeRow
