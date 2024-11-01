import { FC } from 'react'

import { versionNameBreakMap } from '@/data/gameNameMap'
import formatName from '@/utils/formatName'

import { SectionTitle } from '../containers'

import { MovesTable } from './MovesTable'
import { FinalMoveData } from './types'

interface MovesLearnProps {
  pokemonName: string
  movesData: FinalMoveData
  versionGroupName: string
}

const formatVersionGroupNames = (groupedString: string) => {
  const versionNames = versionNameBreakMap[groupedString]
  return versionNames.map(formatName).join(' & ')
}

const AllMoveTables: FC<MovesLearnProps> = ({ movesData, pokemonName, versionGroupName }) => {
  const properPokemonName = formatName(pokemonName)

  const { egg, level, machine, tutor } = movesData

  const eggMoves = egg.filter(move => move.versionGroupNames.includes(versionGroupName))
  const levelUpMoves = level.filter(move => move.versionGroupNames.includes(versionGroupName))
  const machineMoves = machine.filter(move => move.versionGroupNames.includes(versionGroupName))
  const tutorMoves = tutor.filter(move => move.versionGroupNames.includes(versionGroupName))

  return (
    <div className="grid grid-cols-pokemon-move-grid gap-x-8 gap-y-6">
      <div className="flex flex-col">
        <SectionTitle>Moves learnt by level up</SectionTitle>
        {levelUpMoves.length > 0 ? (
          <>
            <span className="mb-4 text-sm">
              {`${properPokemonName} learns the following moves in Pokémon ${formatVersionGroupNames(versionGroupName)} at the levels specified.`}
            </span>
            <MovesTable movesData={levelUpMoves} levelFlag={true} />
          </>
        ) : (
          `${properPokemonName} does not learn any moves by level up`
        )}

        <SectionTitle>Moves learnt by tutor</SectionTitle>
        {tutorMoves.length > 0 ? (
          <>
            <span className="mb-4 text-sm">
              {`${properPokemonName} can be taught the following moves in Pokémon ${formatVersionGroupNames(versionGroupName)} by move tutors.`}
            </span>
            <MovesTable movesData={tutorMoves} levelFlag={false} />
          </>
        ) : (
          `${properPokemonName} does not learn any move taught by a tutor.`
        )}
        <SectionTitle>Moves learnt by Breeding</SectionTitle>
        {eggMoves.length > 0 ? (
          <>
            <span className="mb-4 text-sm">
              {`${properPokemonName} learns the following moves in Pokémon ${formatVersionGroupNames(versionGroupName)} by breeding.`}
            </span>
            <MovesTable movesData={eggMoves} levelFlag={false} />
          </>
        ) : (
          `${properPokemonName} does not learn any moves by breeding.`
        )}
      </div>
      <div className="flex flex-col">
        <SectionTitle>Moves learnt by HM/TM</SectionTitle>
        {machineMoves.length > 0 ? (
          <>
            <span className="mb-4 text-sm">
              {`${properPokemonName} is compatible with these Technical Machines in Pokémon ${formatVersionGroupNames(versionGroupName)}:`}
            </span>
            <MovesTable movesData={machineMoves} levelFlag={false} />
          </>
        ) : (
          `${properPokemonName} does not learn any moves by TM or HM.`
        )}
      </div>
    </div>
  )
}

export default AllMoveTables
