import { FC, Suspense } from 'react'
import { PokemonApi } from '@/services/PokemonApi'
import PokemonExtractor from '@/extractors/PokemonExtractor'
import formatName from '@/utils/formatName'
import { SpeciesApi } from '@/services/SpeciesApi'
import SpeciesExtractor from '@/extractors/SpeciesExtractor'
import BasicIntro from './BasicIntro'
import PageNavigation from './PageNavigation'
import ImageTile from './ImageTile'
import AdjacentLinks from './AdjacentLinks'
import PokeDexData from './PokedexData'
import TrainingInfo from './TrainingInfo'
import BreedingInfo from './BreedingInfo'
import BaseStat from './BaseStats'
import TypeChart from './TypeChart'
import EvolutionChain from './EvolutionChain'
import PokeDexEntries from './PokeDexEntries'
import MovesLearned from './MovesLearned'
import SpriteTable from './SpriteTable'
import OtherLanguages from './OtherLanguages'
import Locations from './Locations'
import PokemonVarieties from './PokemonVarieties'

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
    moves,
    spriteCollection,
  } = pokemonData

  const speciesData = await getSpeciesData(speciesLink)

  const {
    flavor_text_entries,
    evolutionChainUrl,
    egg_groups,
    gender_rate,
    hatch_counter,
    capture_rate,
    base_happiness,
    genus,
    pokedex_numbers,
    growth_rate,
    names,
    genera,
    varieties,
  } = speciesData

  return (
    <main>
      <h1 className="mt-4 text-center text-5xl font-bold">{formatName(name)}</h1>
      <AdjacentLinks id={id} />

      <PageNavigation />

      <BasicIntro genus={genus} id={id} name={pokemonName} types={types} />
      <section
        id="info"
        className="grid grid-cols-pokemon-detail-grid place-content-start gap-x-8 gap-y-6"
      >
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
        <div className="col-span-2 grid w-full grid-cols-1 gap-x-8 gap-y-6 md:grid-cols-2 mdlg:col-span-1 mdlg:grid-cols-1">
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
      <section id="base-stats" className="grid grid-cols-pokemon-detail-grid gap-x-8 gap-y-6">
        <section className="col-span-2">
          <BaseStat stats={stats} />
        </section>
        <section className="col-span-2 mdlg:col-span-1">
          <TypeChart pokemonName={name} types={types} />
        </section>
      </section>
      <section id="evolution-chain">
        <EvolutionChain url={evolutionChainUrl} />
      </section>
      <section id="pokedex-entries">
        <PokeDexEntries flavourTextEntries={flavor_text_entries} />
      </section>
      <section id="moves-learned">
        <Suspense fallback={<div> Loading moves data... </div>}>
          <MovesLearned moves={moves} pokemonName={pokemonName} />
        </Suspense>
      </section>
      <section id="sprites">
        <SpriteTable pokemonName={pokemonName} spriteCollection={spriteCollection} />
      </section>
      <section id="locations">
        <Locations id={id} name={pokemonName} />
      </section>
      <section id="languages">
        <OtherLanguages genera={genera} names={names} />
      </section>
      <section id="forms">
        <PokemonVarieties pokemonName={pokemonName} varieties={varieties} />
      </section>
      <AdjacentLinks id={id} />
    </main>
  )
}

export default PokemonPage
