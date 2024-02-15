import { FC } from 'react'
import BlueLink from '@/components/BlueLink'
import SectionTitle from '@/components/SectionTitle'
import TypeCard from '@/components/TypeCard'
import formatName from '@/utils/formatName'
import fetchMultipleData from '@/services/fetchMultipleData'
import { Pokedex, PokemonAbility, PokemonSpeciesDexEntry, PokemonType } from '@/types'
import trimUrl from '@/utils/trimUrl'
import TableContainer from '@/components/TableContainer'

const getGameData = async (urls: Array<string>) => {
  // Trim off the urls of the games
  const trimmedUrls = urls.map(trimUrl)

  const response = await fetchMultipleData<Pokedex>(trimmedUrls)
  return response
}

interface DexDataProps {
  types: Array<PokemonType>
  genus: string | undefined
  height: number
  weight: number
  abilities: Array<PokemonAbility>
  pokedex_numbers: Array<PokemonSpeciesDexEntry>
  nationalNumber: number
}

const PokeDexData: FC<DexDataProps> = async ({
  types,
  genus,
  height,
  weight,
  abilities,
  pokedex_numbers,
  nationalNumber,
}) => {
  /*
  This is for omitting entries for national dex and conquest gallery.
  */
  const excludedRegions = ['national', 'conquest-gallery']

  // Now we find the corresponding URLs of the regions.
  // This is for extracting the names of the corresponding games.
  // Omit the national and conquest gallery pokedex entries.
  const versionURLs = pokedex_numbers
    ?.filter((entry) => !excludedRegions.includes(entry.pokedex.name))
    .map((entry) => entry.pokedex.url)

  const gameData = await getGameData(versionURLs)
  const formattedNationalNumber = `${'00' + nationalNumber}`.slice(-3)

  // This is for unit conversion of the height and weight.
  const formattedHeight = `${(height * 0.1).toFixed(2)} m`
  const formattedWeight = `${(weight * 0.1).toFixed(2)} kg`

  // Change the types into visual form.
  const typeNames = types.map((type) => type.type.name)

  // Convert the types of the Pokemon into its corresponding component.
  const typeDiv = typeNames.map((typeName, index) => <TypeCard typeName={typeName} key={index} />)

  // Making an actual list of all the abilities.
  const abilityList = abilities.map((ability, index) => {
    const name = ability.ability.name
    const prefix = ability.is_hidden === true ? '' : `${index + 1}. `
    const hiddenExtraText = ability.is_hidden === true ? ' (hidden ability)' : ''
    return (
      <li key={index}>
        <> {prefix} </>
        <BlueLink href={`/ability/${name}`}>{formatName(name)}</BlueLink>
        <> {hiddenExtraText} </>
      </li>
    )
  })
  const abilityListFinal = <ol className="list-inside list-none">{abilityList}</ol>

  // Now dealing with the Pokedex numbers for each region.
  // Omit the national region number and conquest gallery numbers, for the reasons specified before.
  const nonNationalValues = pokedex_numbers?.filter(
    (entry) => !excludedRegions.includes(entry.pokedex.name),
  )
  const regionNumberValues = nonNationalValues?.map((entry, index) => {
    const regionName = entry.pokedex.name
    const entryNumber = entry.entry_number.toString().padStart(4, '0')
    return { id: index, number: entryNumber, region: regionName }
  })

  /*
  Now combining the regionNumberValues and gameData.
  This will combine two objects: one object contains the name of the region, while the other contains the name of the games.
  */
  const properGameData = regionNumberValues?.map((obj1) => {
    const obj2 = gameData?.find((obj2) => obj2?.name === obj1?.region)
    return {
      dexNumber: obj1.number,
      gameNames: obj2?.version_groups.map((version) => version.name),
    }
  })

  // Now format the text of the properGameData object.
  const finalGameData = properGameData?.map((game) => {
    const gameNames = game?.gameNames
    const gameList = gameNames?.map((item) => {
      const individualGames = item.split('-').map((game) => game.toLowerCase())
      const formattedIndividualGames = individualGames?.map(
        (game) => game.charAt(0).toUpperCase() + game.slice(1),
      )
      const gameListTemp = formattedIndividualGames?.join(' / ')
      return gameListTemp
    })
    return { dexNumber: game.dexNumber, game: gameList?.join(' / ') }
  })

  const regionNumberList = finalGameData?.map((number, index) => {
    return (
      <div className="table-row" key={index}>
        <div className="table-cell px-1">{number.dexNumber}</div>
        <div className="table-cell px-1 brightness-90">{number.game}</div>
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
    { label: 'Abilities', value: abilityListFinal },
    { label: 'Regional no.', value: regionNumberListFinal },
  ]

  // Now define the JSX component for all the entries.
  const tableEntries = tableData.map((row, rowIndex) => {
    const spacing = row.label === 'Abilities' || row.label === 'Regional no.' ? 'min-h-14' : 'h-12'
    return (
      <div className={`table-row border-t border-gray-200 py-2 ${spacing}`} key={rowIndex}>
        <div className="table-cell w-3/12 border-t border-gray-200 py-2 text-right align-middle">
          {row.label}
        </div>
        <div className="table-cell w-9/12 border-t border-gray-200 py-2 pl-4 align-middle">
          <div className="flex">{row.value}</div>
        </div>
      </div>
    )
  })

  return (
    <>
      <SectionTitle>Pokédex data</SectionTitle>
      <TableContainer>{tableEntries}</TableContainer>
    </>
  )
}

export default PokeDexData
