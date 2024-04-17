import { FC, JSX } from 'react'

import ProsAndConsInfo from './ProsAndConsInfo'

interface SectionProps {
  doubleDamageToList: JSX.Element[]
  halfDamageToList: JSX.Element[]
  noDamageToList: JSX.Element[]
  doubleDamageFromList: JSX.Element[]
  halfDamageFromList: JSX.Element[]
  noDamageFromList: JSX.Element[]
  formattedType: string
}

const ProsAndConsSection: FC<SectionProps> = ({
  doubleDamageFromList,
  doubleDamageToList,
  halfDamageFromList,
  halfDamageToList,
  noDamageFromList,
  noDamageToList,
  formattedType,
}) => {
  return (
    <div className="space-y-10">
      <div>
        <ProsAndConsInfo
          title="Attack"
          doubeDamageList={doubleDamageToList}
          doubleDamageMessage={`${formattedType} moves are super-effective against`}
          halfDamageList={halfDamageToList}
          halfDamageMessage={`${formattedType} moves are not very effective against`}
          noDamageList={noDamageToList}
          noDamageMessage={`${formattedType} moves have no effect on`}
        />
      </div>
      <div>
        <ProsAndConsInfo
          title="Defence"
          doubeDamageList={doubleDamageFromList}
          doubleDamageMessage={`These types are super-effective against ${formattedType} type Pokémon`}
          halfDamageList={halfDamageFromList}
          halfDamageMessage={`These types are not very effective against ${formattedType} type Pokémon`}
          noDamageList={noDamageFromList}
          noDamageMessage={`These types have no effect on ${formattedType} type Pokémon`}
        />
      </div>
    </div>
  )
}

export default ProsAndConsSection
