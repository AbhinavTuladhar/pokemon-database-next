import React from 'react'
import { NextPage } from 'next'
import Image from 'next/image'

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

  // Sanitising the pokemon names for Farfetch'd
  const availablePokemon = Object.keys(data)
    .sort((a, b) => (a > b ? 1 : -1))
    .map(pokemon => pokemon.replace(/’/g, '').replace(/.\s/g, '-'))

  return (
    <div>
      {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
      <PageTitle>
        Gen {generation} {format.toUpperCase()} - Analyses and Sets
      </PageTitle>
      <ul className="grid list-none grid-cols-competitive-grid-list">
        {availablePokemon.map(pokemon => (
          <li className="flex items-center gap-x-4" key={pokemon}>
            <Image
              alt={pokemon}
              className="size-12"
              width={48}
              height={48}
              src={`https://img.pokemondb.net/sprites/x-y/normal/${pokemon.toLowerCase()}.png`}
            />
            <BlueLink href={`/competitive/${formatCode}/${pokemon}`}>{pokemon}</BlueLink>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Page
