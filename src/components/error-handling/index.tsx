'use client'

import { FC } from 'react'

import useResourceList from '@/hooks/useResourceList'
import { ResourceTypes } from '@/types'

import { PageTitle } from '../containers'
import BlueLink from '../link'

import SimilarMatches from './SimilarMatches'

interface ContainerProps {
  pageUrl: string
  resourceType: ResourceTypes
  param: string
}

const ErrorContainer: FC<ContainerProps> = ({ param, pageUrl, resourceType }) => {
  // Using a client component as it doesn't lead to any issues
  const { data: searchData, error, isLoading } = useResourceList()

  if (!searchData || isLoading || error) return null

  // Select only the data in which the resource type matches. Pokedex and sprites are considered equivalent.
  const isSpritesResource = resourceType === 'sprites'

  const filteredResources = searchData.filter(resource => {
    if (isSpritesResource) {
      return resource.resourceType === 'pokedex'
    }
    return resource.resourceType === resourceType
  })

  console.log(resourceType)

  return (
    <>
      <title> Error 404: Page not found | Pokémon Database </title>
      <div className="absolute inset-0 z-[999] grid h-dvh place-items-center bg-gray-800 ">
        <div className="w-11/12 rounded-md bg-black px-4 pb-8 text-white lg:w-1/2">
          <div className="text-center">
            <PageTitle> Page Not Found. </PageTitle>
          </div>
          <div className="space-x-1">
            <span> The requested page </span>
            <span className="bg-gray-600 px-1 font-serif"> {pageUrl} </span>
            <span> could not be found. Please check that you typed the url correctly. </span>
          </div>
          {resourceType === 'generation' ? null : (
            <SimilarMatches
              param={param}
              resourceType={resourceType}
              resourcesList={filteredResources}
            />
          )}
          <div className="mt-4">
            <span>
              <span> Or, return to the </span>
              <BlueLink href="/"> Pokémon Database home page. </BlueLink>
            </span>
          </div>
        </div>
      </div>
    </>
  )
}

export default ErrorContainer
