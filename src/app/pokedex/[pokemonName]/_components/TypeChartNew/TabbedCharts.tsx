'use client'

import { FC, useState } from 'react'
import classNames from 'classnames'

import { Tab, TabList, TabPanel, Tabs } from '@/components/react-tabs'
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
      <TabList extraClassName="flex flex-wrap gap-x-1 sm:pl-2">
        {tabNames.map((tab, tabIndex) => (
          <Tab
            key={tab + tabIndex}
            extraClassName={classNames('flex min-w-40 flex-1 justify-center p-1.5 text-sm', {
              'last:lg-xl::w-full last:border-t last:border-t-gray-300! dark:last:border-t-gray-500!':
                tabNames.length > 2,
            })}
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
