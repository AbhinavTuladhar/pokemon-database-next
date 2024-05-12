'use client'

import { FC, useState } from 'react'
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs'

import formatName from '@/utils/formatName'

import TypeRow from './TypeRow'

interface TypeChart {
  type: string
  multiplier: number
}

interface TabProps {
  typeCharts: Array<{
    abilityName: string
    defenceInfo: Array<TypeChart>
  }>
  defendingType: string
}

const TabbedCharts: FC<TabProps> = ({ typeCharts, defendingType }) => {
  const tabNames = typeCharts.map(({ abilityName }) => `${formatName(abilityName)} ability`)
  const [tabIndex, setTabIndex] = useState(0)

  const handleTabChange = (newIndex: number) => {
    setTabIndex(newIndex)
  }

  return (
    <Tabs selectedIndex={tabIndex} onSelect={(index: number) => handleTabChange(index)}>
      <TabList className="flex flex-wrap gap-x-1 ">
        {tabNames.map((tab, tabIndex) => (
          <Tab
            key={tabIndex}
            className="flex w-20 flex-1 justify-center border-b-2 border-transparent bg-neutral-200 p-1.5 text-sm duration-300 last:w-full last:flex-none hover:cursor-pointer hover:bg-neutral-300 dark:bg-table-header dark:hover:border-white dark:hover:text-white dark:hover:brightness-110"
            selectedClassName="!border-blue-500 text-blue-500"
          >
            {tab}
          </Tab>
        ))}
      </TabList>

      {typeCharts.map(({ abilityName, defenceInfo }, index) => (
        <TabPanel key={index}>
          <div className="flex flex-col justify-center gap-x-px overflow-x-auto min-[720px]:flex-row md:flex-row mdlg:flex-col">
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
        </TabPanel>
      ))}
    </Tabs>
  )
}

export default TabbedCharts
