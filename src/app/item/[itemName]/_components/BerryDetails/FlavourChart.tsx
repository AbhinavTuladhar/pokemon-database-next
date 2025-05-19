'use client'

import React, { FC } from 'react'
import dynamic from 'next/dynamic'
import { ApexOptions } from 'apexcharts'

import { TransformedBerry } from '@/types'
import { formatName } from '@/utils/string.utils'

interface FlavourChartProps {
  flavourData: Pick<TransformedBerry, 'flavours'>['flavours']
}

const ApexCharts = dynamic(() => import('react-apexcharts'), { ssr: false })

const FlavourChart: FC<FlavourChartProps> = ({ flavourData }) => {
  const options: ApexOptions = {
    chart: {
      type: 'bar',
    },
    labels: flavourData.map(flavour => formatName(flavour.name)),
    fill: {
      opacity: 0.8,
    },
    plotOptions: {
      bar: {
        distributed: true,
        borderRadius: 4,
        columnWidth: '50%',
      },
    },
    title: {
      text: 'Flavour Potency',
      align: 'center',
      style: {
        fontSize: '1.125rem',
        fontFamily: 'Tahoma',
      },
      offsetY: 20,
    },
    yaxis: {
      max: 40,
    },
  }

  return (
    <div className="mt-4">
      <ApexCharts
        series={[
          {
            name: 'Flavour potency',
            data: flavourData.map(flavour => flavour.potency),
          },
        ]}
        type="bar"
        options={options}
        height="450"
        width="100%"
      />
    </div>
  )
}

export default FlavourChart
