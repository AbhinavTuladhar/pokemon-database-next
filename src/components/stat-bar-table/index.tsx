import { FC } from 'react'

import { Table, TableHeader, TableRow } from '@/components/ui/Table'
import { statToProperName } from '@/features/pokemon/data/stat.data'
import { calculateStats } from '@/features/pokemon/helpers/stat.helper'
import { PokemonStat } from '@/types'
/*
Here, we define a function for returning an array of objects containing:
1. The name of the state,
2. The base value,
3. The maximum value,
4. The minimum value.
*/

const getStatDetails = (stats: Array<PokemonStat>, showMinMax: boolean = true) => {
  const maxStatValue = 200

  const statValues = stats.map(stat => {
    let colour
    const {
      base_stat: statValue,
      stat: { name: statName },
    } = stat
    const properStatName = statToProperName[statName]
    // This is for determining the width of the bar graph.
    const widthValue = `${(statValue / maxStatValue) * 100}%`

    // Now provide a colour to the bar graph depending on the value of the base stat.
    if (statValue >= 0 && statValue < 30) colour = 'hsl(0, 87.9%, 61%)'
    else if (statValue >= 30 && statValue < 60) colour = 'hsl(28, 100%, 52.9%)'
    else if (statValue >= 60 && statValue < 90) colour = 'hsl(47.9, 100%, 67.1%)'
    else if (statValue >= 90 && statValue < 120) colour = 'hsl(79.9, 83.2%, 49%)'
    else if (statValue >= 120 && statValue < 150) colour = 'hsl(140.8, 70.8%, 47.1%)'
    else if (statValue >= 150) colour = 'hsl(176.9, 100%, 38%)'
    else {
      colour = 'transparent'
    }
    return { name: properStatName, value: statValue, width: widthValue, colour: colour }
  })

  // Calculate the minimum and maximum stat values using an imported function.
  const minMaxValues = calculateStats(statValues)

  /*
    This function combines two objects.
    The first object contains the name of the stat and the base stat value -> statValues
    The second object contains the name of the stat and the maximum and minimum values -> minMaxValues.
    These objects are joined using the stat name as the common key-value pair.
  */
  const details = statValues.map(obj1 => {
    const obj2 = minMaxValues.find(obj => obj.name === obj1.name)
    return { ...obj1, ...obj2 }
  })

  /*
      This next bit for dealing with the final row. 
      In the final row, we want the form - 'Total' - (sum of base stats) - transparent bar graph - 'min' - 'max'
      */

  // First we find the sum of the base stats.
  const baseStatTotal = details.reduce((acc, stat) => acc + stat.value, 0)

  // Push the aforementioned details of the final row in the array.
  //@ts-ignore
  details.push({
    name: 'Total',
    value: baseStatTotal,
    width: '100%',
    colour: 'transparent',
    ...(showMinMax && { min: 'Min', max: 'Max' }),
  })

  return details
}

interface BaseStatProps {
  stats: Array<PokemonStat>
  showMinMax?: boolean
}

const StatBarTable: FC<BaseStatProps> = ({ stats, showMinMax = true }) => {
  // Fetch the ready-to-use array containing the objects of the stat details.
  const statDetail = getStatDetails(stats)

  const rowValues = statDetail?.map((stat, index) => {
    // Checking for the last index to make the sum of the base stats bold.
    const stringDecoration = index === statDetail.length - 1 ? 'font-bold' : ''

    return (
      <TableRow key={stat.name + index}>
        <TableHeader>{stat.name}</TableHeader>
        <TableHeader>
          <span className={`${stringDecoration} text-left`}> {stat.value} </span>
        </TableHeader>
        <td className="border-bd-light dark:border-bd-dark mx-0 table-cell min-w-[9.375rem] border-t px-0 align-middle">
          <div
            className="my-0 ml-2 h-3 rounded-sm"
            style={{
              width: stat.width,
              minWidth: '1rem',
              maxWidth: '100%',
              backgroundColor: stat.colour,
            }}
          />
        </td>
        {showMinMax && (
          <>
            <TableHeader>{stat.min}</TableHeader>
            <TableHeader>{stat.max}</TableHeader>
          </>
        )}
      </TableRow>
    )
  })

  return (
    <Table>
      <tbody>{rowValues}</tbody>
    </Table>
  )
}

export default StatBarTable
