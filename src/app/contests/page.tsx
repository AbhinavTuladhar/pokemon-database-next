import React from 'react'

import { PageTitle } from '@/components/containers'
import { ContestApi } from '@/services/ContestApi'

import { EffectTable } from './_components'

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
