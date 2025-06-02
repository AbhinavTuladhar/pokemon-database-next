import { FC } from 'react'

import { TransitionLink } from '@/components/ui/Link'
import { Table, TableCell, TableHeader, TableRow } from '@/components/ui/Table'
import { SectionTitle } from '@/components/ui/Title'
import { EggGroup, NamedApiResource } from '@/types'
import { formatName } from '@/utils/string.utils'

interface BreedingInfoProps {
  egg_groups: Array<NamedApiResource<EggGroup>>
  gender_rate: number
  hatch_counter: number
  habitat: string
}

const generateGenderInfo = (genderRate: number) => {
  // The gender_rate is a value showing how many out of 8 pokemon are female.
  // -1 means genderless.
  if (genderRate === -1) return ['Genderless']
  let femaleRatio = ((genderRate / 8) * 100).toFixed(2)
  let maleRatio = (100 - Number(femaleRatio)).toFixed(2)
  return [`${maleRatio}% male`, `${femaleRatio}% female`]
}

export const BreedingInfo: FC<BreedingInfoProps> = ({
  egg_groups,
  gender_rate,
  hatch_counter,
  habitat,
}) => {
  // List the egg groups
  const eggGroupList = egg_groups.map((group, index) => (
    <span key={group.name + index}>
      <TransitionLink href={`/egg-group/${group.name}`}>{formatName(group.name)}</TransitionLink>
      {index < egg_groups.length - 1 && ', '}
    </span>
  ))

  // For the gender.
  const [maleRatio, femaleRatio] = generateGenderInfo(gender_rate)
  const genderRow = (
    <>
      <span className={maleRatio !== 'Genderless' ? 'text-blue-500' : ''}>{maleRatio}</span>
      {femaleRatio && (
        <>
          <span>,&nbsp;</span>
          <span className="text-pink-400">{femaleRatio}</span>
        </>
      )}
    </>
  )

  // For the egg cycles
  const maxStepsRequired = 257 * hatch_counter
  const minStepsRequired = Math.ceil(maxStepsRequired * 0.95)
  const eggCycleRow = `${hatch_counter} (${minStepsRequired} - ${maxStepsRequired} steps)`

  // Now build the table rows
  const tableRows = [
    { label: 'Egg Groups', value: eggGroupList },
    { label: 'Gender Rate', value: genderRow },
    { label: 'Egg Cycles', value: eggCycleRow },
    ...(habitat !== '' ? [{ label: 'Habitat', value: formatName(habitat) }] : []),
  ]

  const tableDiv = tableRows.map((row, rowIndex) => {
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
      <SectionTitle>Breeding</SectionTitle>
      <Table>
        <tbody>{tableDiv}</tbody>
      </Table>
    </div>
  )
}
