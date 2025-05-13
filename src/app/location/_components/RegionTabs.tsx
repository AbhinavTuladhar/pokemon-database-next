'use client'

import { FC, useEffect, useState } from 'react'
import classNames from 'classnames'

import { Tab, TabList, TabPanel, Tabs } from '@/components/react-tabs'
import { BlueLink } from '@/components/ui/Link'
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
      <TabList>
        {tabNames.map((tab, tabIndex) => (
          <Tab key={tab + tabIndex} extraClassName="max-lg:flex-1">
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
                'columns-1 min-[420px]:columns-2 min-[640px]:columns-3 md:columns-4 lg:columns-5 xl:columns-6',
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
