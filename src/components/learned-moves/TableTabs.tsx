'use client'

import React, { FC, useState } from 'react'

import { Tab, TabList, TabPanel, Tabs } from '@/components/react-tabs'
import { versionNameBreakMap } from '@/data/gameNameMap'
import formatName from '@/utils/formatName'

import AllMoveTables from './AllMoveTables'
import { FinalMoveData } from './types'

interface TableTabProps {
  pokemonName: string
  movesData: FinalMoveData
  versionGroupNames: Array<string>
}

const TableTabs: FC<TableTabProps> = ({ pokemonName, movesData, versionGroupNames }) => {
  const [tabIndex, setTabIndex] = useState(0)

  const tabNames = versionGroupNames.map(versionName => {
    // Break the unified version group names into their individual forms
    const versionNames = versionNameBreakMap[versionName]
    return versionNames.map(formatName).join(' / ')
  })

  const handleTabChange = (newIndex: number) => {
    setTabIndex(newIndex)
  }

  return (
    <Tabs className="mt-4" selectedIndex={tabIndex} onSelect={index => handleTabChange(index)}>
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
