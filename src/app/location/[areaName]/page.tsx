import { FC } from 'react'
import { Metadata } from 'next'

import { PageTitle } from '@/components/ui/Title'
import EncounterService from '@/features/games/services/encounter.service'
import { LocationAreaApi, LocationService } from '@/features/games/services/location.service'
import { transformLocation } from '@/features/games/transformers/transform-location'
import { transformLocationArea } from '@/features/games/transformers/transform-location-area'
import { GroupedLocationArea } from '@/types'
import formatName from '@/utils/formatName'

import { GenerationEncounters } from './_components'

interface PageProps {
  params: {
    areaName: string
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { areaName } = params
  return {
    title: `${formatName(areaName)} | Pokémon locations | Pokémon Database`,
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

const getLocationData = async (name: string) => {
  const response = await LocationService.getByName(name)
  return transformLocation(response)
}

const getMethodDescriptions = async () => {
  const responses = await EncounterService.getAllMethodDescriptions()
  return responses
}

const getSubLocationData = async (names: string[]) => {
  const responses = await LocationAreaApi.getByNames(names)
  return responses.map(transformLocationArea)
}

const LocationDetail: FC<PageProps> = async ({ params: { areaName } }) => {
  const locationData = await getLocationData(areaName)
  const methodData = await getMethodDescriptions()

  const subLocationNames = locationData.subLocations.map(subLocation => subLocation.name)
  const subLocationData = await getSubLocationData(subLocationNames)

  // Inform the user if there is no encounter information.
  if (subLocationData?.length === 0) {
    return (
      <main>
        <PageTitle>{formatName(areaName)}</PageTitle>
        <h2 className="text-center text-2xl font-bold">
          Could not find any encounter information for this location.
        </h2>
      </main>
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

  return (
    <main>
      <PageTitle>
        <span>{formatName(locationData.locationName)}</span>
        <span className="text-gray-400"> (location) </span>
      </PageTitle>

      {groupedByGenerationSubLocationAndMethod.map((locationGroup, index) => {
        return (
          <GenerationEncounters
            key={locationGroup.generation + index}
            locationData={locationGroup}
            methodData={methodData}
          />
        )
      })}
    </main>
  )
}

export default LocationDetail
