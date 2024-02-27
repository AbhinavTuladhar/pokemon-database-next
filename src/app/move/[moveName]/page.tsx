import { FC } from 'react'
import MoveExtractor from '@/extractors/MoveExtractor'
import { MovesApi } from '@/services/MovesApi'
import formatName from '@/utils/formatName'
import MoveData from './MoveData'
import MoveEffect from './MoveEffect'
import MoveTarget from './MoveTarget'
import GameDescription from './GameDescription'

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
        </section>
        <section>
          <MoveEffect chance={effect_chance} entry={longEntry} />
        </section>
      </div>
      <div className="grid grid-cols-1 gap-x-10 gap-y-6 lg:grid-cols-[1fr,_2fr]">
        <section>
          <MoveTarget targetType={targetType} />
        </section>
        <section>
          <GameDescription descriptions={descriptions} />
        </section>
      </div>
    </main>
  )
}

export default MoveDetail
