import { FC } from 'react'

import { Table, TableCell, TableHeader, TableRow } from '@/components/ui/Table'
import { SectionTitle } from '@/components/ui/Title'
import { getCatchRate } from '@/features/pokemon/helpers/pokemon.helper'
import { PokemonStat } from '@/types'

// Formatting the fields from medium-slow to Medium Slow and so on.
const formatField = (field: string) => {
  if (!field) return ''
  const splitWords = field.split('-')
  const properWords = splitWords.map(word => {
    return word.charAt(0).toUpperCase() + word.slice(1)
  })
  return properWords.join(' ')
}

interface TrainingInfoProps {
  capture_rate: number
  base_happiness: number
  base_experience: number
  growth_rate: string
  stats: Array<PokemonStat>
}

export const TrainingInfo: FC<TrainingInfoProps> = ({
  capture_rate,
  base_happiness,
  base_experience,
  growth_rate,
  stats,
}) => {
  // Format the growth rate field
  const growth = growth_rate === undefined ? '' : formatField(growth_rate.toString())

  // Find the stats that give EVs
  const evStats = stats.filter(stat => stat.effort > 0)
  const evFormatted = evStats.map(stat => {
    // First format the stat field. hp -> HP, rest => special-attack => Special Attack
    const statName = stat.stat.name
    const formattedStatName = statName === 'hp' ? 'HP' : formatField(stat.stat.name.toString())
    return { name: formattedStatName, value: stat.effort }
  })

  // Joining all the EV stats given by commas.
  const evString = evFormatted.map(obj => `${obj.value} ${obj.name}`).join(', ')

  const captureRateString = getCatchRate(capture_rate)

  const captureRateRow = (
    <span>
      <span> {capture_rate} </span>
      <span className="text-gray-500 dark:text-gray-300">
        {`(${captureRateString} with Pokéball, full HP)`}
      </span>
    </span>
  )

  // Define all the things that is to be displayed.
  const tableData = [
    { label: 'EV Yield', value: evString },
    { label: 'Capture Rate', value: captureRateRow },
    { label: 'Base Friendship', value: base_happiness },
    { label: 'Base exp.', value: base_experience },
    { label: 'Growth rate', value: growth },
  ]

  const tableDiv = tableData.map((row, rowIndex) => {
    return (
      <TableRow key={row.label + rowIndex}>
        <TableHeader>
          <span className="text-sm">{row.label}</span>
        </TableHeader>
        <TableCell> {row.value} </TableCell>
      </TableRow>
    )
  })

  return (
    <div>
      <SectionTitle>Training Data</SectionTitle>
      <Table>
        <tbody>{tableDiv}</tbody>
      </Table>
    </div>
  )
}
