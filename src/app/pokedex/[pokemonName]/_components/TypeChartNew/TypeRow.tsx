import { FC } from 'react'

import specialAbilityList from '@/data/specialAbilityList'
import { MiniTypeCard } from '@/features/pokemon/components/TypeCard'
import { TypeMultiplierBox } from '@/features/pokemon/components/TypeMultiplierBox'
import formatName from '@/utils/formatName'
import multiplierToString from '@/utils/multiplierToString'

interface TypeRowProps {
  typeDefenceInfo: Array<{
    type: string
    multiplier: number
  }>
  extraClassName: string
  defendingType: string
  abilityName?: string
}

const TypeRow: FC<TypeRowProps> = ({
  typeDefenceInfo,
  extraClassName,
  defendingType,
  abilityName,
}) => {
  // Check if the ability is in the special ability list. If yes, show it in the tooltip for every box
  let abilityToShow: string

  if (abilityName && specialAbilityList.includes(abilityName)) {
    abilityToShow = abilityName
  } else {
    abilityToShow = ''
  }

  return (
    <div
      className={`mx-auto flex flex-row justify-center gap-x-px overflow-x-hidden overflow-y-hidden sm:mx-0 ${extraClassName}`}
    >
      {typeDefenceInfo.map((row, rowIndex) => {
        const { multiplier, type } = row
        const effectivenessString = multiplierToString(multiplier)
        const abilityToShowText = abilityToShow ? `(${formatName(abilityToShow)})` : ''
        const tooltipContent = `${formatName(type)} → ${defendingType} ${abilityToShowText} = ${effectivenessString}`

        return (
          <div className="flex w-9 flex-col text-center" key={row.type + rowIndex}>
            <MiniTypeCard typeName={row.type} />
            <div data-tooltip-id="my-tooltip" data-tooltip-content={tooltipContent} id={row.type}>
              <TypeMultiplierBox multiplier={row.multiplier} />
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default TypeRow
