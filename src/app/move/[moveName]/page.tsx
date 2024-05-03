import { FC, Suspense } from 'react'
import { Metadata } from 'next'

import { PageTitle, SectionTitle } from '@/components/containers'
import { Description, OtherLanguages } from '@/components/dynamicRoutes'
import InfiniteMiniCardScroll from '@/components/InfiniteMiniCardScroll'
import MiniCardList from '@/components/MiniCardList'
import { MiniCardListSkeleton } from '@/components/suspense'
import MoveExtractor from '@/extractors/MoveExtractor'
import { MovesApi } from '@/services/MovesApi'
import formatName from '@/utils/formatName'

import { GameDescription, MachineRecord, MoveData, MoveTarget } from './_components'

interface MovePageProps {
  params: {
    moveName: string
  }
}

export async function generateMetadata({ params }: MovePageProps): Promise<Metadata> {
  const { moveName } = params
  return {
    title: `${formatName(moveName)} | Pokémon moves | Pokémon Database`,
  }
}

const getMoveData = async (moveName: string) => {
  const response = await MovesApi.getByName(moveName)
  return MoveExtractor(response)
}

const MoveDetail: FC<MovePageProps> = async ({ params: { moveName } }) => {
  const moveData = await getMoveData(moveName)

  const {
    moveType,
    damageClass,
    power,
    accuracy,
    PP,
    generationIntroduced,
    priority,
    effect_chance,
    longEntry,
    targetType,
    descriptions,
    names,
    machines,
    pokemon,
  } = moveData

  return (
    <main>
      <PageTitle>
        <span>{formatName(moveName)}</span>
        <span className="text-gray-400"> (move) </span>
      </PageTitle>
      <div className="grid grid-cols-1 gap-x-10 gap-y-6 min-[900px]:grid-cols-[1fr,_3fr]">
        <section>
          <MoveData
            PP={PP}
            accuracy={accuracy}
            damageClass={damageClass}
            generationIntroduced={generationIntroduced}
            moveType={moveType}
            power={power}
            priority={priority}
          />
          <Suspense fallback={<div className="my-10"> Loading TM data... </div>}>
            {machines.length > 0 ? <MachineRecord machineList={machines} /> : null}
          </Suspense>
        </section>
        <section>
          <Description entry={longEntry} chance={effect_chance} />
        </section>
      </div>
      <div className="grid grid-cols-1 gap-x-10 gap-y-6 lg:grid-cols-[1fr,_2fr]">
        <div className="space-y-8">
          <section>
            <MoveTarget targetType={targetType} />
          </section>
          <section>
            <OtherLanguages names={names} />
          </section>
        </div>
        <section>
          <GameDescription descriptions={descriptions} />
        </section>
      </div>

      {/* <>
        <SectionTitle>Pokémon that can learn {`${formatName(moveName)}`}</SectionTitle>
        <Suspense fallback={<MiniCardListSkeleton pokemonCount={pokemon.length} />}>
          <MiniCardList pokemonNames={pokemon} />
        </Suspense>
      </> */}

      {/* Use infinite scrolling if there are more than 100 urls. */}
      {pokemon.length >= 100 ? (
        <>
          <SectionTitle>Pokémon that can learn {formatName(moveName)}</SectionTitle>
          <InfiniteMiniCardScroll increment={50} nameList={pokemon} />
        </>
      ) : (
        <>
          <SectionTitle>Pokémon that can learn {`${formatName(moveName)}`}</SectionTitle>
          <Suspense fallback={<MiniCardListSkeleton pokemonCount={pokemon.length} />}>
            <MiniCardList pokemonNames={pokemon} />
          </Suspense>
        </>
      )}
    </main>
  )
}

export default MoveDetail
