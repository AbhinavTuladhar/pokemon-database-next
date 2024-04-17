import React, { Suspense } from 'react'
import { Metadata } from 'next'

import PageTitle from '@/components/containers/PageTitle'
import SectionTitle from '@/components/containers/SectionTitle'
import MiniCardList from '@/components/MiniCardList'
import MiniCardListSkeleton from '@/components/Suspense/MiniCardListSkeleton'
import TypeCard from '@/components/TypeCard'
import TypeExtractor from '@/extractors/TypeExtractor'
import { TypesApi } from '@/services/TypesApi'
import formatName from '@/utils/formatName'

import DualTypeChart from './_components/DualTypeChart'
import ProsAndConsSection from './_components/ProsAndConsSection'
import TypeSummaryRow from './_components/TypeSummaryRow'

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

  const { doubleDamageTo, halfDamageTo, noDamageTo, pokemon, moveList } = typeInformation

  const formattedType = formatName(type.charAt(0).toUpperCase() + type.slice(1))

  // Count the number of pokemon and moves for the type.
  const pokemonCount = pokemon.length
  const moveCount = moveList.length

  // Now format the data for rendering purposes.
  // Prepare the type effectiveness list
  const doubleDamageFromList = typeInformation?.doubleDamageFrom?.map((type, index) => (
    <TypeCard typeName={type} key={index} />
  ))
  const doubleDamageToList = typeInformation?.doubleDamageTo?.map((type, index) => (
    <TypeCard typeName={type} key={index} />
  ))
  const halfDamageFromList = typeInformation?.halfDamageFrom?.map((type, index) => (
    <TypeCard typeName={type} key={index} />
  ))
  const halfDamageToList = typeInformation?.halfDamageTo?.map((type, index) => (
    <TypeCard typeName={type} key={index} />
  ))
  const noDamageFromList = typeInformation?.noDamageFrom?.map((type, index) => (
    <TypeCard typeName={type} key={index} />
  ))
  const noDamageToList = typeInformation?.noDamageTo?.map((type, index) => (
    <TypeCard typeName={type} key={index} />
  ))

  return (
    <main className="space-y-4">
      <PageTitle>
        {formattedType}&nbsp;
        <span className="text-gray-400"> (type) </span>
      </PageTitle>
      <section>
        <TypeSummaryRow
          moveCount={moveCount}
          pokemonCount={pokemonCount}
          typeName={formattedType}
        />
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

      <SectionTitle>{`${formatName(type)}`} Pokémon</SectionTitle>
      <Suspense fallback={<MiniCardListSkeleton pokemonCount={pokemon.length} />}>
        <MiniCardList pokemonNames={pokemon} />
      </Suspense>
    </main>
  )
}

export default TypeDetail
