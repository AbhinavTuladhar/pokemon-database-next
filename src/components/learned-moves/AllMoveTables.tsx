import { FC } from 'react'

import formatName from '@/utils/formatName'

import { SectionTitle } from '../containers'

import { MovesTable } from './MovesTable'
import { FinalMoveData } from './types'

interface MovesLearnProps {
  pokemonName: string
  movesData: FinalMoveData
  versionGroupName: string
}

const AllMoveTables: FC<MovesLearnProps> = ({ movesData, pokemonName, versionGroupName }) => {
  const properPokemonName = formatName(pokemonName)
  // return <TableTabs />

  return (
    <div className="grid grid-cols-pokemon-move-grid gap-x-8 gap-y-6">
      <div className="flex flex-col">
        {versionGroupName}
        <SectionTitle>Moves learnt by level up</SectionTitle>
        {movesData.level.length > 0 ? (
          <>
            <span className="mb-4">
              {`${properPokemonName} learns the following moves in generation 7 at the levels specified.`}
            </span>
            <MovesTable movesData={movesData.level} levelFlag={true} />
          </>
        ) : (
          `${properPokemonName} does not learn any moves by level up`
        )}

        <SectionTitle>Moves learnt by tutor</SectionTitle>
        {movesData?.tutor?.length > 0 ? (
          <>
            <span className="mb-4">
              {`${properPokemonName} can be taught the following moves in generation 7 by move tutors.`}
            </span>
            <MovesTable movesData={movesData.tutor} levelFlag={false} />
          </>
        ) : (
          `${properPokemonName} does not learn any move taught by a tutor.`
        )}
        <SectionTitle>Moves learnt by Breeding</SectionTitle>
        {movesData?.egg?.length > 0 ? (
          <>
            <span className="mb-4">
              {`${properPokemonName} learns the following moves in generation 7 by breeding.`}
            </span>
            <MovesTable movesData={movesData.egg} levelFlag={false} />
          </>
        ) : (
          `${properPokemonName} does not learn any moves by breeding.`
        )}
      </div>
      <div className="flex flex-col">
        <SectionTitle>Moves learnt by HM/TM</SectionTitle>
        {movesData?.machine?.length > 0 ? (
          <>
            <span className="mb-4">
              {`${properPokemonName} is compatible with these Technical Machines in Generation 7:`}
            </span>
            <MovesTable movesData={movesData.machine} levelFlag={false} />
          </>
        ) : (
          `${properPokemonName} does not learn any moves by TM or HM.`
        )}
      </div>
    </div>
  )
}

export default AllMoveTables
