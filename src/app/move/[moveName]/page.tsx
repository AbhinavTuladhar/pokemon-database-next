import { FC, Suspense } from 'react'

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

const getMoveData = async (moveName: string) => {
  const response = await MovesApi.get(moveName)
  return MoveExtractor(response)
}

interface MovePageProps {
  params: {
    moveName: string
  }
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
      <Suspense fallback={<MiniCardListSkeleton pokemonCount={pokemonUrls.length} />}>
        <MiniCardList
          pokemonList={pokemonUrls}
          title={`Pokémon that can learn ${formatName(moveName)}`}
        />
      </Suspense>
    </main>
  )
}

export default MoveDetail
