import { FC, Suspense } from 'react'
import { Metadata } from 'next'

import { Description, OtherLanguages } from '@/components/dynamicRoutes'
import Loader from '@/components/loader'
import { PageTitle, SectionTitle } from '@/components/ui/Title'
import MoveService from '@/features/battle/services/move.service'
import { transformMove } from '@/features/battle/transformers/transform-move'
import { InfiniteMiniCardScroll } from '@/features/pokemon/components/InfiniteCardScroll'
import formatName from '@/utils/formatName'

import { ContestInfo, GameDescription, MachineRecord, MoveData, MoveTarget } from './_components'

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
  const response = await MoveService.getByName(moveName)
  return transformMove(response)
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
    moveName: actualMoveName,
    contestEffectId,
    contestTypeName,
  } = moveData

  return (
    <main>
      <Suspense fallback={<Loader />}>
        <PageTitle>
          <span>{formatName(actualMoveName)}</span>
          <span className="text-gray-400"> (move) </span>
        </PageTitle>
        <div className="grid grid-cols-1 gap-x-10 gap-y-6 min-[900px]:grid-cols-[1fr__3fr]">
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
            {machines.length > 0 ? <MachineRecord machineList={machines} /> : null}
          </section>
          <section>
            <Description entry={longEntry} chance={effect_chance} />
          </section>
        </div>
        <div className="grid grid-cols-1 gap-x-10 gap-y-6 lg:grid-cols-[1fr__2fr]">
          <div className="space-y-8">
            <section>
              <MoveTarget targetType={targetType} moveName={moveName} />
            </section>
            {contestEffectId && contestTypeName ? (
              <section>
                <ContestInfo effectId={contestEffectId} typeName={contestTypeName} />
              </section>
            ) : null}
            <section>
              <OtherLanguages names={names} />
            </section>
          </div>
          <section>
            <GameDescription descriptions={descriptions} />
          </section>
        </div>

        {/* Use infinite scrolling if there are more than 100 urls. */}
        <section>
          <SectionTitle>Pokémon that can learn {formatName(actualMoveName)}</SectionTitle>
          <InfiniteMiniCardScroll increment={50} nameList={pokemon} />
        </section>
      </Suspense>
    </main>
  )
}

export default MoveDetail
