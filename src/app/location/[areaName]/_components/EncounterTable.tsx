import React, { FC } from 'react'
import classNames from 'classnames'

import { TableCellHeader, TableContainer, TableRow } from '@/components/containers'
import { EncounterMethod } from '@/types'
import formatName from '@/utils/formatName'

import { EncounterRow } from './EncounterRow'
import { MethodGroup } from './types'

interface TableProps {
  methods: MethodGroup
  methodData: Array<EncounterMethod>
}

const containsSubString = (testString: string, searchStrings: Array<string>) =>
  searchStrings.some(searchString => testString.includes(searchString))

export const EncounterTable: FC<TableProps> = ({ methods, methodData }) => {
  const { encounterDetails, method } = methods

  const encounterDescription = methodData
    .find(innerMethod => innerMethod.name === method)
    ?.names.find(({ language }) => {
      return language.name === 'en'
    })?.name as string

  const hasEncounterCondition = encounterDetails.some(encounter => {
    const { condition_values } = encounter
    // Check if condition values has a substring of either time or season.
    return condition_values.some(condition => containsSubString(condition, ['time', 'season']))
  })

  // For dealing with seasonal and time of day encounters.
  const hasSeason = encounterDetails.some(encounter =>
    encounter.condition_values.some(value => value.includes('season')),
  )
  const hasTime = encounterDetails.some(encounter =>
    encounter.condition_values.some(value => value.includes('time')),
  )

  const encounterConditionName = hasSeason ? 'season' : hasTime ? 'time' : null

  const header = [
    'Pokémon',
    'Games',
    ...(hasEncounterCondition ? ['Conditions'] : []),
    'Rarity',
    'Levels',
  ]

  const headerRow = (
    <TableRow className="bg-neutral-200 font-bold dark:bg-table-header">
      {header.map((headerName, index) => (
        <TableCellHeader
          type="column"
          className={classNames(
            'border border-r-gray-300 pr-4 !text-center last:border-r-0 dark:border-r-table-border',
            { '!px-0': headerName === 'Games' },
            { 'min-w-48': headerName === 'Pokémon' },
            { '!min-w-40': headerName === 'Conditions' },
          )}
          key={index}
        >
          {headerName}
        </TableCellHeader>
      ))}
    </TableRow>
  )

  return (
    <div>
      <div className="my-4 flex flex-col gap-y-1">
        <h3 className="text-2xl font-bold">{`${formatName(method)}`}</h3>
        <span className="text-sm text-gray-500 dark:text-gray-200">{encounterDescription}</span>
      </div>

      <TableContainer useFullWidth={false}>
        <thead>{headerRow}</thead>
        <tbody>
          {encounterDetails.map((encounter, index) => (
            <EncounterRow
              encounter={encounter}
              hasEncounterCondition={hasEncounterCondition}
              method={encounter.method.name}
              encounterConditionName={encounterConditionName}
              key={index}
            />
          ))}
        </tbody>
      </TableContainer>
    </div>
  )
}
