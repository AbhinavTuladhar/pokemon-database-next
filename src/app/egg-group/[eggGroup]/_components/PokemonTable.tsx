import React from 'react'

import TableCell from '@/components/containers/TableCell'
import TableCellHeader from '@/components/containers/TableCellHeader'
import TableContainer from '@/components/containers/TableContainer'
import TableRow from '@/components/containers/TableRow'

const PokemonTable = () => {
  const headerNames = ['#', 'Name', 'Types', 'Other group']
  const tableHeaders = (
    <thead>
      <TableRow>
        {headerNames.map((name) => (
          <TableCellHeader type="column" key={name}>
            {name}
          </TableCellHeader>
        ))}
      </TableRow>
    </thead>
  )

  return <TableContainer>{tableHeaders}</TableContainer>
}

export default PokemonTable
