import React from 'react'
import { Metadata } from 'next'

import { PageTitle } from '@/components/ui/Title'
import ContestService from '@/features/battle/services/contest.service'

import { EffectTable } from './_components'

export const metadata: Metadata = {
  title: 'Pokémon Contest Effects | Pokémon Database',
}

const getContestsData = async () => {
  const response = await ContestService.getAllEffectsData()
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
