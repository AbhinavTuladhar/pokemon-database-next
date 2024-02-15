import { FC } from 'react'
import { PokemonApi } from '@/services/PokemonApi'
import PokemonExtractor from '@/extractors/PokemonExtractor'
import formatName from '@/utils/formatName'
import ImageTile from './ImageTile'
import AdjacentLinks from './AdjacentLinks'
import { SpeciesApi } from '@/services/SpeciesApi'
import SpeciesExtractor from '@/extractors/SpeciesExtractor'

const getPokemonData = async (pokemonName: string) => {
  const pokemonData = await PokemonApi.get(pokemonName)
  return PokemonExtractor(pokemonData)
}

const getSpeciesData = async (id: string | number) => {
  const speciesData = await SpeciesApi.get(id)
  return SpeciesExtractor(speciesData)
}

interface PokemonPageProps {
  params: {
    pokemonName: string
  }
}

const PokemonPage: FC<PokemonPageProps> = async ({ params: { pokemonName } }) => {
  const [pokemonData, speciesData] = await Promise.all([
    getPokemonData(pokemonName),
    getSpeciesData(pokemonName),
  ])

  const { id, name, front_default: defaultSprite, front_shiny: shinySprite } = pokemonData

  return (
    <div className="flex flex-col">
      <div className="flex justify-center text-4xl font-bold">{formatName(name)}</div>
      <AdjacentLinks id={id} />
      <section className="grid grid-cols-pokemon-detail-grid gap-x-8 gap-y-6">
        <ImageTile defaultSprite={defaultSprite} shinySprite={shinySprite} />
        <div> Second column</div>
        <div> Third column</div>
      </section>
    </div>
  )
}

export default PokemonPage
