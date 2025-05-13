'use client'

import React, { FC, useState } from 'react'

import { PokeCardContainer } from '@/components/containers'
import { Tab, TabList, TabPanel, Tabs } from '@/components/react-tabs'
import { PokeCard } from '@/features/pokemon/components/PokeCard'

import { CardProps, TableProps } from '../_types'

import { PokemonTable } from './PokemonTable'

interface ViewTabsProps {
  cardData: Array<CardProps>
  tableData: Array<TableProps>
}

export const ViewTabs: FC<ViewTabsProps> = ({ cardData, tableData }) => {
  const [tabIndex, setTabIndex] = useState(0)

  const tabNames = ['Cards', 'Table']

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

      <TabPanel>
        <PokeCardContainer>
          {cardData.map(pokemon => {
            const { id, name, types, front_default: defaultSprite = '' } = pokemon
            return (
              <PokeCard key={id} id={id} name={name} types={types} defaultSprite={defaultSprite} />
            )
          })}
        </PokeCardContainer>
      </TabPanel>
      <TabPanel>
        <PokemonTable tableData={tableData} />
      </TabPanel>
    </Tabs>
  )
}
