import { FC, Suspense } from 'react'
import { Metadata } from 'next'

import PageTitle from '@/components/containers/PageTitle'
import LocationExtractor from '@/extractors/LocationExtractor'
import { LocationApi } from '@/services/LocationApi'
import formatName from '@/utils/formatName'

import GenerationSection from './_components/GenerationSection'

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

const LocationDetail: FC<PageProps> = async ({ params: { areaName } }) => {
  const locationData = await getLocationData(areaName)

  return (
    <main>
      <PageTitle>{formatName(areaName)}</PageTitle>
      <Suspense fallback={<div> Loading... </div>}>
        <GenerationSection locationData={locationData} />
      </Suspense>
    </main>
  )
}

export default LocationDetail
