import React from 'react'
import { NextPage } from 'next'

import { PageTitle } from '@/components/containers'
import BlueLink from '@/components/link'
import { SmogonApi } from '@/services/SmogonApi'
import { extractParts } from '@/utils/smogon.utils'

const getFormatAnalyses = async (formatCode: string) => {
  const response = await SmogonApi.getAnalysis(formatCode)
  return response
}

interface PageProps {
  params: {
    formatCode: string
  }
}

const Page: NextPage<PageProps> = async ({ params: { formatCode } }) => {
  const data = await getFormatAnalyses(formatCode)

  if (!data) {
    return <div>Format not found</div>
  }

  const { generation, format } = extractParts(formatCode)

  const availablePokemon = Object.keys(data)

  return (
    <div>
      {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
      <PageTitle>
        Gen {generation} {format.toUpperCase()} - Analyses and Sets
      </PageTitle>
      <ul className="list-disc">
        {availablePokemon.map(pokemon => (
          <li key={pokemon}>
            <BlueLink href={`/competitive/${formatCode}/${pokemon}`}>{pokemon}</BlueLink>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Page
