import React from 'react'
import { Metadata } from 'next'

import { PageTitle } from '@/components/ui/Title'
import { ContestApi } from '@/services/ContestApi'

import { EffectTable } from './_components'

export const metadata: Metadata = {
  title: 'Pokémon Contest Effects | Pokémon Database',
}

const getContestsData = async () => {
  const response = await ContestApi.getAllEffectsData()
  return response
}

const ContestPage = async () => {
  const data = await getContestsData()

  return (
    <main>
      <PageTitle>Pokémon Contests</PageTitle>
      <EffectTable contestData={data} />
    </main>
  )
}

export default ContestPage
