import React, { FC } from 'react'
import Image from 'next/image'

import { SectionTitle } from '@/components/ui/Title'

interface KeyRow {
  imageSource: string
  caption: string
  tooltipContent: string
}

interface ColumnData {
  title: string
  rowData: Array<KeyRow>
}

const sectionData: Array<ColumnData> = [
  {
    title: 'Times',
    rowData: [
      { caption: 'Morning', tooltipContent: 'Morning', imageSource: '/time-of-day/morning.png' },
      { caption: 'Day', tooltipContent: 'Day', imageSource: '/time-of-day/day.png' },
      { caption: 'Night', tooltipContent: 'Night', imageSource: '/time-of-day/night.png' },
    ],
  },
  {
    title: 'Seasons',
    rowData: [
      { caption: 'Spring', tooltipContent: 'Spring', imageSource: '/seasons/spring.png' },
      { caption: 'Summer', tooltipContent: 'Summer', imageSource: '/seasons/summer.png' },
      { caption: 'Autumn', tooltipContent: 'Autumn', imageSource: '/seasons/autumn.png' },
      { caption: 'Winter', tooltipContent: 'Winter', imageSource: '/seasons/winter.png' },
    ],
  },
  {
    title: 'Encounter rates',
    rowData: [
      {
        caption: 'Common (21-100%)',
        tooltipContent: 'Common',
        imageSource: '/rarity-types/rarity-common.png',
      },
      {
        caption: 'Uncommon (6-20%)',
        tooltipContent: 'Uncommon',
        imageSource: '/rarity-types/rarity-uncommon.png',
      },
      {
        caption: 'Rare (1-5%)',
        tooltipContent: 'Rare',
        imageSource: '/rarity-types/rarity-rare.png',
      },
      {
        caption: 'Limited (e.g. just one)',
        tooltipContent: 'Limited',
        imageSource: '/rarity-types/rarity-limited.png',
      },
    ],
  },
]

const KeyColumn: FC<ColumnData> = ({ title, rowData }) => {
  return (
    <div>
      <h3 className="-mt-2 mb-4 text-2xl font-bold">{title}</h3>
      <div className="space-y-2">
        {rowData.map((row, index) => {
          const { caption, imageSource, tooltipContent } = row
          return (
            <div className="flex items-center gap-x-2" key={row.caption + index}>
              <Image
                src={imageSource}
                alt={caption}
                width={32}
                height={32}
                data-tooltip-id="my-tooltip"
                data-tooltip-content={tooltipContent}
                className="cursor-help"
              />
              <span>{caption}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export const IconKeys = () => {
  return (
    <section className="pt-4">
      <SectionTitle> Keys to Icons </SectionTitle>
      <div className="grid gap-y-8 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5">
        {sectionData.map(data => (
          <KeyColumn rowData={data.rowData} title={data.title} key={data.title} />
        ))}
      </div>
    </section>
  )
}
