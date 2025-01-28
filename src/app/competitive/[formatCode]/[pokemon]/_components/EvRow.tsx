import React, { FC } from 'react'

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

  const combinedEvString = formattedData.map(row => `${row.evs} ${row.stat}`).join(' / ')

  return (
    <div>
      <SetRow header={'EVs'} value={combinedEvString} />
    </div>
  )
}

export default EvRow
