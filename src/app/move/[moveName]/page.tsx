import { FC, Suspense } from 'react'
import { Metadata } from 'next'

import SectionTitle from '@/components/containers/SectionTitle'
import InfiniteMiniCardScroll from '@/components/InfiniteMiniCardScroll'
import MiniCardList from '@/components/MiniCardList'
import MiniCardListSkeleton from '@/components/Suspense/MiniCardListSkeleton'
import MoveExtractor from '@/extractors/MoveExtractor'
import { MovesApi } from '@/services/MovesApi'
import formatName from '@/utils/formatName'

import GameDescription from './_components/GameDescription'
import MachineRecord from './_components/MachineRecord'
import MoveData from './_components/MoveData'
import MoveEffect from './_components/MoveEffect'
import MoveTarget from './_components/MoveTarget'
import OtherLanguages from './_components/OtherLanguages'

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
  const response = await MovesApi.get(moveName)
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
    pokemonUrls,
    machines,
  } = moveData

  const urlList = pokemonUrls.map((pokemon) => pokemon.url)

  return (
    <main>
      <h1 className="my-4 text-center text-5xl font-bold"> {formatName(moveName)}</h1>
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
          <Suspense fallback={<div> Loading TM data... </div>}>
            <MachineRecord machineList={machines} />
          </Suspense>
        </section>
        <section>
          <MoveEffect chance={effect_chance} entry={longEntry} />
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

      {/* Use infinite scrolling if there are more than 100 urls. */}
      {pokemonUrls.length >= 100 ? (
        <>
          <SectionTitle>Pokémon that can learn {formatName(moveName)}</SectionTitle>
          <InfiniteMiniCardScroll increment={20} urlList={urlList} />
        </>
      ) : (
        <>
          <SectionTitle>Pokémon that can learn {`${formatName(moveName)}`}</SectionTitle>
          <Suspense fallback={<MiniCardListSkeleton pokemonCount={pokemonUrls.length} />}>
            <MiniCardList pokemonUrls={urlList} />
          </Suspense>
        </>
      )}
    </main>
  )
}

export default MoveDetail
