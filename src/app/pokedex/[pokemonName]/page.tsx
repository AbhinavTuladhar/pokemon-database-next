import { FC, Suspense } from 'react'
import { Metadata } from 'next'

import { Description, OtherLanguages } from '@/components/dynamicRoutes'
import PokemonService from '@/features/pokemon/services/pokemon.service'
import SpeciesService from '@/features/pokemon/services/species.service'
import { transformPokemon } from '@/features/pokemon/transformers/transform-pokemon'
import { transformSpecies } from '@/features/pokemon/transformers/transform-species'
import formatName from '@/utils/formatName'

import {
  AdjacentLinks,
  BaseStat,
  BasicIntro,
  BreedingInfo,
  EvolutionChain,
  HeldItems,
  LoadingPage,
  Locations,
  PageNavigation,
  PokeDexData,
  PokeDexEntries,
  PokemonArtwork,
  PokemonCry,
  PokemonForms,
  PokemonMovesLearned,
  PokemonVarieties,
  SpriteSection,
  TrainingInfo,
  TypeChart,
} from './_components'

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
  const pokemonData = await PokemonService.getByName(pokemonName)
  return transformPokemon(pokemonData)
}

const getSpeciesData = async (id: number | string) => {
  const param = typeof id === 'string' ? +id : id
  const speciesData = await SpeciesService.getById(param)
  return transformSpecies(speciesData)
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
    name: actualName,
    front_default: defaultSprite,
    front_shiny: shinySprite,
    types,
    base_experience,
    stats,
    speciesId,
    moves,
    spriteCollection,
    held_items,
    forms,
  } = pokemonData

  const speciesData = await getSpeciesData(+speciesId)

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
    colour,
    shape,
    formDescriptions,
    habitat,
  } = speciesData

  const generaNames = genera.map(genus => ({
    language: genus.language,
    name: genus.genus,
  }))

  const abilityNames = abilities.map(ability => ability.ability.name)

  return (
    <main>
      <Suspense fallback={<LoadingPage />}>
        <h1 className="mt-4 text-center text-5xl font-bold">{formatName(actualName)}</h1>
        <AdjacentLinks id={id} />

        <PageNavigation />

        <BasicIntro genus={genus} id={id} name={actualName} types={types} />
        <section
          id="info"
          className="grid grid-cols-1 place-content-start gap-x-8 gap-y-6 md:grid-cols-2 xl:grid-cols-3"
        >
          <div className="">
            <PokemonArtwork
              pokemonName={pokemonName}
              defaultSprite={defaultSprite}
              shinySprite={shinySprite}
            />
            <PokemonCry
              latest={latestCry}
              legacy={legacyCry ?? undefined}
              pokemonName={actualName}
            />
          </div>

          <div className="">
            <PokeDexData
              abilities={abilities}
              genus={genus}
              height={height}
              nationalNumber={nationalNumber}
              pokedex_numbers={pokedex_numbers}
              types={types}
              weight={weight}
              colour={colour}
              shape={shape}
            />
          </div>

          <div className="grid w-full grid-cols-1 gap-x-8 gap-y-6 md:col-span-2 md:grid-cols-2 lg:col-span-2 lg:grid-cols-2 xl:col-span-1 xl:grid-cols-1">
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
              habitat={habitat}
            />
          </div>
        </section>

        <section className="grid grid-cols-1 gap-x-8 gap-y-6 md:grid-cols-2 xl:grid-cols-3">
          <section id="base-stats" className="col-span-2">
            <BaseStat stats={stats} />
          </section>
          <section className="lg-xl:col-span-2 col-span-2 xl:col-span-1">
            <TypeChart pokemonName={actualName} types={types} abilityNames={abilityNames} />
          </section>
        </section>

        <section id="evolution-chain">
          <EvolutionChain url={evolutionChainUrl} />
        </section>

        {formDescriptions ? (
          <section>
            <Description entry={formDescriptions} title="Form descriptions" />
          </section>
        ) : null}

        <section id="pokedex-entries">
          <PokeDexEntries flavourTextEntries={flavor_text_entries} />
        </section>

        <section>
          <PokemonForms urls={forms.map(form => form.url)} />
        </section>
      </Suspense>

      {/* There are a lot of fetch requests in the move tables, so wrapping in separate suspense. */}
      <Suspense fallback={<div> Loading moves data... </div>}>
        <section id="moves-learned">
          <PokemonMovesLearned id={id} moves={moves} pokemonName={actualName} />
        </section>
      </Suspense>

      <Suspense fallback={<div> Loading other data... </div>}>
        <section className="space-y-4" id="sprites">
          <SpriteSection pokemonName={actualName} spriteCollection={spriteCollection} />
        </section>

        <section id="locations">
          <Locations id={id} name={actualName} />
        </section>

        <section>
          <HeldItems held_items={held_items} />
        </section>

        <section id="languages">
          <div className="grid-cols-2-flexible grid gap-x-10 gap-y-16">
            <div>
              <OtherLanguages names={names} />
            </div>
            <div className="mt-0 min-[952px]:mt-20">
              <OtherLanguages names={generaNames} hideTitle />
            </div>
          </div>
        </section>

        <section id="forms">
          <PokemonVarieties pokemonName={actualName} varieties={varieties} />
        </section>

        <AdjacentLinks id={id} />
      </Suspense>
    </main>
  )
}

export default PokemonPage
