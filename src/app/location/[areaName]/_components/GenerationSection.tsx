import React, { FC, Fragment } from 'react'
import Image from 'next/image'

import BlueLink from '@/components/BlueLink'
import TableCell from '@/components/containers/TableCell'
import TableCellHeader from '@/components/containers/TableCellHeader'
import TableContainer from '@/components/containers/TableContainer'
import TableRow from '@/components/containers/TableRow'
import { Tooltip } from '@/components/ReactTooltip'
import generationToGameListMap from '@/data/generationToGameListMap'
import LocationAreaExtractor from '@/extractors/LocationAreaExtractor'
import { LocationAreaApi } from '@/services/LocationApi'
import { EncounterMethod, GroupedLocationArea, TransformedLocation } from '@/types'
import formatName from '@/utils/formatName'
import { getFullRarityImage, getRarityString } from '@/utils/getRarityInfo'

import GameBox from './GameBox'

interface SectionProps {
  locationData: TransformedLocation
  methodData: Array<EncounterMethod>
}

interface MethodGroup {
  method: string
  encounterDetails: Array<GroupedLocationArea>
}

interface SubLocationGroup {
  subLocationName: string
  methods: Array<MethodGroup>
}

interface LocationGroup {
  generation: string
  subLocations: Array<SubLocationGroup>
}

const getSubLocationData = async (names: string[]) => {
  const responses = await LocationAreaApi.getByNames(names)
  return responses.map(LocationAreaExtractor)
}

