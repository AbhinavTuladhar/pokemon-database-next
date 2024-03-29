import { FC, Suspense } from 'react'
import { Metadata } from 'next'

import PokemonExtractor from '@/extractors/PokemonExtractor'
import SpeciesExtractor from '@/extractors/SpeciesExtractor'
import { PokemonApi } from '@/services/PokemonApi'
import { SpeciesApi } from '@/services/SpeciesApi'
import formatName from '@/utils/formatName'

import AdjacentLinks from './_components/AdjacentLinks'
import BaseStat from './_components/BaseStats'
import BasicIntro from './_components/BasicIntro'
import BreedingInfo from './_components/BreedingInfo'
import EvolutionChain from './_components/EvolutionChain'
import ImageTile from './_components/ImageTile'
import Locations from './_components/Locations'
import MovesLearned from './_components/MovesLearned'
import OtherLanguages from './_components/OtherLanguages'
import PageNavigation from './_components/PageNavigation'
import PokeDexData from './_components/PokedexData'
import PokeDexEntries from './_components/PokeDexEntries'
import PokemonCry from './_components/PokemonCry'
import PokemonVarieties from './_components/PokemonVarieties'
import SpriteTable from './_components/SpriteTable'
import TrainingInfo from './_components/TrainingInfo'
import TypeChart from './_components/TypeChart'

interface PokemonPageProps {
  params: {
    pokemonName: string
  }
}

export async function generateMetadata({ params }: PokemonPageProps): Promise<Metadata> {
  const { pokemonName } = params
  return {
    title: `${formatName(pokemonName)} Pokédex: stats, moves, evolution & locations | Pokémon Database`,
  }
}

const getPokemonData = async (pokemonName: string) => {
  const pokemonData = await PokemonApi.get(pokemonName)
  return PokemonExtractor(pokemonData)
}

const getSpeciesData = async (url: string) => {
  const speciesData = await SpeciesApi.get(url)
  return SpeciesExtractor(speciesData)
}

const PokemonPage: FC<PokemonPageProps> = async ({ params: { pokemonName } }) => {
  const pokemonData = await getPokemonData(pokemonName)

  const {
    id,
    cries: { latest: latestCry, legacy: legacyCry },
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
          <PokemonCry latest={latestCry} legacy={legacyCry || undefined} pokemonName={name} />
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
      <Suspense fallback={<div> Loading moves data... </div>}>
        <section id="moves-learned">
          <MovesLearned moves={moves} pokemonName={pokemonName} />
        </section>
      </Suspense>
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
