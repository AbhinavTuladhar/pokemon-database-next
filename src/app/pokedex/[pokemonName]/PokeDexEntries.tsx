import { FC } from 'react'
import { FlavourText } from '@/types/utils/Common'
import SectionTitle from '@/components/SectionTitle'
import TableCell from '@/components/containers/TableCell'
import TableCellHeader from '@/components/containers/TableCellHeader'
import TableRow from '@/components/TableRow'

interface VersionDescription {
  versionName: string
  description: string
}

interface GroupVersionDescriptions {
  versionName: Array<string>
  description: string
}

const groupByDescription = (data: Array<VersionDescription>) => {
  return data?.reduce((acc, current) => {
    // First it's checked whehter the description already exists in the accumulator array.
    const index = acc.findIndex((item) => item.description === current.description)
    // if it does, then append the version name.
    // Else, make a new entry in the accumulator array.
    if (index !== -1) {
      acc[index].versionName.push(current.versionName)
    } else {
      acc.push({ versionName: [current.versionName], description: current.description })
    }
    return acc
  }, [] as Array<GroupVersionDescriptions>)
}

interface DexEntriesProps {
  flavourTextEntries: Array<FlavourText>
}

const PokeDexEntries: FC<DexEntriesProps> = ({ flavourTextEntries }) => {
  if (flavourTextEntries.length <= 0) {
    return null
  }

  // Let's find all the English entries first.
  const englishEntries = flavourTextEntries.filter((entry) => entry.language.name === 'en')

  // Find an object containing the version anme and the Pokedex entry.
  const englishInfo = englishEntries.map((entry) => {
    const rawText = entry.flavor_text as string
    // This 'removes' the escape characters in the Pokedex entry. However, the escape characters are placed in very inconsitent places, so the text looks weird.
    const cleanedStr = rawText.replace(/\f/g, ' ').replace(/\n/g, ' ')
    const versionName = entry.version.name
    const properVersionName = versionName.charAt(0).toUpperCase() + versionName.slice(1)
    return {
      versionName: properVersionName,
      description: cleanedStr,
    }
  })

  const englishInfoByDescription = groupByDescription(englishInfo)

  // Now making a list for each version
  const finalEntry = englishInfoByDescription.map((entry) => {
    const gameListItems = entry.versionName.map((version, index) => {
      return <li key={index}> {version} </li>
    })
    const gameList = <ul className="list-inside list-none"> {gameListItems} </ul>
    return { versionName: gameList, description: entry.description }
  })

  const entryRows = finalEntry.map((entry, i) => {
    return (
      <TableRow key={i}>
        <TableCellHeader>
          <span className="text-sm">{entry.versionName}</span>
        </TableCellHeader>
        <TableCell>{entry.description}</TableCell>
      </TableRow>
    )
  })

  return (
    <>
      <SectionTitle>Pokédex Entries</SectionTitle>
      <div className="table w-full border-b border-gray-200">{entryRows}</div>
    </>
  )
}

export default PokeDexEntries
