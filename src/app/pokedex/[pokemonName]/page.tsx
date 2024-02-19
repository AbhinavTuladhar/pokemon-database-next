import { FC } from 'react'
import { PokemonApi } from '@/services/PokemonApi'
import PokemonExtractor from '@/extractors/PokemonExtractor'
import formatName from '@/utils/formatName'
import { SpeciesApi } from '@/services/SpeciesApi'
import SpeciesExtractor from '@/extractors/SpeciesExtractor'
import ImageTile from './ImageTile'
import AdjacentLinks from './AdjacentLinks'
import PokeDexData from './PokedexData'
import TrainingInfo from './TrainingInfo'
import BreedingInfo from './BreedingInfo'
import BaseStat from './BaseStats'
import TypeChart from './TypeChart'
import EvolutionChain from './EvolutionChain'

const getPokemonData = async (pokemonName: string) => {
  const pokemonData = await PokemonApi.get(pokemonName)
  return PokemonExtractor(pokemonData)
}

const getSpeciesData = async (url: string) => {
  const speciesData = await SpeciesApi.get(url)
  return SpeciesExtractor(speciesData)
}

interface PokemonPageProps {
  params: {
    pokemonName: string
  }
}

const PokemonPage: FC<PokemonPageProps> = async ({ params: { pokemonName } }) => {
  const pokemonData = await getPokemonData(pokemonName)

  const {
    id,
    height,
    weight,
    nationalNumber,
    abilities,
    name,
    front_default: defaultSprite,
    front_shiny: shinySprite,
    types,
    base_experience,
    stats,
    speciesLink,
  } = pokemonData

  const speciesData = await getSpeciesData(speciesLink)

  const {
    evolutionChainUrl,
    egg_groups,
    gender_rate,
    hatch_counter,
    capture_rate,
    base_happiness,
    genus,
    pokedex_numbers,
    growth_rate,
  } = speciesData

  return (
    <div className="flex flex-col">
      <div className="flex justify-center text-4xl font-bold">{formatName(name)}</div>
      <AdjacentLinks id={id} />
      <section className="grid grid-cols-pokemon-detail-grid gap-x-8 gap-y-6">
        <div className="col-span-2 md:col-span-1">
          <ImageTile defaultSprite={defaultSprite} shinySprite={shinySprite} />
        </div>
        <div className="col-span-2 md:col-span-1">
          <PokeDexData
            abilities={abilities}
            genus={genus}
            height={height}
            nationalNumber={nationalNumber}
            pokedex_numbers={pokedex_numbers}
            types={types}
            weight={weight}
          />
        </div>
        <div className="col-span-2 flex w-full flex-col gap-y-6 mdlg:col-span-1">
          <TrainingInfo
            base_experience={base_experience}
            base_happiness={base_happiness}
            capture_rate={capture_rate}
            growth_rate={growth_rate}
            stats={stats}
          />
          <BreedingInfo
            egg_groups={egg_groups}
            gender_rate={gender_rate}
            hatch_counter={hatch_counter}
          />
        </div>
      </section>
      <div className="grid grid-cols-pokemon-detail-grid gap-x-8 gap-y-6">
        <section className="col-span-2">
          <BaseStat stats={stats} />
        </section>
        <section className="col-span-2 mdlg:col-span-1">
          <TypeChart pokemonName={name} types={types} />
        </section>
      </div>
      <EvolutionChain url={evolutionChainUrl} />
    </div>
  )
}

export default PokemonPage
