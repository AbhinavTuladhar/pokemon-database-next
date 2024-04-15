import { FC, Suspense } from 'react'
import { Metadata } from 'next'

import PageTitle from '@/components/containers/PageTitle'
import LocationExtractor from '@/extractors/LocationExtractor'
import { EncountersApi } from '@/services/EncountersApi'
import { LocationApi } from '@/services/LocationApi'
import formatName from '@/utils/formatName'

import GenerationSection from './_components/GenerationSection'
import LocationPageSkeleton from './_components/LocationPageSkeleton'

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

const getLocationData = async (name: string) => {
  const response = await LocationApi.getByName(name)
  return LocationExtractor(response)
}

const getMethodDescriptions = async () => {
  const responses = await EncountersApi.getAllMethodDescriptions()
  return responses
}

const LocationDetail: FC<PageProps> = async ({ params: { areaName } }) => {
  const locationData = await getLocationData(areaName)
  const methodData = await getMethodDescriptions()

  return (
    <main>
      <PageTitle>{formatName(areaName)}</PageTitle>
      <Suspense fallback={<LocationPageSkeleton />}>
        <GenerationSection locationData={locationData} methodData={methodData} />
      </Suspense>
    </main>
  )
}

export default LocationDetail
