import React, { FC } from 'react'
import leven from 'leven'

import { FlatResourceList, ResourceTypes } from '@/types'
import formatName from '@/utils/formatName'

import { BlueLink } from '../ui/Link'
import { SectionTitle } from '../ui/Title'

interface MatchesProps {
  param: string
  resourceType: ResourceTypes
  resourcesList: FlatResourceList[]
}

const SimilarMatches: FC<MatchesProps> = ({ param, resourceType, resourcesList }) => {
  // Find the Levenshtein distance between the page param and the resource name
  const distances = resourcesList
    .map(resource => ({
      ...resource,
      distance: leven(param, resource.name),
    }))
    .sort((a, b) => a.distance - b.distance)
    .slice(0, 6)

  return (
    <div className="space-y-4">
      <SectionTitle> Possible matches: </SectionTitle>
      <ul className="list-inside list-disc pl-4">
        {distances.map(resource => (
          <li key={resource.name}>
            <BlueLink href={`/${resourceType}/${resource.name}`}>
              {formatName(resourceType)} - {formatName(resource.name)}
            </BlueLink>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default SimilarMatches
