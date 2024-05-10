import { FC } from 'react'

import { SectionTitle } from '@/components/containers'
import GameWiseDescriptions from '@/components/game-wise-descriptions'
import { PokedexEntry } from '@/types'

interface VersionDescription {
  versionName: string
  description: string
  generationInternal: string
}

interface GroupedByGeneration {
  generationInternal: string
  descriptions: Array<Pick<VersionDescription, 'description' | 'versionName'>>
}

interface GroupedByGenerationAndDescription {
  generationInternal: string
  description: string
  versionNames: Array<string>
}

const groupByGeneration = (data: Array<VersionDescription>) =>
  data.reduce((acc, obj) => {
    const { generationInternal, description, versionName } = obj

    // Check if there is already a group for the current generationInternalvalue
    const foundGenObject = acc.find(item => item.generationInternal === generationInternal)
    if (!foundGenObject) {
      acc.push({ generationInternal, descriptions: [{ description, versionName }] })
    } else {
      foundGenObject.descriptions.push({ description, versionName })
    }

    return acc
  }, [] as Array<GroupedByGeneration>)

const groupByGenerationAndDescription = (data: Array<GroupedByGeneration>) =>
  data.reduce((acc, obj) => {
    const { descriptions, generationInternal } = obj

    // Loop over the descriptions array to check a matching description and generationInternal in
    // the accumulator array
    for (const { description, versionName } of descriptions) {
      const foundObject = acc.find(
        item => item.description === description && item.generationInternal === generationInternal,
      )

      if (!foundObject) {
        acc.push({
          generationInternal,
          description,
          versionNames: [versionName],
        })
      } else {
        foundObject.versionNames.push(versionName)
      }
    }

    return acc
  }, [] as Array<GroupedByGenerationAndDescription>)

interface DexEntriesProps {
  flavourTextEntries: Array<PokedexEntry>
}

export const PokeDexEntries: FC<DexEntriesProps> = ({ flavourTextEntries }) => {
  if (flavourTextEntries.length <= 0) {
    return null
  }

  // Group by the internal generation first, then by the description
  const generationGrouped = groupByGeneration(flavourTextEntries)
  const descriptionGrouped = groupByGenerationAndDescription(generationGrouped)

  const finalData = descriptionGrouped.map(obj => {
    const { description, versionNames } = obj
    return {
      description,
      versionGroupNames: versionNames,
    }
  })

  return (
    <>
      <SectionTitle>Pokédex Entries</SectionTitle>
      <GameWiseDescriptions descriptionData={finalData} />
    </>
  )
}
