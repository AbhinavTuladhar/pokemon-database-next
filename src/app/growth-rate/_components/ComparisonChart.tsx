'use client'

import React, { FC } from 'react'
import dynamic from 'next/dynamic'
import type { ApexOptions } from 'apexcharts'

import { GrowthRateExperienceLevel } from '@/types'
import formatName from '@/utils/formatName'

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
  const labels = Array.from({ length: 101 }, (_, i) => i)
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
    xaxis: {
      categories: labels,
      tickAmount: 20,
      labels: {
        rotate: 0,
      },
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
        fontFamily: '__Fira_Sans_d5c5f4',
        fontSize: '1.125rem',
      },
    },
    subtitle: {
      text: subTitle,
      style: {
        fontFamily: '__Fira_Sans_d5c5f4',
      },
    },
    legend: {
      position: 'right',
    },
    responsive: [
      {
        breakpoint: 1024,
        options: {
          legend: {
            position: 'bottom',
          },
        },
      },
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
    />
  )
}
