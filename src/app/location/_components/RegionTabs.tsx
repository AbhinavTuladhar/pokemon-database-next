'use client'

import { FC, useEffect, useState } from 'react'
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs'

import BlueLink from '@/components/link'
import formatName from '@/utils/formatName'

interface RegionData {
  regionName: string
  locations: Array<{
    locationName: string
    actualUrl: string
    localUrl: string
  }>
}

interface PanelProps {
  regionData: Array<RegionData>
}

export const RegionTabs: FC<PanelProps> = ({ regionData }) => {
  const tabNames = regionData.map(region => region.regionName)
  const [tabIndex, setTabIndex] = useState(0)

  useEffect(() => {
    const storedIndex = sessionStorage.getItem('selectedRegionIndex')
    const initialIndex = storedIndex ? parseInt(storedIndex) : 0
    setTabIndex(initialIndex)
  }, [])

  const handleTabChange = (newIndex: number) => {
    setTabIndex(newIndex)
    sessionStorage.setItem('selectedRegionIndex', String(newIndex))
  }

  // Alola has slightly long names, so we provide a special exception to it.
  return (
    <Tabs selectedIndex={tabIndex} onSelect={index => handleTabChange(index)}>
      <TabList className="flex flex-wrap">
        {tabNames.map((tab, tabIndex) => (
          <Tab
            key={tab + tabIndex}
            className="flex w-20 flex-1 justify-center border-b-2 border-transparent bg-neutral-200 p-3 duration-300 hover:cursor-pointer hover:bg-neutral-300 dark:bg-hdr-dark dark:hover:border-white dark:hover:text-white dark:hover:brightness-110"
            selectedClassName="!border-blue-500 text-blue-500"
            // onClick={() => handleTabChange(tab)}
          >
            {formatName(tab)}
          </Tab>
        ))}
      </TabList>

      {regionData.map((region, regionIndex) => {
        const { locations, regionName } = region
        return (
          <TabPanel key={region.regionName + regionIndex}>
            <section
              className={`grid ${regionName === 'alola' ? 'grid-cols-flexible-alola' : 'grid-cols-flexible'} gap-x-4 pt-4`}
            >
              {locations.map((location, locationIndex) => (
                <span key={location.locationName + locationIndex}>
                  <BlueLink href={location.localUrl}>{formatName(location.locationName)}</BlueLink>
                </span>
              ))}
            </section>
          </TabPanel>
        )
      })}
    </Tabs>
  )
}
