'use client'

import React, { FC, useEffect, useState } from 'react'
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
}

const ApexCharts = dynamic(() => import('react-apexcharts'), { ssr: false })

export const ComparisonChart: FC<ChartProps> = ({ data, title }) => {
  const [isDarkMode, setIsDarkMode] = useState(true)

  useEffect(() => {
    setIsDarkMode(document.body.classList.contains('dark'))
  }, [])

  // const labels = data.map(item => item.levelData.map(level => level.level))
  const labels = Array.from({ length: 101 }, (_, i) => i)
  const options: ApexOptions = {
    chart: {
      type: 'line',
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
      curve: 'straight',
      width: 2,
    },
    title: {
      align: 'center',
      text: title,
    },
    legend: {
      position: 'right',
    },
    theme: {
      mode: 'dark',
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
