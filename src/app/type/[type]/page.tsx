import React, { Suspense } from 'react'
import { Metadata } from 'next'

import { MiniCardList, TypeCard } from '@/components/cards'
import { PageTitle, SectionTitle } from '@/components/containers'
import { MiniCardListSkeleton, TypeSummarySkeleton } from '@/components/skeletons'
import TypeExtractor from '@/extractors/TypeExtractor'
import { TypesApi } from '@/services'
import formatName from '@/utils/formatName'

import {
  DualTypeChart,
  ProsAndConsSection,
  SpriteCollection,
  StatAverageRow,
  TypeMoveTable,
  TypeSummaryRow,
} from './_components'

interface PageProps {
  params: {
    type: string
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { type } = params
  return {
    title: `${formatName(type)} type Pokémon | Pokémon Database`,
  }
}

const getTypeData = async (typeName: string) => {
  const response = await TypesApi.getByName(typeName)
  return TypeExtractor(response)
}

const TypeDetail: React.FC<PageProps> = async ({ params: { type } }) => {
  const typeInformation = await getTypeData(type)

  const { doubleDamageTo, halfDamageTo, noDamageTo, pokemon, moveList, spriteCollection } =
    typeInformation

  const formattedType = formatName(type.charAt(0).toUpperCase() + type.slice(1))

  // Count the number of pokemon and moves for the type.
  const pokemonCount = pokemon.length
  const moveCount = moveList.length

  const moveNames = moveList.map(move => move.name)

  // Now format the data for rendering purposes.
  // Prepare the type effectiveness list
  const doubleDamageFromList = typeInformation?.doubleDamageFrom.map((type, index) => (
    <TypeCard typeName={type} key={'double-from' + type + index} />
  ))
  const doubleDamageToList = typeInformation?.doubleDamageTo?.map((type, index) => (
    <TypeCard typeName={type} key={'double-to' + type + index} />
  ))
  const halfDamageFromList = typeInformation?.halfDamageFrom?.map((type, index) => (
    <TypeCard typeName={type} key={'half-from' + type + index} />
  ))
  const halfDamageToList = typeInformation?.halfDamageTo?.map((type, index) => (
    <TypeCard typeName={type} key={'half-to' + type + index} />
  ))
  const noDamageFromList = typeInformation?.noDamageFrom?.map((type, index) => (
    <TypeCard typeName={type} key={'no-from' + type + index} />
  ))
  const noDamageToList = typeInformation?.noDamageTo?.map((type, index) => (
    <TypeCard typeName={type} key={'no-to' + type + index} />
  ))

  return (
    <main className="space-y-4">
      <PageTitle>
        {formattedType}&nbsp;
        <span className="text-gray-400"> (type) </span>
      </PageTitle>
      <section>
        <Suspense fallback={<TypeSummarySkeleton count={4} />}>
          <TypeSummaryRow
            moveCount={moveCount}
            pokemonCount={pokemonCount}
            typeName={formattedType}
            pokemon={pokemon}
          />
        </Suspense>
      </section>
      <div className="grid grid-cols-1 justify-between gap-x-20 gap-y-4 mdlg:grid-cols-[1fr,_2fr]">
        <ProsAndConsSection
          doubleDamageFromList={doubleDamageFromList}
          doubleDamageToList={doubleDamageToList}
          halfDamageFromList={halfDamageFromList}
          halfDamageToList={halfDamageToList}
          noDamageFromList={noDamageFromList}
          noDamageToList={noDamageToList}
          formattedType={formattedType}
        />

        <div className="mt-4 flex flex-col mdlg:mt-0">
          <h2 className="text-4xl font-bold">Dual type attack pros & cons</h2>
          <p className="my-4">
            {`This chart shows the strength of the ${type} type against every type combination. The fraction of damage a ${type} type move will deal is shown - ½ means 50% damage (not very effective), 2 means 200% (super-effective) and so on.`}
          </p>
          <div className="flex justify-center mdlg:justify-start">
            <DualTypeChart
              doubleDamageTo={doubleDamageTo}
              halfDamageTo={halfDamageTo}
              noDamageTo={noDamageTo}
              typeName={type}
            />
          </div>
        </div>
      </div>

      <section>
        <SectionTitle> {`${formatName(type)}`} Pokémon stat averages </SectionTitle>
        <Suspense fallback={<TypeSummarySkeleton count={6} />}>
          <StatAverageRow pokemon={pokemon} />
        </Suspense>
      </section>

      <section>
        <SectionTitle>{`${formatName(type)}`} Pokémon</SectionTitle>
        <Suspense fallback={<MiniCardListSkeleton pokemonCount={pokemon.length} />}>
          <MiniCardList pokemonNames={pokemon} />
        </Suspense>
      </section>

      <section>
        <SectionTitle> {`${formatName(type)}`} type moves </SectionTitle>
        <Suspense fallback="Loading moves">
          <TypeMoveTable moveNames={moveNames} />
        </Suspense>
      </section>

      <section>
        <SectionTitle>{`${formatName(type)}`} Type Sprites </SectionTitle>
        <SpriteCollection spriteCollection={spriteCollection} />
      </section>
    </main>
  )
}

export default TypeDetail
