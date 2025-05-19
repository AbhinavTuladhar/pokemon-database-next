import React from 'react'
import Skeleton from 'react-loading-skeleton'

import { Table, TableCell, TableRow } from '@/components/ui/Table'

export const PokemonTableSkeleton = () => {
  return (
    <section className="min-w-64">
      {/* <SectionTitle>Loading Pokémon data...</SectionTitle> */}
      <Table>
        <tbody>
          {Array(10)
            .fill(0)
            .map((value, index) => (
              <TableRow key={value}>
                <TableCell>
                  <Skeleton containerClassName="flex-1 w-full" key={value + index} />
                </TableCell>
              </TableRow>
            ))}
        </tbody>
      </Table>
    </section>
  )
}
