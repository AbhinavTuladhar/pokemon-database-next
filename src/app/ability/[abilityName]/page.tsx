import { FC } from 'react'
import AbilityExtractor from '@/extractors/AbilityExtractor'
import { AbilityApi } from '@/services/AbilityApi'
import AbilityEffect from './AbilityEffect'
import AbilityDescription from './AbilityDescriptions'
import formatName from '@/utils/formatName'

interface AbilityPageParams {
  params: {
    abilityName: string
  }
}

const getAbilityData = async (name: string) => {
  const response = await AbilityApi.get(name)
  return AbilityExtractor(response)
}

const AbilityDetail: FC<AbilityPageParams> = async ({ params: { abilityName } }) => {
  const { descriptions, longEntry, name, pokemon } = await getAbilityData(abilityName)

  return (
    <main className="space-y-4">
      <h1 className="flex justify-center text-center text-4xl font-bold">
        {formatName(abilityName)} (ability)
      </h1>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <div>
          <AbilityEffect entry={longEntry} />
          <AbilityDescription descriptions={descriptions} />
        </div>
      </div>
    </main>
  )
}

export default AbilityDetail
