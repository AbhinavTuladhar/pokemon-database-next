import { FC } from 'react'

import { versionNameBreakMap } from '@/data/gameNameMap'
import { TransformedMoveLevel } from '@/types'
import formatName from '@/utils/formatName'

import MoveSection from './MoveSection'
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

const filterMovesByVersion = (arr: Array<TransformedMoveLevel>, versionGroupName: string) =>
  arr.filter(move => move.versionGroupNames.includes(versionGroupName))

const AllMoveTables: FC<MovesLearnProps> = ({ movesData, pokemonName, versionGroupName }) => {
  const properPokemonName = formatName(pokemonName)

  const { egg, level, machine, tutor } = movesData

  // Only show the moves that are present in the specified version (like x/y or or/as)
  const eggMoves = filterMovesByVersion(egg, versionGroupName)
  const levelUpMoves = filterMovesByVersion(level, versionGroupName)
  const machineMoves = filterMovesByVersion(machine, versionGroupName)
  const tutorMoves = filterMovesByVersion(tutor, versionGroupName)

  const sectionsData = [
    {
      title: 'Moves learnt by level up',
      data: levelUpMoves,
      subTitle: `${properPokemonName} learns the following moves in Pokémon ${formatVersionGroupNames(versionGroupName)} at the levels specified.`,
      levelFlag: true,
      errorText: `${properPokemonName} does not learn any moves by level up.`,
    },
    {
      title: 'Moves learnt by tutor',
      data: tutorMoves,
      subTitle: `${properPokemonName} can be taught the following moves in Pokémon ${formatVersionGroupNames(versionGroupName)} by move tutors.`,
      levelFlag: false,
      errorText: `${properPokemonName} does not learn any moves by move tutors in Pokémon ${formatVersionGroupNames(versionGroupName)}.`,
    },
    {
      title: 'Moves learnt by breeding',
      data: eggMoves,
      subTitle: `${properPokemonName} learns the following moves in Pokémon ${formatVersionGroupNames(versionGroupName)} by breeding.`,
      levelFlag: false,
      errorText: `${properPokemonName} does not learn any moves by breeding in Pokémon ${formatVersionGroupNames(versionGroupName)}.`,
    },
    {
      title: 'Moves learnt by TM/HM',
      data: machineMoves,
      subTitle: `${properPokemonName} is compatible with these Technical Machines in Pokémon ${formatVersionGroupNames(versionGroupName)}.`,
      levelFlag: false,
      errorText: `${properPokemonName} does not learn any moves by TM or HM in Pokémon ${formatVersionGroupNames(versionGroupName)}.`,
    },
  ]

  return (
    <div className="lg-xl:grid-cols-2 grid grid-cols-1 gap-x-8">
      <div className="flex flex-col">
        {sectionsData.slice(0, -1).map(({ title, data, subTitle, levelFlag, errorText }) => (
          <MoveSection
            key={title}
            title={title}
            subTitle={subTitle}
            moveData={data}
            levelFlag={levelFlag}
            errorText={errorText}
          />
        ))}
      </div>
      <div className="flex flex-col">
        {sectionsData.slice(-1).map(({ title, data, subTitle, levelFlag, errorText }) => (
          <MoveSection
            key={title}
            title={title}
            subTitle={subTitle}
            moveData={data}
            levelFlag={levelFlag}
            errorText={errorText}
          />
        ))}
      </div>
    </div>
  )
}

export default AllMoveTables
