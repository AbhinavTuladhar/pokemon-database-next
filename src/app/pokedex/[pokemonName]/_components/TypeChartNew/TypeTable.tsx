import React, { FC } from 'react'

import TypeRow from './TypeRow'

interface TableProps {
  defenceInfo: Array<{
    type: string
    multiplier: number
  }>
  defendingType: string
  abilityName?: string
}

const TypeTable: FC<TableProps> = ({ defenceInfo, defendingType, abilityName }) => (
  <div className="flex flex-col justify-center gap-x-px overflow-x-auto min-[720px]:flex-row md:flex-row md-lg:flex-col">
    <TypeRow
      typeDefenceInfo={defenceInfo.slice(0, 9)}
      extraClassName="mt-6"
      defendingType={defendingType}
      abilityName={abilityName}
    />
    <TypeRow
      typeDefenceInfo={defenceInfo.slice(9)}
      extraClassName="mt-2 md:mt-6 sm:mt-6"
      defendingType={defendingType}
      abilityName={abilityName}
    />
  </div>
)

export default TypeTable
