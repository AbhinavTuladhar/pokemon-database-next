import React from 'react'
import Skeleton from 'react-loading-skeleton'

import SectionTitle from '../containers/SectionTitle'
import TableCell from '../containers/TableCell'
import TableContainer from '../containers/TableContainer'
import TableRow from '../containers/TableRow'

const PokemonTableSkeleton = () => {
  return (
    <section className="min-w-64">
      {/* <SectionTitle>Loading Pokémon data...</SectionTitle> */}
      <TableContainer>
        <tbody>
          {Array(10)
            .fill(0)
            .map((_, index) => (
              <TableRow key={index}>
                <TableCell>
                  <Skeleton containerClassName="flex-1 w-full" key={index} />
                </TableCell>
              </TableRow>
            ))}
        </tbody>
      </TableContainer>
    </section>
  )
}

export default PokemonTableSkeleton
