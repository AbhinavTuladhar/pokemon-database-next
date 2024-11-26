'use client'

import { FC, useEffect, useState } from 'react'
import classNames from 'classnames'
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
      <TabList className="dark:border-b-table-border flex flex-wrap gap-x-2 border-b border-b-bd-light pl-0 dark:border-b-bd-dark sm:pl-4">
        {tabNames.map((tab, tabIndex) => (
          <Tab
            key={tab + tabIndex}
            className="grid translate-y-px cursor-pointer place-items-center whitespace-break-spaces rounded-tl-lg rounded-tr-lg border-x border-t border-gray-300 bg-neutral-200 px-4 py-2 duration-300 hover:text-red-600  hover:underline dark:border-gray-500 dark:bg-hdr-dark dark:hover:text-red-400 dark:hover:brightness-110 max-lg:flex-1"
            selectedClassName="text-blue-500 hover:bg-neutral-50 dark:hover:bg-hdr-dark dark:!bg-gray-800 bg-neutral-50 hover:!text-blue-500"
            // onClick={() => handleTabChange(tab)}
          >
            {formatName(tab)}
          </Tab>
        ))}
      </TabList>

      {regionData.map((region, regionIndex) => {
        const { locations } = region
        return (
          <TabPanel key={region.regionName + regionIndex}>
            <section
              className={classNames(
                'columns-1 pt-4 min-[420px]:columns-2 min-[640px]:columns-3 md:columns-4 lg:columns-5 xl:columns-6',
              )}
            >
              {locations.map((location, locationIndex) => (
                <div key={location.locationName + locationIndex}>
                  <BlueLink href={location.localUrl}>{formatName(location.locationName)}</BlueLink>
                </div>
              ))}
            </section>
          </TabPanel>
        )
      })}
    </Tabs>
  )
}
