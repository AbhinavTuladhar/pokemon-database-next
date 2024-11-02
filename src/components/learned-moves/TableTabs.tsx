'use client'

import React, { FC, useState } from 'react'
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs'

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
      <TabList className="border-b-bd-light dark:border-b-bd-dark flex gap-x-2 border-b pl-0 dark:border-b-table-border sm:pl-4">
        {tabNames.map((tab, tabIndex) => (
          <Tab
            className="dark:bg-hdr-dark grid translate-y-px cursor-pointer place-items-center whitespace-break-spaces rounded-tl-lg rounded-tr-lg border-x border-t border-gray-300 bg-neutral-200 p-3  duration-300 hover:text-red-600 hover:underline dark:border-gray-500 dark:hover:text-red-400 dark:hover:brightness-110"
            selectedClassName="text-blue-500 hover:bg-neutral-50 dark:hover:bg-hdr-dark dark:!bg-gray-800 bg-neutral-50 hover:!text-blue-500"
            key={tab + tabIndex}
          >
            {tab}
          </Tab>
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
