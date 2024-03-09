import { FC } from 'react'
import GameBox from './_components/GameBox'
import LocationExtractor from '@/extractors/LocationExtractor'
import LocationAreaExtractor from '@/extractors/LocationAreaExtractor'
import generationToGameListMap from '@/data/generationToGameListMap'
import formatName from '@/utils/formatName'
import { LocationApi, LocationAreaApi } from '@/services/LocationApi'
import { GroupedLocationArea } from '@/types'
import Image from 'next/image'
import BlueLink from '@/components/BlueLink'
import TableRow from '@/components/containers/TableRow'
import TableCell from '@/components/containers/TableCell'
import TableCellHeader from '@/components/containers/TableCellHeader'
import TableContainer from '@/components/containers/TableContainer'
import EncounterRow from './_components/EncounterRow'
import EncounterCell from './_components/EncounterCell'
import { getFullRarityImage, getRarityString } from '@/utils/getRarityInfo'
// import { Tooltip } from 'react-tooltip'

// @ts-ignore
// const TableCell = ({ value, isHeader }) => {
//   return (
//     <div
//       className={`${isHeader && 'bg-gray-900 font-bold'} table-cell h-14 whitespace-nowrap border-t border-slate-200 px-4 text-center align-middle`}
//     >
//       {value}
//     </div>
//   )
// }

// // @ts-ignore
// const TableRow = ({ rowIndex, rowData }) => {
//   return (
//     <div className="table-row">
//       {rowData.map(({ key, value }, index) => (
//         <TableCell value={value} key={key} index={index} isHeader={rowIndex === 0} />
//       ))}
//     </div>
//   )
// }

const getLocationData = async (name: string) => {
  const response = await LocationApi.getByName(name)
  return LocationExtractor(response)
}

const getSubLocationData = async (urls: string[]) => {
  const responses = await LocationAreaApi.getByUrls(urls)
  return responses.map(LocationAreaExtractor)
}

interface PageProps {
  params: {
    areaName: string
  }
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

const LocationDetail: FC<PageProps> = async ({ params: { areaName } }) => {
  const locationData = await getLocationData(areaName)

  const subLocationUrls = locationData.subLocations.map((subLocation) => subLocation.url)
  const subLocationData = await getSubLocationData(subLocationUrls)

  // Inform the user if there is no encounter information.
  if (subLocationData?.length === 0) {
    return (
      <div>
        <h1 className="text-center text-3xl font-bold">{formatName(areaName)}</h1>
        <h1 className="text-center text-2xl font-bold">
          Could not find any encounter information for this location.
        </h1>
      </div>
    )
  }

  // First group by generation, then by sublocation and then by encounter method.
  const groupedByGenerationSubLocationAndMethod = subLocationData
    .reduce((result, obj) => {
      const { encounterDetails, subLocationName } = obj

      encounterDetails.forEach((encounter) => {
        const { generation, method } = encounter

        const existingGenerationGroup = result.find((group) => group.generation === generation)

        if (existingGenerationGroup) {
          const existingSubLocationGroup = existingGenerationGroup.subLocations.find(
            (subLocation) => subLocation.subLocationName === subLocationName,
          )

          if (existingSubLocationGroup) {
            const existingMethodGroup = existingSubLocationGroup.methods.find(
              (methodObj) => methodObj.method === method.name,
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
    <TableRow className="bg-[#1a1a1a] font-bold">
      {header.map((headerName, index) => (
        <TableCellHeader type="column" className="!text-center" key={index}>
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
          // const encounterDescription = encounterMethodDescriptions?.find(
          //   (method) => method?.name === method,
          // )?.description

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
                {cellData.map(({ value }, index) => (
                  <TableCell key={index} extraClassName="!py-0" variant="column">
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
                <h1 className="text-2xl font-bold">{`${formatName(method)}`}</h1>
                {/* <span className="text-sm text-gray-400">{encounterDescription}</span> */}
              </div>

              <div className="flex justify-center">
                <TableContainer>
                  {headerRow}
                  {tableRows}
                </TableContainer>
                {/* <div className="w-full overflow-auto lg:w-7/12">
                  <div className="mx-auto table border-b border-slate-200">{tableRows}</div>
                </div> */}
              </div>
            </div>
          )
        })
        return (
          <section key={subIndex}>
            <h1 className="mt-4 text-3xl font-bold">{`${generation} - ${subLocationName}`}</h1>
            <div key={subIndex}> {encounterMethodDiv} </div>
          </section>
        )
      })
      return <section key={divIndex}>{subLocationDivNew}</section>
    },
  )

  const tooltipData = [
    { id: '#common', text: 'Common' },
    { id: '#uncommon', text: 'Uncommon' },
    { id: '#rare', text: 'Rare' },
    { id: '#limited', text: 'Limited' },
  ]

  return (
    <main>
      <h1 className="text-center text-3xl font-bold">{formatName(areaName)}</h1>

      {/* <>
        {tooltipData.map((row, index) => (
          <Tooltip anchorSelect={row.id} place="bottom" key={index}>
            {row.text}
          </Tooltip>
        ))}
      </> */}

      {/* For rendering skeleton when the content has not been loaded */}
      <>
        {generationDiv.map((generation, index) => (
          <div className="flex flex-col" key={index}>
            {generation}
          </div>
        ))}
      </>
    </main>
  )
}

export default LocationDetail
