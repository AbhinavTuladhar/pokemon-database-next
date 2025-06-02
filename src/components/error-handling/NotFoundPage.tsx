'use client'

import { FC } from 'react'

import useResourceList from '@/hooks/useResourceList'
import { ResourceTypes } from '@/types'

import { ErrorContainerPage } from '../containers'
import { TransitionLink } from '../ui/Link'
import { PageTitle } from '../ui/Title'

import SimilarMatches from './SimilarMatches'

interface ContainerProps {
  pageUrl: string
  resourceType: ResourceTypes
  param: string
}

export const NotFoundPage: FC<ContainerProps> = ({ param, pageUrl, resourceType }) => {
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

  return (
    <>
      <title> Error 404: Page not found | Pokémon Database </title>
      <ErrorContainerPage>
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
        <div className="mt-4 pb-8">
          <span>
            <span> Or, return to the </span>
            <TransitionLink href="/"> Pokémon Database home page. </TransitionLink>
          </span>
        </div>
      </ErrorContainerPage>
    </>
  )
}
