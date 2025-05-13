import { FC } from 'react'

import {
  SectionTitle,
  TableCell,
  TableCellHeader,
  TableContainer,
  TableRow,
} from '@/components/containers'
import BlueLink from '@/components/link'
import pokedexToGameMap from '@/data/pokedexToGameMap'
import { TypeCard } from '@/features/pokemon/components/TypeCard'
import { PokemonAbility, PokemonSpeciesDexEntry, PokemonType } from '@/types'
import formatName from '@/utils/formatName'

const ignoredPokedexes = [
  'conquest-gallery',
  'national',
  'original-melemele',
  'original-akala',
  'original-ulaula',
  'original-poni',
  'updated-melemele',
  'updated-akala',
  'updated-ulaula',
  'updated-poni',
  'letsgo-kanto',
  'galar',
  'isle-of-armor',
  'crown-tundra',
  'hisui',
  'paldea',
  'kitakami',
  'blueberry',
]

interface DexDataProps {
  types: Array<PokemonType>
  genus: string | undefined
  height: number
  weight: number
  abilities: Array<PokemonAbility>
  pokedex_numbers: Array<PokemonSpeciesDexEntry>
  nationalNumber: number
  shape: string
  colour: string
}

export const PokeDexData: FC<DexDataProps> = ({
  types,
  genus,
  height,
  weight,
  abilities,
  pokedex_numbers,
  nationalNumber,
  colour,
  shape,
}) => {
  const formattedNationalNumber = `${'00' + nationalNumber}`.slice(-3)

  // This is for unit conversion of the height and weight.
  const formattedHeight = `${(height * 0.1).toFixed(2)} m`
  const formattedWeight = `${(weight * 0.1).toFixed(2)} kg`

  // Change the types into visual form.
  const typeNames = types.map(type => type.type.name)

  // Convert the types of the Pokemon into its corresponding component.
  const typeDiv = (
    <div className="flex items-center gap-x-1.5">
      {typeNames.map((typeName, index) => (
        <TypeCard typeName={typeName} key={typeName + index} variant="small" />
      ))}
    </div>
  )

  // Making an actual list of all the abilities.
  const abilityList = abilities.map((ability, index) => {
    const name = ability.ability.name
    const prefix = ability.is_hidden === true ? '' : `${index + 1}. `
    const hiddenExtraText = ability.is_hidden === true ? ' (hidden ability)' : ''
    return (
      <li key={ability.ability.name}>
        {prefix}
        <BlueLink href={`/ability/${name}`}>{formatName(name)}</BlueLink>
        {hiddenExtraText}
      </li>
    )
  })
  const abilityListFinal = <ol className="list-inside list-none">{abilityList}</ol>

  const regionLevelData = pokedex_numbers
    .filter(pokedex => {
      const {
        pokedex: { name: pokedexName },
      } = pokedex
      return !ignoredPokedexes.includes(pokedexName)
    })
    .map(pokedex => {
      const {
        entry_number,
        pokedex: { name: pokedexName },
      } = pokedex
      const paddedNumber = entry_number.toString().padStart(3, '0')
      const gameNames = pokedexToGameMap[pokedexName] ?? 'Not implemented'

      return { number: paddedNumber, games: gameNames }
    })

  const regionNumberList = regionLevelData.map((entry, index) => {
    return (
      <div className="table-row" key={entry.number + index}>
        <div className="table-cell px-1">{entry.number}</div>
        <div className="table-cell px-1 text-sm text-gray-500 dark:text-gray-300">{`(${entry.games})`}</div>
      </div>
    )
  })
  const regionNumberListFinal = <div className="table">{regionNumberList}</div>

  // This is for storing the things to be displayed in each row.
  const tableData = [
    { label: 'National no.', value: formattedNationalNumber },
    { label: 'Type', value: typeDiv },
    { label: 'Species', value: genus },
    { label: 'Height', value: formattedHeight },
    { label: 'Weight', value: formattedWeight },
    { label: 'Colour', value: formatName(colour) },
    { label: 'Shape', value: formatName(shape) },
    { label: 'Abilities', value: abilityListFinal },
    ...(regionLevelData.length > 0 ? [{ label: 'Regions', value: regionNumberListFinal }] : []),
  ]

  // Now define the JSX component for all the entries.
  const tableEntries = tableData.map((row, rowIndex) => {
    return (
      <TableRow key={row.label + rowIndex}>
        <TableCellHeader>
          <span className="text-sm"> {row.label}</span>
        </TableCellHeader>
        <TableCell>
          <div className="flex">{row.value}</div>
        </TableCell>
      </TableRow>
    )
  })

  return (
    <>
      <SectionTitle>Pokédex data</SectionTitle>
      <TableContainer>
        <tbody>{tableEntries}</tbody>
      </TableContainer>
    </>
  )
}