const GenerationSection: FC<SectionProps> = async ({ locationData, methodData }) => {
  const subLocationNames = locationData.subLocations.map(subLocation => subLocation.name)
  const subLocationData = await getSubLocationData(subLocationNames)

  // Inform the user if there is no encounter information.
  if (subLocationData?.length === 0) {
    return (
      <h2 className="text-center text-2xl font-bold">
        Could not find any encounter information for this location.
      </h2>
    )
  }

  // First group by generation, then by sublocation and then by encounter method.
  const groupedByGenerationSubLocationAndMethod = subLocationData
    .reduce((result, obj) => {
      const { encounterDetails, subLocationName } = obj

      encounterDetails.forEach(encounter => {
        const { generation, method } = encounter

        const existingGenerationGroup = result.find(group => group.generation === generation)

        if (existingGenerationGroup) {
          const existingSubLocationGroup = existingGenerationGroup.subLocations.find(
            subLocation => subLocation.subLocationName === subLocationName,
          )

          if (existingSubLocationGroup) {
            const existingMethodGroup = existingSubLocationGroup.methods.find(
              methodObj => methodObj.method === method.name,
            )

            if (existingMethodGroup) {
              existingMethodGroup.encounterDetails.push(encounter)
            } else {
              existingSubLocationGroup.methods.push({
                encounterDetails: [encounter],
                method: method.name,
              })
            }
          } else {
            existingGenerationGroup.subLocations.push({
              subLocationName,
              methods: [{ method: method.name, encounterDetails: [encounter] }],
            })
          }
        } else {
          result.push({
            generation,
            subLocations: [
              {
                subLocationName,
                methods: [{ method: method.name, encounterDetails: [encounter] }],
              },
            ],
          })
        }
      })
      return result
    }, [] as LocationGroup[])
    .sort((prev, curr) => (prev.generation <= curr.generation ? 1 : -1)) // Next sort by the generation.

  // Table headers
  const header = ['Pokémon', 'Games', 'Rarity', 'Levels']

  const headerRow = (
    <TableRow className="bg-table-header font-bold">
      {header.map((headerName, index) => (
        <TableCellHeader
          type="column"
          className={`${headerName === 'Games' ? '!px-0' : ''} border-table-border border-r pr-4 !text-center last:border-r-0`}
          key={index}
        >
          {headerName}
        </TableCellHeader>
      ))}
    </TableRow>
  )
  /*
  This is for creating a more sophisticated version of the tables
  IN the highest level, we have the generation.
  In the next level is the sub location name
  Last comes the encounter method.
  Since all the above information have already been rendered, we omit them from the table.
  */
  // Generation is at the highest level, so the generation divs come first.
  const generationDiv = groupedByGenerationSubLocationAndMethod?.map(
    ({ generation, subLocations }, divIndex) => {
      // Next is the sub location div.
      const subLocationDivNew = subLocations?.map(({ subLocationName, methods }, subIndex) => {
        // Finally, the encounter methods.
        const encounterMethodDiv = methods?.map(({ method, encounterDetails }, methodIndex) => {
          // Find the name of the encounter method description
          // const encounterDescription = methodData?.find(
          //   method => method.name === method,
          // )?.description
          const encounterDescription = methodData
            .find(innerMethod => innerMethod.name === method)
            ?.names.find(({ language }) => {
              return language.name === 'en'
            })?.name as string

          const tableRows = encounterDetails.map((encounter, rowIndex) => {
            const { iconSprite, pokemonName, generationInternal, gameName, levelRange, chance } =
              encounter
            // const trueChance = chance > 100 ? 100 : chance
            // const chanceImage = getRarityImage(chance, method)
            const rarityImagePath = getFullRarityImage(chance, method)
            const rarityString = getRarityString(chance, method)

            // For the identifying div
            const idDiv = (
              <div className="flex flex-row items-center pr-12 md:pr-4">
                <Image src={iconSprite} alt={pokemonName} width={66} height={66} />
                <BlueLink href={`/pokedex/${pokemonName}`}>{formatName(pokemonName)}</BlueLink>
              </div>
            )

            // For the game boxes
            const gameBoxDiv = (
              <div className="flex flex-row">
                {generationToGameListMap[generationInternal].map((game, index) => (
                  <GameBox gameName={game} activeFlag={gameName.includes(game)} key={index} />
                ))}
              </div>
            )

            // For the pie-chart rarity image
            const rarityImage = (
              <Image
                src={rarityImagePath}
                alt={`${chance}`}
                width={30}
                height={30}
                className="hover:cursor-help"
                id={rarityString}
              />
            )

            const cellData = [
              { key: 'pokemon', value: idDiv },
              { key: 'game', value: gameBoxDiv },
              { key: 'chance', value: rarityImage },
              { key: 'level range', value: levelRange },
            ]
            return (
              <TableRow key={rowIndex}>
                {cellData.map(({ key, value }, index) => (
                  <TableCell
                    key={index}
                    extraClassName={`${key === 'game' ? '!px-0' : ''} !py-0`}
                    variant="column"
                  >
                    {value}
                  </TableCell>
                ))}
              </TableRow>
            )
          })
          // Now render the sub location name, with the generation as the prefix.
          return (
            <div key={methodIndex}>
              <div className="my-4 flex flex-col gap-y-1">
                <h3 className="text-2xl font-bold">{`${formatName(method)}`}</h3>
                <span className="text-sm text-gray-300">{encounterDescription}</span>
              </div>

              <div className="flex justify-center">
                <TableContainer>
                  <thead>{headerRow}</thead>
                  <tbody>{tableRows}</tbody>
                </TableContainer>
              </div>
            </div>
          )
        })
        return (
          <section key={subIndex}>
            <h2 className="mb-4 text-3xl font-bold">{`${generation} - ${formatName(subLocationName)}`}</h2>
            <div key={subIndex}>{encounterMethodDiv}</div>
          </section>
        )
      })
      return (
        <section className="mt-4 first:mt-0" key={divIndex}>
          {subLocationDivNew}
        </section>
      )
    },
  )

  const tooltipData = [
    { id: '#common', text: 'Common' },
    { id: '#uncommon', text: 'Uncommon' },
    { id: '#rare', text: 'Rare' },
    { id: '#limited', text: 'Limited' },
  ]

  return (
    <>
      <>
        {tooltipData.map((row, index) => (
          <Tooltip anchorSelect={row.id} place="bottom" key={index}>
            {row.text}
          </Tooltip>
        ))}
      </>

      {/* For rendering skeleton when the content has not been loaded */}
      <div className="space-y-4">
        {generationDiv.map((generation, index) => (
          <Fragment key={index}>{generation}</Fragment>
        ))}
      </div>
    </>
  )
}

export default GenerationSection
