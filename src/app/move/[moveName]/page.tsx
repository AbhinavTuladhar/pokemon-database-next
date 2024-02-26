import { FC } from 'react'
import MoveExtractor from '@/extractors/MoveExtractor'
import { MovesApi } from '@/services/MovesApi'
import formatName from '@/utils/formatName'
import MoveData from './MoveData'
import MoveEffect from './MoveEffect'

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
  } = moveData

  return (
    <main>
      <h1 className="my-4 text-center text-5xl font-bold"> {formatName(moveName)}</h1>
      <div className="grid grid-cols-[1fr,_3fr] gap-x-10 gap-y-6">
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
    </main>
  )
}

export default MoveDetail
