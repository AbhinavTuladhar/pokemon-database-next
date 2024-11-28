'use client'

import React, { FC, useState } from 'react'
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs'

import { PokeCard } from '@/components/cards'
import { TransformedPokemon } from '@/types'

import { PokeCardContainer } from './PokeCardContainer'
import { PokemonTable } from './PokemonTable'

interface ViewTabsProps {
  pokemonData: Array<TransformedPokemon>
}

export const ViewTabs: FC<ViewTabsProps> = ({ pokemonData }) => {
  const [tabIndex, setTabIndex] = useState(0)

  const tabNames = ['Cards', 'Table']

  const handleTabChange = (newIndex: number) => {
    setTabIndex(newIndex)
  }

  return (
    <Tabs selectedIndex={tabIndex} onSelect={index => handleTabChange(index)}>
      <TabList className="dark:border-b-table-border flex flex-wrap gap-x-2 border-b border-b-bd-light pl-0 dark:border-b-bd-dark sm:pl-4">
        {tabNames.map((tab, tabIndex) => (
          <Tab
            key={tab + tabIndex}
            className="grid translate-y-px cursor-pointer place-items-center whitespace-break-spaces rounded-tl-lg rounded-tr-lg border-x border-t border-gray-300 bg-neutral-200 px-4 py-2 duration-300 hover:text-red-600  hover:underline dark:border-gray-500 dark:bg-hdr-dark dark:hover:text-red-400 dark:hover:brightness-110 max-lg:flex-1"
            selectedClassName="text-blue-500 hover:bg-neutral-50 dark:hover:bg-hdr-dark dark:!bg-gray-800 bg-neutral-50 hover:!text-blue-500"
            // onClick={() => handleTabChange(tab)}
          >
            {tab}
          </Tab>
        ))}
      </TabList>

      <TabPanel>
        <div className="mt-4">
          <PokeCardContainer>
            {pokemonData.map(pokemon => {
              const { id, name, types, front_default: defaultSprite = '' } = pokemon
              return (
                <PokeCard
                  key={id}
                  id={id}
                  name={name}
                  types={types}
                  defaultSprite={defaultSprite}
                />
              )
            })}
          </PokeCardContainer>
        </div>
      </TabPanel>
      <TabPanel>
        <div className="mt-4">
          <PokemonTable pokemonData={pokemonData} />
        </div>
      </TabPanel>
    </Tabs>
  )
}
