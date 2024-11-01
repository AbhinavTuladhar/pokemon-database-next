import MoveExtractor from '@/extractors/MoveExtractor'
import { MovesApi } from '@/services'
import { Move, NamedApiResource, PokemonMove, PokemonMoveVersion, TransformedMove } from '@/types'

interface MoveData {
  version_group_details: PokemonMoveVersion[]
  move: NamedApiResource<Move>
}

const getMovesInformation = async (names: Array<string>) => {
  const responses = await MovesApi.getByNames(names)
  return responses.map(MoveExtractor)
}

export const processMoveData = async (
  moves: Array<PokemonMove>,
  versionGroupNames: Array<string>,
) => {
  const versionsMoveData = moves.flatMap(move => {
    const { version_group_details } = move
    const SMInfo = version_group_details.filter(version =>
      versionGroupNames.includes(version.version_group.name),
    )
    return {
      ...move,
      version_group_details: SMInfo,
    }
  })

  // Filter out the details in the version group details array is empty
  const finalVersionsMoveData = versionsMoveData.filter(
    move => move.version_group_details.length > 0,
  )
  const moveData = finalVersionsMoveData

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
  const sortedLevelMoves = levelUpMoves.sort((curr, next) => {
    const levelLearntCurrent =
      curr.version_group_details[curr.version_group_details.length - 1].level_learned_at
    const levelLearntNext =
      next.version_group_details[next.version_group_details.length - 1].level_learned_at
    if (levelLearntCurrent < levelLearntNext) return -1
    else if (levelLearntCurrent > levelLearntNext) return 1
    else return curr.name < next.name ? -1 : 1
  })

  // Extract the move name and the level learnt for the moves learn by level up.
  const levelLearntData = levelUpMoves.map(move => {
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

  return {
    level: combinedLevelDetails,
    tutor: tutorMoveDetails,
    machine: machineMoveDetails,
    egg: eggMoveDetails,
  }
}

// This is for filtering out the moves on depending on how it is learnt - only for SM.
export const separateMoves = ({
  data,
  learnMethod,
}: {
  data: Array<MoveData>
  learnMethod: string
}) => {
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
