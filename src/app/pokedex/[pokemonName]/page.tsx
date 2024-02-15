import { FC } from 'react'
import { PokemonApi } from '@/services/PokemonApi'
import PokemonExtractor from '@/extractors/PokemonExtractor'
import formatName from '@/utils/formatName'
import ImageTile from './ImageTile'
import AdjacentLinks from './AdjacentLinks'

const getPokemonData = async (pokemonName: string) => {
  const pokemonData = await PokemonApi.get(pokemonName)
  return PokemonExtractor(pokemonData)
}

interface PokemonPageProps {
  params: {
    pokemonName: string
  }
}

const PokemonPage: FC<PokemonPageProps> = async ({ params: { pokemonName } }) => {
  const data = await getPokemonData(pokemonName)

  const { id, front_default: defaultSprite, front_shiny: shinySprite } = data

  return (
    <div className="flex flex-col">
      <div className="flex justify-center text-4xl font-bold">{formatName(data.name)}</div>
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
