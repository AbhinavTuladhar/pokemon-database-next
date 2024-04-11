import { FC, ReactNode } from 'react'
import { BsArrowDown, BsArrowDownRight, BsArrowRight, BsArrowUpRight } from 'react-icons/bs'

import { EvolutionPokemon } from '@/types'
import evolutionStringFinder from '@/utils/evolutionStringFinder'

interface EvolutionSectionProps {
  individualPokemon: Array<ReactNode>
  finalPokemonData: Array<EvolutionPokemon>
}

const EvolutionDiv: FC<EvolutionSectionProps> = ({ individualPokemon, finalPokemonData }) => {
  const firstPokemonName = (finalPokemonData ?? [])[0]?.name || ''
  const wurmpleFlag = firstPokemonName === 'wurmple'

  return individualPokemon?.map((pokemon, index) => {
    const currentPokemonData = finalPokemonData[index]
    const pokemonData = finalPokemonData[(index + 1) % individualPokemon.length]
    const nextnextData = finalPokemonData[(index + 2) % individualPokemon.length]

    const nextPokemon = wurmpleFlag
      ? individualPokemon[index + 1]
      : individualPokemon[(index + 1) % individualPokemon.length]
    const nextNextPokemon = wurmpleFlag
      ? individualPokemon[(index + 2) % individualPokemon.length]
      : individualPokemon[(index + 2) % individualPokemon.length]

    const { evolutionDetails } = pokemonData
    const { evolutionDetails: nextnextEvoDetail } = nextnextData

    const evolutionExtractedInfo = evolutionStringFinder(evolutionDetails)
    const evolutionExtractedInfoNext = evolutionStringFinder(nextnextEvoDetail)

    // This is for a three-way evolution
    const finalPokemon = wurmpleFlag ? undefined : individualPokemon[index + 3]
    const lastPokemonData = finalPokemonData[index + 3]
    const { evolutionDetails: finalEvoDetail } = lastPokemonData || {}
    const evolutionExtractedInfoFinal = evolutionStringFinder(finalEvoDetail)

    // For split evolutions
    /*
    Note: the middle arrow is only for a three-way evoltuion.
    */
    if (currentPokemonData.nextEvoSplit) {
      return (
        <div className="flex flex-col md:flex-row" key={index}>
          {pokemon}
          <div className="flex flex-row justify-between gap-y-10 md:flex-col">
            <div className="flex flex-col items-center justify-center text-center md:flex-row">
              <div className="mx-4 flex w-full flex-col items-center justify-center md:w-48">
                <BsArrowUpRight size={60} className="hidden md:flex" />
                <BsArrowDown size={60} className="mx-4 flex md:hidden" />
                <span> {`(${evolutionExtractedInfo})`} </span>
              </div>
              {nextPokemon}
            </div>
            <div className="flex flex-col items-center justify-center text-center md:flex-row">
              <div className="mx-4 flex w-full flex-col items-center justify-center md:w-48">
                {finalPokemon ? (
                  <BsArrowRight size={60} className="hidden md:flex" />
                ) : (
                  <BsArrowDownRight size={60} className="hidden md:flex" />
                )}
                <BsArrowDown size={60} className="mx-4 flex md:hidden" />
                <span> {`(${evolutionExtractedInfoNext})`} </span>
              </div>
              {nextNextPokemon}
            </div>
            {finalPokemon && (
              <div className="flex flex-col items-center justify-center text-center md:flex-row">
                <div className="mx-4 flex w-full flex-col items-center justify-center md:w-48">
                  <BsArrowDownRight size={60} className="hidden md:flex" />
                  <BsArrowDown size={60} className="mx-4 flex md:hidden" />
                  {evolutionExtractedInfoFinal
                    ? `(${evolutionExtractedInfoFinal})`
                    : `(${evolutionExtractedInfoNext})`}
                </div>
                {finalPokemon}
              </div>
            )}
          </div>
        </div>
      )

      // For regular, linear evolutions.
    } else if (!currentPokemonData.isSplitEvo) {
      return (
        <div
          className="flex flex-col items-center justify-center sm:flex-col md:flex-row"
          key={index}
        >
          {pokemon}
          {index !== individualPokemon.length - 1 && !currentPokemonData.nextEvoSplit && (
            <>
              <div className="hidden w-full flex-col items-center justify-center text-center sm:hidden md:flex md:w-48">
                <BsArrowRight size={60} className="mx-4" />
                {`(${evolutionExtractedInfo})`}
              </div>
              <div className="flex w-full flex-col items-center justify-center text-center sm:flex md:hidden md:w-48">
                <BsArrowDown size={60} className="my-2" />
                {`(${evolutionExtractedInfo})`}
              </div>
            </>
          )}
        </div>
      )
    } else {
      return null
    }
  })
}

export default EvolutionDiv
