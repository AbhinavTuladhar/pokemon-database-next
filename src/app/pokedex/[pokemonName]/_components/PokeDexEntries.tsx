import { FC } from 'react'

import { SectionTitle } from '@/components/containers'
import GameWiseDescriptions from '@/components/game-wise-descriptions'
import { PokedexEntry } from '@/types'

interface VersionDescription {
  versionName: string
  description: string
}

interface VersionDescriptionNew {
  versionName: string
  description: string
  generationInternal: string
}

interface GroupVersionDescriptions {
  versionName: Array<string>
  description: string
}

interface GroupedByGeneration {
  [key: string]: Array<VersionDescriptionNew>
}

const groupByGeneration = (data: Array<VersionDescriptionNew>) =>
  data.reduce((acc, current) => {
    const { generationInternal } = current

    if (!acc[generationInternal]) {
      acc[generationInternal] = []
    }

    acc[generationInternal].push(current)
    return acc
  }, {} as GroupedByGeneration)

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
  flavourTextEntries: Array<PokedexEntry>
}

export const PokeDexEntries: FC<DexEntriesProps> = ({ flavourTextEntries }) => {
  if (flavourTextEntries.length <= 0) {
    return null
  }

  console.log(flavourTextEntries)

  // Replace the 'versionName' of englishInfoDescription object with 'versioNGroupName'
  const englishInfoByDescription = groupByDescription(flavourTextEntries).map(obj => {
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
