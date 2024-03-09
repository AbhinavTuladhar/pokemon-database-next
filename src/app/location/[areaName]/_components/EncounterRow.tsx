import React from 'react'

interface RowProps {
  children: React.ReactNode
}

const EncounterRow: React.FC<RowProps> = ({ children }) => {
  return <tr className="table-row h-12">{children}</tr>
}

export default EncounterRow
