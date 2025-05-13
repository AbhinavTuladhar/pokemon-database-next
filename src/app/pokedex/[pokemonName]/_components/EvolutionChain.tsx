import React, { ReactNode } from 'react'

import { SectionTitle } from '@/components/containers/SectionTitle'
import { EvolutionPokemonCard } from '@/features/pokemon/components/PokeCard'
import transformPokemon from '@/features/pokemon/transformers/transformPokemon'
import { EvolutionApi, PokemonApi } from '@/services'
import type { ChainLink, EvolutionDetail, EvolutionPokemon } from '@/types'
import { getResourceId } from '@/utils/urlUtils'

import EvolutionDiv from './EvolutionDiv'

// A function to find all the keys of an object that are not null, false or ''
const nonNullValues = (obj: EvolutionDetail): Partial<EvolutionDetail> => {
  return Object.fromEntries(
    Object.entries(obj).filter(([_, value]) => value !== null && value !== false && value !== ''),
  )
}

interface EvolutionProps {
  url: string
}

const getEvolutionData = async (id: number) => {
  const response = await EvolutionApi.getById(id)
  return response
}

const getAllPokemonData = async (ids: Array<number>) => {
  const responses = await PokemonApi.getByIds(ids)
  return responses.map(response => {
    const { name, homeSprite, id, types } = transformPokemon(response)
    return { name, homeSprite, id, types }
  })
}

