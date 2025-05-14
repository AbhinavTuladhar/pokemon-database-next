import React, { Suspense } from 'react'
import { NextPage } from 'next'

import Loader from '@/components/loader'
import { PageTitle } from '@/components/ui/Title'
import { gameNameMapLongVersion } from '@/data/gameNameMap'
import GameService from '@/features/games/services/game.service'
import PokedexService from '@/features/games/services/pokedex.service'
import { getResourceId } from '@/utils/urlUtils'

import InGamePokedexSection from './_components'

interface GameNamePageProps {
  params: {
    gameName: string
  }
}

const getPokedexes = async (versionGroup: string) => {
  const response = await GameService.getVersionGroupData(versionGroup)
  return response.pokedexes
}

const getPokedexPokemonList = async (pokedex: string) => {
  const pokemonList = await PokedexService.getPokedexData(pokedex)
  return { pokedex, pokemonList }
}

const GamePage: NextPage<GameNamePageProps> = async ({ params: { gameName } }) => {
  const properVersionGroup = gameNameMapLongVersion[gameName].split('/').join('&')

  /**
   * Perform get requests in two steps:
   * 1. First the the sub-pokedexes for the individual game - one game may have several dexes, like XY and SM
   * 2. Loop over the dexes and fetch the pokemon entries
   */
  const pokedexList = await getPokedexes(gameName)

  const pokemonList = await Promise.all(
    pokedexList.map(pokedex => getPokedexPokemonList(pokedex.name)),
  )

  /**
   * Attach the regional pokedex entry number and the pokemon id to the list
   */
  const pokedexEntryAndResourceIds = pokemonList.map(({ pokedex, pokemonList }) => {
    const properPokemon = pokemonList.map(({ entry_number, pokemon_species }) => {
      const { url } = pokemon_species
      const pokemonId = getResourceId(url)
      return { entryNumber: entry_number, pokemonId }
    })
    return { pokedex, pokemonList: properPokemon }
  })

  return (
    <main>
      <PageTitle> {properVersionGroup} Pokédex </PageTitle>
      <Suspense fallback={<Loader />}>
        <div>
          {pokedexEntryAndResourceIds.map(({ pokedex, pokemonList }) => (
            <InGamePokedexSection key={pokedex} dexName={pokedex} pokemonList={pokemonList} />
          ))}
        </div>
      </Suspense>
    </main>
  )
}
export default GamePage
