'use client'

import React, { FC } from 'react'
import dynamic from 'next/dynamic'
import type { ApexOptions } from 'apexcharts'

import { GrowthRateExperienceLevel } from '@/types'
import { formatName } from '@/utils/string.utils'

interface ChartProps {
  data: Array<{
    growthRate: string
    levelData: Array<GrowthRateExperienceLevel>
  }>
  title: string
  subTitle: string
}

const ApexCharts = dynamic(() => import('react-apexcharts'), { ssr: false })

export const ComparisonChart: FC<ChartProps> = ({ data, title, subTitle }) => {
  const labelLength = data[0].levelData.length

  const labels = Array.from({ length: labelLength }, (_, i) => i)
  const options: ApexOptions = {
    chart: {
      type: 'line',
      zoom: {
        autoScaleYaxis: true,
      },
    },
    grid: {
      yaxis: {
        lines: {
          show: true,
        },
      },
      show: true,
    },
    tooltip: {
      x: {
        formatter(val) {
          return `Level ${val}`
        },
      },
    },
    xaxis: {
      categories: labels,
      min: 0,
      max: 100,
      labels: {
        rotate: 0,
      },
      stepSize: 1,
    },
    stroke: {
      curve: 'monotoneCubic',
      width: 2,
    },
    title: {
      align: 'center',
      offsetY: 10,
      text: title,
      style: {
        fontFamily: 'Tahoma',
        fontSize: '1.125rem',
      },
    },
    colors: [
      'hsl(205.8, 100%, 49.2%)',
      'hsl(159.6, 100%, 44.5%)',
      'hsl(39.6, 99.1%, 54.7%)',
      'hsl(351.3, 100%, 63.5%)',
      'hsl(253.6, 55%, 59%)',
      'hsl(110.4, 76.7%, 71.4%)',
    ],
    subtitle: {
      text: subTitle,
      style: {
        fontFamily: 'Tahoma',
      },
    },
    legend: {
      position: 'bottom',
      itemMargin: {
        vertical: 16,
      },
      offsetY: 10,
    },
    responsive: [
      {
        breakpoint: 768,
        options: {
          xaxis: {
            tickAmount: 10,
          },
          title: {
            style: {
              fontSize: '0.875rem',
            },
          },
        },
      },
    ],
  }

  return (
    <ApexCharts
      type="line"
      options={options}
      height="500"
      width="100%"
      series={data.map(item => ({
        name: formatName(item.growthRate),
        data: item.levelData.map(level => level.experience),
      }))}
      className="border-bd-light dark:border-bd-dark rounded-lg border p-4"
    />
  )
}
