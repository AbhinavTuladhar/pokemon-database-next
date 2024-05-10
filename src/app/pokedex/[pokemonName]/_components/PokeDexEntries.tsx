import { FC } from 'react'

import { SectionTitle } from '@/components/containers'
import GameWiseDescriptions from '@/components/game-wise-descriptions'
import { gameBlackLists } from '@/data/blacklists'
import { FlavourText } from '@/types/utils/Common'

interface VersionDescription {
  versionName: string
  description: string
}

interface GroupVersionDescriptions {
  versionName: Array<string>
  description: string
}

const groupByDescription = (data: Array<VersionDescription>) => {
  return data.reduce((acc, current) => {
    // First it's checked whehter the description already exists in the accumulator array.
    const index = acc.findIndex(item => item.description === current.description)
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

export const PokeDexEntries: FC<DexEntriesProps> = ({ flavourTextEntries }) => {
  if (flavourTextEntries.length <= 0) {
    return null
  }

  // Let's find all the English entries first that are not in the blacklisted games.
  const englishEntries = flavourTextEntries.filter(entry => {
    const {
      language: { name: languageName },
      version: { name: versionName },
    } = entry
    return languageName === 'en' && !gameBlackLists.includes(versionName)
  })

  // Find an object containing the version anme and the Pokedex entry.
  const englishInfo = englishEntries.map(entry => {
    const rawText = entry.flavor_text as string
    // This 'removes' the escape characters in the Pokedex entry. However, the escape characters are placed in very inconsitent places, so the text looks weird.
    const cleanedStr = rawText.replace(/\f/g, ' ').replace(/\n/g, ' ')
    const versionName = entry.version.name
    return {
      versionName,
      description: cleanedStr,
    }
  })

  // Replace the 'versionName' of englishInfoDescription object with 'versioNGroupName'
  const englishInfoByDescription = groupByDescription(englishInfo).map(obj => {
    const { description, versionName } = obj
    return { description, versionGroupNames: versionName }
  })

  return (
    <>
      <SectionTitle>Pokédex Entries</SectionTitle>
      <GameWiseDescriptions descriptionData={englishInfoByDescription} />
    </>
  )
}
