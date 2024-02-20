import { FC } from 'react'
import BlueLink from '@/components/BlueLink'
import TypeCard from '@/components/TypeCard'
import SectionTitle from '@/components/SectionTitle'
import TableContainer from '@/components/containers/TableContainer'
import formatName from '@/utils/formatName'
import movePhysical from '../../images/move-physical.png'
import moveSpecial from '../../images/move-special.png'
import moveStatus from '../../images/move-status.png'
import {
  PokemonMove,
  PokemonMoveVersion,
  NamedApiResource,
  Move,
  TransformedMoveLevel,
  TransformedMove,
} from '@/types'
import stringifyUrl from '@/utils/stringifyUrl'
import { MovesApi } from '@/services/MovesApi'
import MoveExtractor from '@/extractors/MoveExtractor'
import MovesTable from './MovesTable'

interface MoveData {
  version_group_details: PokemonMoveVersion[]
  move: NamedApiResource<Move>
}

// This is for filtering out the moves on depending on how it is learnt - only for SM.
const separateMoves = ({ data, learnMethod }: { data: Array<MoveData>; learnMethod: string }) => {
  const movesLearnt = data.map((move) => {
    const {
      version_group_details,
      move: { name, url },
    } = move // this is an array
    const filteredMoves = version_group_details.filter(
      (version) => version.move_learn_method.name === learnMethod,
    )
    const replacedUrl = stringifyUrl(url, name)
    return {
      name: move.move.name,
      moveURL: replacedUrl,
      version_group_details: filteredMoves,
    }
  })
  const finalFilteredMoves = movesLearnt.filter((move) => move.version_group_details.length > 0)
  return finalFilteredMoves
}

// This is for mapping the move damage class to its respective image.
// const returnMoveImage = (damageClass) => {
//   if (damageClass === 'physical') return movePhysical
//   else if (damageClass === 'special') return moveSpecial
//   else if (damageClass === 'status') return moveStatus
//   else return ''
// }

const fetchMovesInformation = async (urls: string[]) => {
  // const responses = await fetchMultipleData<PokemonMove>(urls)
  const responses = await MovesApi.getByUrls(urls)
  return responses.map(MoveExtractor)
}

interface MovesLearnProps {
  pokemonName: string
  moves: Array<PokemonMove>
}

const MovesLearned: FC<MovesLearnProps> = async ({ moves, pokemonName }) => {
  const properPokemonName = formatName(pokemonName)

  // Consider that the latest gen is 7.
  const SMData = moves.flatMap((move) => {
    const { version_group_details } = move
    const SMInfo = version_group_details.filter(
      (version) => version.version_group.name === 'ultra-sun-ultra-moon',
    )
    return {
      ...move,
      version_group_details: SMInfo,
    }
  })

  // Filter out the details in the version group details array is empty
  const finalSMData = SMData.filter((move) => move.version_group_details.length > 0)
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
  const levelLearntData = levelUpMoves?.map((move) => {
    return {
      name: move.name,
      levelLearntAt:
        move.version_group_details[move.version_group_details.length - 1].level_learned_at,
    }
  })

  const moveUrls = {
    level: sortedLevelMoves?.map((move) => move.moveURL),
    machine: machineMoves?.map((move) => move.moveURL),
    egg: eggMoves?.map((move) => move.moveURL),
    tutor: tutorMoves?.map((move) => move.moveURL),
  }

  // const levelMoveDetails = await fetchMovesInformation(moveUrls.level)

  const [levelMoveDetails, tutorMoveDetails, machineMoveDetails, eggMoveDetails] =
    await Promise.all([
      fetchMovesInformation(moveUrls.level),
      fetchMovesInformation(moveUrls.tutor),
      fetchMovesInformation(moveUrls.machine),
      fetchMovesInformation(moveUrls.egg),
    ])

  const combinedLevelDetails = levelLearntData.map((obj1) => {
    const obj2 = levelMoveDetails.find((obj) => obj.moveName === obj1.name) as TransformedMove
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
        {finalMoveDetails.level.length > 1 ? (
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
        {finalMoveDetails?.tutor?.length > 1 ? (
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
        {finalMoveDetails?.egg?.length > 1 ? (
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
        {finalMoveDetails?.machine?.length > 1 ? (
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

export default MovesLearned
