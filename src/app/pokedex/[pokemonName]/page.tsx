import { FC } from 'react'
import { PokemonApi } from '@/services/PokemonApi'
import PokemonExtractor from '@/extractors/PokemonExtractor'
import formatName from '@/utils/formatName'
import ImageTile from './ImageTile'

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

  const { front_default: defaultSprite, front_shiny: shinySprite } = data

  return (
    <div className="flex flex-col">
      <div className="flex justify-center text-4xl font-bold">{formatName(data.name)}</div>
      <ImageTile defaultSprite={defaultSprite} shinySprite={shinySprite} />
    </div>
  )
}

export default PokemonPage
