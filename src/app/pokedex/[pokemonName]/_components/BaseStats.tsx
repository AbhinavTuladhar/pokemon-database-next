import { FC } from 'react'

import { SectionTitle } from '@/components/containers'
import StatBarTable from '@/components/stat-bar-table'
import { PokemonStat } from '@/types'
/*
Here, we define a function for returning an aray of objects containing:
1. The name of the state,
2. The base value,
3. The maximum value,
4. The minimum value.
*/

interface BaseStatProps {
  stats: Array<PokemonStat>
}

export const BaseStat: FC<BaseStatProps> = ({ stats }) => {
  return (
    <>
      <SectionTitle>Base Stats</SectionTitle>
      <StatBarTable stats={stats} showMinMax={true} />
      <div className="mt-4 text-sm font-extralight">
        The ranges shown on the right are for a level 100 Pokémon. Maximum values are based on a
        beneficial nature, 252 EVs, 31 IVs; minimum values are based on a hindering nature, 0 EVs, 0
        IVs.
      </div>
    </>
  )
}
