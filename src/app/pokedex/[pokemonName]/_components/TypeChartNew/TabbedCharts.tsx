'use client'

import { FC, useState } from 'react'
import classNames from 'classnames'
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs'

import formatName from '@/utils/formatName'

import TypeTable from './TypeTable'

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

  // Classnames is used to change styles when there are more than 2 abilities, to match with the
  // styles of the actual website.

  return (
    <Tabs
      className="mt-2"
      selectedIndex={tabIndex}
      onSelect={(index: number) => handleTabChange(index)}
    >
      <TabList className="flex flex-wrap gap-x-1 ">
        {tabNames.map((tab, tabIndex) => (
          <Tab
            key={tab + tabIndex}
            className={classNames(
              'flex w-20 flex-1 justify-center border-b-2 border-transparent bg-neutral-200 p-1.5 text-sm duration-300 hover:cursor-pointer hover:bg-neutral-300 dark:bg-hdr-dark dark:hover:border-white dark:hover:text-white dark:hover:brightness-110',
              {
                'last:w-full last:flex-none last:border-t last:!border-t-slate-300 dark:last:!border-t-slate-700':
                  tabNames.length > 2,
              },
            )}
            selectedClassName="!border-blue-500 text-blue-500"
          >
            {tab}
          </Tab>
        ))}
      </TabList>

      {typeCharts.map(({ abilityName, defenceInfo }, index) => (
        <TabPanel key={abilityName + index}>
          <TypeTable
            defenceInfo={defenceInfo}
            defendingType={defendingType}
            abilityName={abilityName}
          />
        </TabPanel>
      ))}
    </Tabs>
  )
}

export default TabbedCharts
