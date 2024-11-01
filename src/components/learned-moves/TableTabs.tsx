'use client'

import React, { FC, useState } from 'react'
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs'

import AllMoveTables from './AllMoveTables'
import { FinalMoveData } from './types'

interface TableTabProps {
  pokemonName: string
  movesData: FinalMoveData
  versionGroupNames: Array<string>
}

const TableTabs: FC<TableTabProps> = ({ pokemonName, movesData, versionGroupNames }) => {
  const tabNames = ['Red', 'Blue']
  const [tabIndex, setTabIndex] = useState(0)

  const handleTabChange = (newIndex: number) => {
    setTabIndex(newIndex)
  }

  return (
    <Tabs selectedIndex={tabIndex} onSelect={index => handleTabChange(index)}>
      <TabList>
        {tabNames.map((tab, tabIndex) => (
          <Tab key={tab + tabIndex}>{tab}</Tab>
        ))}
      </TabList>
      {versionGroupNames.map(versionName => (
        <TabPanel key={versionName}>
          <AllMoveTables
            pokemonName={pokemonName}
            movesData={movesData}
            versionGroupName={versionName}
          />
        </TabPanel>
      ))}
    </Tabs>
  )
}

export default TableTabs
