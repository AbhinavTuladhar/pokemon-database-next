import { FC } from 'react'

import { SectionTitle } from '@/components/containers'
import MoveExtractor from '@/extractors/MoveExtractor'
import { MovesApi } from '@/services'
import { Move, NamedApiResource, PokemonMove, PokemonMoveVersion, TransformedMove } from '@/types'
import formatName from '@/utils/formatName'

import { MovesTable } from './MovesTable'

interface MoveData {
  version_group_details: PokemonMoveVersion[]
  move: NamedApiResource<Move>
}

// This is for filtering out the moves on depending on how it is learnt - only for SM.
const separateMoves = ({ data, learnMethod }: { data: Array<MoveData>; learnMethod: string }) => {
  const movesLearnt = data.map(move => {
    const { version_group_details } = move // this is an array
    const filteredMoves = version_group_details.filter(
      version => version.move_learn_method.name === learnMethod,
    )
    return {
      name: move.move.name,
      version_group_details: filteredMoves,
    }
  })
  const finalFilteredMoves = movesLearnt.filter(move => move.version_group_details.length > 0)
  return finalFilteredMoves
}

const getMovesInformation = async (names: Array<string>) => {
  const responses = await MovesApi.getByNames(names)
  return responses.map(MoveExtractor)
}

interface MovesLearnProps {
  pokemonName: string
  moves: Array<PokemonMove>
}

export const MovesLearned: FC<MovesLearnProps> = async ({ moves, pokemonName }) => {
  const properPokemonName = formatName(pokemonName)

  // Consider that the latest gen is 7.
  const SMData = moves.flatMap(move => {
    const { version_group_details } = move
    const SMInfo = version_group_details.filter(
      version => version.version_group.name === 'ultra-sun-ultra-moon',
    )
    return {
      ...move,
      version_group_details: SMInfo,
    }
  })

  // Filter out the details in the version group details array is empty
  const finalSMData = SMData.filter(move => move.version_group_details.length > 0)
  const moveData = finalSMData

  // This is for separating out the moves learnt by level up, TM/HM and by breeding.
  const levelUpMoves = separateMoves({
    data: moveData,
    learnMethod: 'level-up',
  })
  const machineMoves = separateMoves({ data: moveData, learnMethod: 'machine' })
  const eggMoves = separateMoves({ data: moveData, learnMethod: 'egg' })
  const tutorMoves = separateMoves({ data: moveData, learnMethod: 'tutor' })

  // Now sort the moves by some conditions.
  // sort level up moves by the level learnt.
  const sortedLevelMoves = levelUpMoves.toSorted((curr, next) => {
    const levelLearntCurrent =
      curr.version_group_details[curr.version_group_details.length - 1].level_learned_at
    const levelLearntNext =
      next.version_group_details[next.version_group_details.length - 1].level_learned_at
    if (levelLearntCurrent < levelLearntNext) return -1
    else if (levelLearntCurrent > levelLearntNext) return 1
    else return curr.name < next.name ? -1 : 1
  })

  // Extract the move name and the level learnt for the moves learn by level up.
  const levelLearntData = levelUpMoves?.map(move => {
    return {
      name: move.name,
      levelLearntAt:
        move.version_group_details[move.version_group_details.length - 1].level_learned_at,
    }
  })

  const moveNames = {
    level: sortedLevelMoves.map(move => move.name),
    machine: machineMoves.map(move => move.name),
    egg: eggMoves.map(move => move.name),
    tutor: tutorMoves.map(move => move.name),
  }

  const [levelMoveDetails, tutorMoveDetails, machineMoveDetails, eggMoveDetails] =
    await Promise.all([
      getMovesInformation(moveNames.level),
      getMovesInformation(moveNames.tutor),
      getMovesInformation(moveNames.machine),
      getMovesInformation(moveNames.egg),
    ])

  const combinedLevelDetails = levelLearntData.map(obj1 => {
    const obj2 = levelMoveDetails.find(obj => obj.moveName === obj1.name) as TransformedMove
    return { ...obj2, levelLearnedAt: obj1.levelLearntAt }
  })

  const finalMoveDetails = {
    level: combinedLevelDetails,
    tutor: tutorMoveDetails,
    machine: machineMoveDetails,
    egg: eggMoveDetails,
  }

  return (
    <div className="grid grid-cols-pokemon-move-grid gap-x-8 gap-y-6">
      <div className="flex flex-col">
        <SectionTitle>Moves learnt by level up</SectionTitle>
        {finalMoveDetails.level.length > 0 ? (
          <>
            <span className="mb-4">
              {`${properPokemonName} learns the following moves in generation 7 at the levels specified.`}
            </span>
            <MovesTable movesData={finalMoveDetails.level} levelFlag={true} />
          </>
        ) : (
          `${properPokemonName} does not learn any moves by level up`
        )}

        <SectionTitle>Moves learnt by tutor</SectionTitle>
        {finalMoveDetails?.tutor?.length > 0 ? (
          <>
            <span className="mb-4">
              {`${properPokemonName} can be taught the following moves in generation 7 by move tutors.`}
            </span>
            <MovesTable movesData={finalMoveDetails.tutor} levelFlag={false} />
          </>
        ) : (
          `${properPokemonName} does not learn any move taught by a tutor.`
        )}
        <SectionTitle>Moves learnt by Breeding</SectionTitle>
        {finalMoveDetails?.egg?.length > 0 ? (
          <>
            <span className="mb-4">
              {`${properPokemonName} learns the following moves in generation 7 by breeding.`}
            </span>
            <MovesTable movesData={finalMoveDetails.egg} levelFlag={false} />
          </>
        ) : (
          `${properPokemonName} does not learn any moves by breeding.`
        )}
      </div>
      <div className="flex flex-col">
        <SectionTitle>Moves learnt by HM/TM</SectionTitle>
        {finalMoveDetails?.machine?.length > 0 ? (
          <>
            <span className="mb-4">
              {`${properPokemonName} is compatible with these Technical Machines in Generation 7:`}
            </span>
            <MovesTable movesData={finalMoveDetails.machine} levelFlag={false} />
          </>
        ) : (
          `${properPokemonName} does not learn any moves by TM or HM.`
        )}
      </div>
    </div>
  )
}