export const EvolutionChain: React.FC<EvolutionProps> = async ({ url }) => {
  const evolutionData = await getEvolutionData(+getResourceId(url))

  interface EvolutionInformation {
    id: number
    evolutionDetails: Array<Partial<EvolutionDetail>>
    speciesName: string
    speciesUrl: string
    nextEvoSplit: boolean
  }

  // Use a recursive function to fetch the data of all the pokemon within the evolution chain.
  const getAllData = () => {
    const information: Array<EvolutionInformation> = []

    const traverseChain = (chain: ChainLink) => {
      const {
        evolution_details,
        evolves_to: evolvesTo,
        species: { name: speciesName = '', url: speciesUrl = '' },
      } = chain || {}
      const idNumber = parseInt(speciesUrl.match(/\/(\d+)\/$/)![1])

      const evoDetailsNew = evolution_details.map(nonNullValues)

      information.push({
        id: idNumber,
        evolutionDetails: evoDetailsNew,
        speciesName,
        speciesUrl,
        nextEvoSplit: evolvesTo.length > 1,
      })

      if (evolvesTo.length > 0) {
        evolvesTo.forEach(evolution => {
          traverseChain(evolution)
        })
      }
    }
    if (evolutionData?.chain) {
      traverseChain(evolutionData.chain)
    }
    return information
  }

  const evolutionChainData = getAllData()

  const pokemonIds = evolutionChainData.map(pokemon => pokemon.id)

  const allPokemonData = await getAllPokemonData(pokemonIds)

  // Now perform a join operation on allPokemonData and evolutionChainData on the basis of the pokemon id.
  const preFinalPokemonData = allPokemonData.map(pokemon => {
    const species = evolutionChainData?.find(species => species?.id === pokemon?.id)
    return { ...pokemon, ...species }
  })

  /* 
    Peform an operation for identifying whether the evolution is part of a split evolution.
    However, an exception needs to be made for the Wurmple chain.
  */

  let foundNextEvoSplit = false
  const finalPokemonDataOld = preFinalPokemonData.map(obj => {
    const isSplitEvo = foundNextEvoSplit
    if (obj.nextEvoSplit) {
      foundNextEvoSplit = true
    }

    return { ...obj, isSplitEvo }
  })

  // 267 and 269 are for the Wurmple evolution chain.
  // 123 is for Scyther, which has a split evolution in gen 8.
  // 212 is for Scizor. 215 for Sneasel, 194 for Wooper
  // Meowth has a gen 8+ split evolution, so it needs to be dealt with as well.
  // Meowth = 52, Persian = 53, Weavile = 461
  // Also filter out gen 8+ forms.
  const finalPokemonData: Array<EvolutionPokemon> = finalPokemonDataOld
    ?.map(pokemon => {
      let { isSplitEvo: splitEvoFlag, id, nextEvoSplit } = pokemon
      if (id === 267 || id === 269 || id === 212 || id === 53 || id === 461 || id === 195) {
        splitEvoFlag = false
      }
      if (id === 123 || id === 52 || id === 215 || id === 194) {
        nextEvoSplit = false
      }
      return { ...pokemon, isSplitEvo: splitEvoFlag, nextEvoSplit }
    })
    ?.filter(pokemon => {
      const { id } = pokemon
      return (id >= 1 && id <= 809) || (id >= 10001 && id <= 10157)
    })

  // Define divs for each pokemon in the evolution chain.
  const individualPokemon = finalPokemonData?.map(pokemon => {
    const { homeSprite, name, id, types } = pokemon
    return (
      <EvolutionPokemonCard
        homeSprite={homeSprite}
        name={name}
        id={id}
        types={types}
        splitEvoFlag={pokemon.isSplitEvo}
        key={id}
      />
    )
  })

  // Eevee is a special case which will be dealt with here.
  const firstPokemonName = (finalPokemonData ?? [])[0]?.name || ''
  let finalEvolutionDiv: ReactNode = undefined
  let eeveelutionDiv: Array<ReactNode> = []
  let wurmpleDiv: Array<ReactNode> = []

  if (firstPokemonName === 'eevee') {
    // For the first three eveelutions
    let stoneEvolutionsData = [
      finalPokemonData[0],
      finalPokemonData[1],
      finalPokemonData[2],
      finalPokemonData[3],
    ]
    let stoneEvolutionsDivs = [
      individualPokemon[0],
      individualPokemon[1],
      individualPokemon[2],
      individualPokemon[3],
    ]
    eeveelutionDiv.push(
      <EvolutionDiv
        finalPokemonData={stoneEvolutionsData}
        individualPokemon={stoneEvolutionsDivs}
      />,
    )

    // For the friendship ones
    let friendEvolutionsData = [finalPokemonData[0], finalPokemonData[4], finalPokemonData[5]]
    let friendEvolutionsDivs = [individualPokemon[0], individualPokemon[4], individualPokemon[5]]
    eeveelutionDiv.push(
      <EvolutionDiv
        finalPokemonData={friendEvolutionsData}
        individualPokemon={friendEvolutionsDivs}
      />,
    )

    // For the location ones
    let locationEvolutionsData = [
      finalPokemonData[0],
      finalPokemonData[6],
      finalPokemonData[7],
      finalPokemonData[8],
    ]
    let locationEvolutionsDivs = [
      individualPokemon[0],
      individualPokemon[6],
      individualPokemon[7],
      individualPokemon[8],
    ]
    eeveelutionDiv.push(
      <EvolutionDiv
        finalPokemonData={locationEvolutionsData}
        individualPokemon={locationEvolutionsDivs}
      />,
    )
  } else if (firstPokemonName === 'wurmple') {
    let wormData = [finalPokemonData[0], finalPokemonData[1], finalPokemonData[3]]
    let wormDivs = [individualPokemon[0], individualPokemon[1], individualPokemon[3]]
    wurmpleDiv.push(<EvolutionDiv finalPokemonData={wormData} individualPokemon={wormDivs} />)

    // For beautifly
    const wurmpleEvsData = finalPokemonData?.map(pokemon => {
      let { isSplitEvo: splitEvoFlag, id, nextEvoSplit } = pokemon
      if (id === 266 || id === 268) {
        splitEvoFlag = false
      }
      return { ...pokemon, isSplitEvo: splitEvoFlag, nextEvoSplit }
    })
    const individualWormPokemon = wurmpleEvsData?.map(pokemon => {
      const { homeSprite, name, id, types } = pokemon
      return (
        <EvolutionPokemonCard
          homeSprite={homeSprite}
          name={name}
          id={id}
          types={types}
          splitEvoFlag={pokemon.isSplitEvo}
          key={id}
        />
      )
    })

    let butterflyData = [wurmpleEvsData[1], wurmpleEvsData[2]]
    let butterflyDivs = [individualWormPokemon[1], individualWormPokemon[2]]
    wurmpleDiv.push(
      <EvolutionDiv finalPokemonData={butterflyData} individualPokemon={butterflyDivs} />,
    )

    // For dustox
    let mothData = [wurmpleEvsData[3], wurmpleEvsData[4]]
    let mothDivs = [individualWormPokemon[3], individualWormPokemon[4]]
    wurmpleDiv.push(<EvolutionDiv finalPokemonData={mothData} individualPokemon={mothDivs} />)
  } else {
    finalEvolutionDiv = (
      <EvolutionDiv finalPokemonData={finalPokemonData} individualPokemon={individualPokemon} />
    )
  }

  return (
    <>
      <SectionTitle>Evolution Chart</SectionTitle>
      {finalEvolutionDiv ? (
        <div className="flex flex-col justify-center gap-x-5 sm:flex-col md:flex-row">
          {finalEvolutionDiv}
        </div>
      ) : eeveelutionDiv.length > 0 ? (
        eeveelutionDiv.map((div, index) => {
          return (
            <div
              className="flex flex-col justify-between gap-y-5 sm:flex-col sm:justify-center md:flex-row"
              key={index}
            >
              {div}
            </div>
          )
        })
      ) : (
        wurmpleDiv.map((div, index) => {
          return (
            <div
              className="flex flex-col justify-between gap-y-5 sm:flex-col sm:justify-center md:flex-row"
              key={index}
            >
              {div}
            </div>
          )
        })
      )}
    </>
  )
}
