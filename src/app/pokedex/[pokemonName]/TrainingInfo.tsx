import { FC, ReactNode } from 'react'
import SectionTitle from '@/components/SectionTitle'
import TableContainer from '@/components/containers/TableContainer'
import { PokemonStat } from '@/types'

import TableCellHeader from '@/components/containers/TableCellHeader'
import TableCell from '@/components/containers/TableCell'
import TableRow from '@/components/TableRow'

// Formatting the fields from medium-slow to Medium Slow and so on.
const formatField = (field: string) => {
  if (!field) return ''
  const splitWords = field.split('-')
  const properWords = splitWords.map((word) => {
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

const TrainingInfo: FC<TrainingInfoProps> = ({
  capture_rate,
  base_happiness,
  base_experience,
  growth_rate,
  stats,
}) => {
  // Format the growth rate field
  const growth = growth_rate === undefined ? '' : formatField(growth_rate.toString())

  // Find the stats that give EVs
  const evStats = stats.filter((stat) => stat.effort > 0)
  const evFormatted = evStats.map((stat) => {
    // First format the stat field. hp -> HP, rest => special-attack => Special Attack
    const statName = stat.stat.name
    const formattedStatName = statName === 'hp' ? 'HP' : formatField(stat.stat.name.toString())
    return { name: formattedStatName, value: stat.effort }
  })

  // Joining all the EV stats given by commas.
  const evString = evFormatted.map((obj) => `${obj.value} ${obj.name}`).join(', ')

  // Define all the things that is to be displayed.
  const tableData = [
    { label: 'EV Yield', value: evString },
    { label: 'Capture Rate', value: capture_rate },
    { label: 'Base Friendship', value: base_happiness },
    { label: 'Base exp.', value: base_experience },
    { label: 'Growth rate', value: growth },
  ]

  const tableDiv = tableData.map((row, rowIndex) => {
    return (
      <TableRow key={rowIndex}>
        <TableCellHeader>
          <span className="text-sm">{row.label}</span>
        </TableCellHeader>
        <TableCell> {row.value} </TableCell>
      </TableRow>
    )
  })

  return (
    <div>
      <SectionTitle>Training Data</SectionTitle>
      <TableContainer>{tableDiv}</TableContainer>
    </div>
  )
}

export default TrainingInfo
