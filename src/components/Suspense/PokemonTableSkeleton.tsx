import React from 'react'
import SectionTitle from '../SectionTitle'
import TableContainer from '../containers/TableContainer'
import TableRow from '../TableRow'
import TableCell from '../containers/TableCell'
import Skeleton from 'react-loading-skeleton'

const PokemonTableSkeleton = () => {
  return (
    <section>
      <SectionTitle>Loading Pokémon data...</SectionTitle>
      <TableContainer>
        {Array(10)
          .fill(0)
          .map((_, index) => (
            <TableRow key={index}>
              <TableCell>
                <Skeleton containerClassName="flex-1 w-full" key={index} />
              </TableCell>
            </TableRow>
          ))}
      </TableContainer>
    </section>
  )
}

export default PokemonTableSkeleton