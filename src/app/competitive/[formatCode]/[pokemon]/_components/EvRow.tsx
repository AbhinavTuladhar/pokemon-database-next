import React, { FC } from 'react'

import { capitaliseFirstLetter } from '@/utils/formatName'

import SetRow from './SetRow'

interface EvRowProps {
  evData: {
    [key: string]: number
  }
}

const EvRow: FC<EvRowProps> = ({ evData }) => {
  const formattedData = Object.entries(evData).map(([key, value]) => ({
    stat: key,
    evs: value,
  }))

  const combinedEvString = formattedData
    .map(row => `${row.evs} ${capitaliseFirstLetter(row.stat)}`)
    .join(' / ')

  return <SetRow header={'EVs'} value={combinedEvString} />
}

export default EvRow
