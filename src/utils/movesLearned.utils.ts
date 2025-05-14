import { MoveExtractor } from '@/extractors'
import MoveService from '@/features/battle/services/move.service'
import { Move, NamedApiResource, PokemonMove, PokemonMoveVersion, TransformedMove } from '@/types'

interface MoveData {
  version_group_details: PokemonMoveVersion[]
  move: NamedApiResource<Move>
}

/**
 * Omit move and replace it with the name key
 */
interface MoveDataWithVersionGroupNames extends Omit<MoveData, 'move'> {
  versionGroupNames: Array<string>
  name: string
}

const getMovesInformation = async (names: Array<string>) => {
  const responses = await MoveService.getByNames(names)
  return responses.map(MoveExtractor)
}

const filterByVersionGroup = (moves: Array<PokemonMove>, versionGroupNames: Array<string>) => {
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
  return versionsMoveData.filter(move => move.version_group_details.length > 0)
}

/**
 * This is for filtering out the moves on depending on how it is learnt
 */
const separateMoves = ({
  data,
  learnMethod,
}: {
  data: Array<MoveData>
  learnMethod: 'level-up' | 'machine' | 'egg' | 'tutor'
}) => {
  const movesLearnt = data.map(move => {
    const { version_group_details } = move // this is an array
    const filteredMoves = version_group_details.filter(
      version => version.move_learn_method.name === learnMethod,
    )
    return {
      name: move.move.name,
      version_group_details: filteredMoves,
      versionGroupNames: version_group_details.map(version => version.version_group.name),
    }
  })
  const finalFilteredMoves = movesLearnt.filter(move => move.version_group_details.length > 0)

  return finalFilteredMoves
}

/**
 * This is for categorising the moves learnt by level up, TM/HM and by breeding
 */
const categoriseMoves = (data: Array<MoveData>) => {
  return [
    separateMoves({ data, learnMethod: 'level-up' }),
    separateMoves({ data, learnMethod: 'machine' }),
    separateMoves({ data, learnMethod: 'egg' }),
    separateMoves({ data, learnMethod: 'tutor' }),
  ]
}

/**
 * Sorting the level-up moves on the basis on the level learnt.
 */
const sortLevelUpMoves = (moves: Array<MoveDataWithVersionGroupNames>) => {
  return moves.sort((curr, next) => {
    const levelLearntCurrent =
      curr.version_group_details[curr.version_group_details.length - 1].level_learned_at
    const levelLearntNext =
      next.version_group_details[next.version_group_details.length - 1].level_learned_at
    if (levelLearntCurrent < levelLearntNext) return -1
    else if (levelLearntCurrent > levelLearntNext) return 1
    else return curr.name < next.name ? -1 : 1
  })
}

interface FetchDetailProps {
  levelUpMoves: Array<MoveDataWithVersionGroupNames>
  machineMoves: Array<MoveDataWithVersionGroupNames>
  eggMoves: Array<MoveDataWithVersionGroupNames>
  tutorMoves: Array<MoveDataWithVersionGroupNames>
}

/**
 * Fetching the information of all the moves
 */
const fetchMoveDetails = async ({
  levelUpMoves,
  machineMoves,
  eggMoves,
  tutorMoves,
}: FetchDetailProps) => {
  const levelUpMoveNames = levelUpMoves.map(move => move.name)
  const machineMoveNames = machineMoves.map(move => move.name)
  const eggMoveNames = eggMoves.map(move => move.name)
  const tutorMoveNames = tutorMoves.map(move => move.name)

  const [levelMoveDetails, tutorMoveDetails, machineMoveDetails, eggMoveDetails] =
    await Promise.all([
      getMovesInformation(levelUpMoveNames),
      getMovesInformation(tutorMoveNames),
      getMovesInformation(machineMoveNames),
      getMovesInformation(eggMoveNames),
    ])

  return { levelMoveDetails, tutorMoveDetails, machineMoveDetails, eggMoveDetails }
}

/**
 * Combine the base move data with fetched move details
 * If level flag is set to true, then the level learnt at is added
 * Regardless, the versionGroupNames are amended to the original object.
 */
const combineMoveDetails = (
  baseMoves: Array<MoveDataWithVersionGroupNames>,
  fetchedData: Array<TransformedMove>,
  levelFlag = false,
) =>
  baseMoves.map(obj1 => {
    const obj2 = fetchedData.find(obj => obj.moveName === obj1.name) as TransformedMove
    return levelFlag
      ? {
          ...obj2,
          levelLearnedAt: obj1.version_group_details[0].level_learned_at,
          versionGroupNames: obj1.versionGroupNames,
        }
      : { ...obj2, versionGroupNames: obj1.versionGroupNames }
  })

export const processMoveData = async (
  moves: Array<PokemonMove>,
  versionGroupNames: Array<string>,
) => {
  const moveData = filterByVersionGroup(moves, versionGroupNames)

  // This is for separating out the moves learnt by level up, TM/HM and by breeding.
  const [levelUpMoves, machineMoves, eggMoves, tutorMoves] = categoriseMoves(moveData)

  // Sort level up moves by the level learnt.
  const sortedLevelMoves = sortLevelUpMoves(levelUpMoves)

  // Getting the actual move details
  const { levelMoveDetails, tutorMoveDetails, machineMoveDetails, eggMoveDetails } =
    await fetchMoveDetails({
      levelUpMoves: sortedLevelMoves,
      machineMoves,
      eggMoves,
      tutorMoves,
    })

  // Amend the level learned at and version group names information.
  const [finalLevelDetails, finalTutorDetails, finalMachineDetails, finalEggDetails] = [
    combineMoveDetails(levelUpMoves, levelMoveDetails, true),
    combineMoveDetails(tutorMoves, tutorMoveDetails, false),
    combineMoveDetails(machineMoves, machineMoveDetails, false),
    combineMoveDetails(eggMoves, eggMoveDetails, false),
  ]

  return {
    level: finalLevelDetails,
    tutor: finalTutorDetails,
    machine: finalMachineDetails,
    egg: finalEggDetails,
  }
}
