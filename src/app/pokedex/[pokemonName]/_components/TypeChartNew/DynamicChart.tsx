import React, { FC } from 'react'

import specialAbilityList from '@/data/specialAbilityList'
import modifyTypeChart from '@/utils/modifyTypeChart'

import TabbedCharts from './TabbedCharts'
import TypeRow from './TypeRow'

interface TypeChart {
  type: string
  multiplier: number
}

interface FinalOutput {
  areAllSame: boolean
  typeCharts: Array<{
    abilityName: string
    defenceInfo: Array<TypeChart>
  }>
}

const handleAbilityAgain = (
  typeChart: Array<TypeChart>,
  abilityNames: Array<string>,
): FinalOutput => {
  /**
   * If there's only ability and it is in the special ability list, modify the type chart and return
   */
  if (abilityNames.length === 1 && specialAbilityList.includes(abilityNames[0])) {
    return {
      areAllSame: true,
      typeCharts: [
        {
          abilityName: abilityNames[0],
          defenceInfo: modifyTypeChart(typeChart, abilityNames[0]),
        },
      ],
    }
  }

  /**
   * If there's more than one ability and none are in the special ability array, return as normal.
   */
  if (
    abilityNames.length > 1 &&
    !specialAbilityList.some(ability => abilityNames.includes(ability))
  ) {
    return {
      areAllSame: true,
      typeCharts: abilityNames.map(ability => ({
        abilityName: ability,
        defenceInfo: typeChart,
      })),
    }
  }

  /**
   * Final case: more than one ability and at least once is in the special ability list.
   * Modify the type chart, and return it along with the ability name.
   */
  return {
    areAllSame: false,
    typeCharts: abilityNames.map(ability => ({
      abilityName: ability,
      defenceInfo: modifyTypeChart(typeChart, ability),
    })),
  }
}
interface ChartProps {
  typeDefenceInfo: Array<TypeChart>
  defendingType: string
  abilityNames: Array<string>
}

const DynamicChart: FC<ChartProps> = ({ typeDefenceInfo, defendingType, abilityNames }) => {
  const { areAllSame, typeCharts } = handleAbilityAgain(typeDefenceInfo, abilityNames)

  /**
   * TODO: If all are the same, then render only one chart.
   * TODO: If not, render tabs along with the corresponding charts.
   */

  return (
    <div className="flex flex-col justify-center gap-x-px overflow-x-auto min-[720px]:flex-row md:flex-row mdlg:flex-col">
      {areAllSame ? (
        <>
          <TypeRow
            typeDefenceInfo={typeCharts[0].defenceInfo.slice(0, 9)}
            extraClassName="mt-6"
            defendingType={defendingType}
          />
          <TypeRow
            typeDefenceInfo={typeCharts[0].defenceInfo.slice(9)}
            extraClassName="mt-2 md:mt-6 sm:mt-6"
            defendingType={defendingType}
          />
        </>
      ) : (
        <TabbedCharts typeCharts={typeCharts} defendingType={defendingType} />
      )}
    </div>
  )
}

export default DynamicChart
