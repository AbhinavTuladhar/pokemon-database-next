'use client'

import { FC } from 'react'
import { Tab, TabList, TabPanel,Tabs } from 'react-tabs'

import BlueLink from '@/components/BlueLink'
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

const RegionTabs: FC<PanelProps> = ({ regionData }) => {
  const tabNames = regionData.map((region) => region.regionName)

  // Alola has slightly long names, so we provide a special exception to it.
  return (
    <Tabs>
      <TabList className="flex">
        {tabNames.map((tab, tabIndex) => (
          <Tab
            key={tabIndex}
            className="flex w-20 flex-1 justify-center border-b-2 border-transparent bg-gray-900 py-3 duration-300 hover:cursor-pointer hover:border-white hover:text-white hover:brightness-110"
            selectedClassName="!border-blue-500 text-blue-500"
          >
            {formatName(tab)}
          </Tab>
        ))}
      </TabList>

      {regionData.map((region, regionIndex) => {
        const { locations, regionName } = region
        return (
          <TabPanel key={regionIndex}>
            <section
              className={`grid ${regionName === 'alola' ? 'grid-cols-flexible-alola' : 'grid-cols-flexible'} gap-x-4 pt-4`}
            >
              {locations.map((location, locationIndex) => (
                <span key={locationIndex}>
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

export default RegionTabs
