import { FC } from 'react'

import { SectionTitle, TableCellHeader, TableContainer, TableRow } from '@/components/containers'
import statMapping from '@/data/statMapping'
import { PokemonStat } from '@/types'
import calculateStats from '@/utils/calculateStats'
/*
Here, we define a function for returning an aray of objects containing:
1. The name of the state,
2. The base value,
3. The maximum value,
4. The minimum value.
*/

const getStatDetails = (stats: Array<PokemonStat>) => {
  const maxStatValue = 200

  const statValues = stats.map(stat => {
    let colour
    const {
      base_stat: statValue,
      stat: { name: statName },
    } = stat
    const properStatName = statMapping[statName]
    // This is for determining the width of the bar graph.
    const widthValue = `${(statValue / maxStatValue) * 100}%`

    // Now provide a colour to the bar graph depending on the value of the base stat.
    if (statValue >= 0 && statValue < 30) colour = '#f34444'
    else if (statValue >= 30 && statValue < 60) colour = '#ff7f0f'
    else if (statValue >= 60 && statValue < 90) colour = '#ffdd57'
    else if (statValue >= 90 && statValue < 120) colour = '#a0e515'
    else if (statValue >= 120 && statValue < 150) colour = '#23cd5e'
    else if (statValue >= 150) colour = '#00c2b8'
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
  details.push({
    name: 'Total',
    value: baseStatTotal,
    width: '100%',
    colour: 'transparent',
    //@ts-ignore
    min: 'Min',
    //@ts-ignore
    max: 'Max',
  })

  return details
}

interface BaseStatProps {
  stats: Array<PokemonStat>
}

export const BaseStat: FC<BaseStatProps> = ({ stats }) => {
  // Fetch the ready-to-use array containing the objects of the stat details.
  const statDetail = getStatDetails(stats)

  const rowValues = statDetail?.map((stat, index) => {
    // Checking for the last index to make the sum of the base stats bold.
    const stringDecoration = index === statDetail.length - 1 ? 'font-bold' : ''

    return (
      <TableRow key={stat.name + index}>
        <TableCellHeader>{stat.name}</TableCellHeader>
        <TableCellHeader>
          <span className={`${stringDecoration} text-left`}> {stat.value} </span>
        </TableCellHeader>
        <td className="mx-0 table-cell min-w-[9.375rem] border-t border-gray-200 px-0 align-middle dark:border-table-border">
          <div
            className="my-0 ml-2 h-3 rounded"
            style={{
              width: stat.width,
              minWidth: '1rem',
              maxWidth: '100%',
              backgroundColor: stat.colour,
            }}
          >
            &nbsp;
          </div>
        </td>
        <TableCellHeader>{stat.min}</TableCellHeader>
        <TableCellHeader>{stat.max}</TableCellHeader>
      </TableRow>
    )
  })

  return (
    <>
      <SectionTitle>Base Stats</SectionTitle>
      <TableContainer>
        <tbody>{rowValues}</tbody>
      </TableContainer>
      <div className="mt-4 text-sm font-extralight">
        The ranges shown on the right are for a level 100 Pokémon. Maximum values are based on a
        beneficial nature, 252 EVs, 31 IVs; minimum values are based on a hindering nature, 0 EVs, 0
        IVs.
      </div>
    </>
  )
}
