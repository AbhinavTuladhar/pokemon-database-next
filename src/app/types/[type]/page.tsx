import React, { FC, ReactNode } from 'react'
import { AiFillCheckCircle, AiFillCloseCircle } from 'react-icons/ai'
import TypeCard from '@/components/TypeCard'
// import PokemonCardList from '@/components/PokemonCardList'
import MiniCardList from '@/components/MiniCardList'
import DualTypeChart from './DualTypeChart'
import formatName from '@/utils/formatName'
import { TypesApi } from '@/services/TypesApi'
import TypeExtractor from '@/extractors/TypeExtractor'
import TypeSummaryRow from './TypeSummaryRow'
import { Suspense } from 'react'

const getTypeData = async (typeName: string) => {
  const response = await TypesApi.get(typeName)
  return TypeExtractor(response)
}

interface ProsAndConsProps {
  title: string
  doubeDamageList: React.JSX.Element[]
  halfDamageList: React.JSX.Element[]
  noDamageList: React.JSX.Element[]
  doubleDamageMessage: string
  halfDamageMessage: string
  noDamageMessage: string
}

const ProsAndConsInfo: FC<ProsAndConsProps> = ({
  doubeDamageList,
  doubleDamageMessage,
  halfDamageList,
  halfDamageMessage,
  noDamageList,
  noDamageMessage,
  title,
}) => (
  <div className="flex flex-col flex-wrap">
    <div className="text-3xl font-bold">
      <span> {title} </span>
      <span className="italic text-gray-300"> pros & cons </span>
    </div>
    {doubeDamageList?.length > 0 && (
      <>
        <div className="my-2 flex flex-row items-start gap-2 py-2">
          <AiFillCheckCircle className="text-green-400" />
          <span className="-mt-1">{doubleDamageMessage}</span>
        </div>
        <div className="ml-5 flex flex-row flex-wrap gap-2">{doubeDamageList}</div>
      </>
    )}

    <div className="my-2 flex flex-row items-start gap-2 py-2">
      <AiFillCloseCircle className="text-red-400" />
      <span className="-mt-1"> {halfDamageMessage}</span>
    </div>
    <div className="ml-5 flex flex-row flex-wrap gap-2">{halfDamageList}</div>

    {noDamageList?.length > 0 && (
      <>
        <div className="my-2 flex flex-row items-start gap-2 py-2">
          <AiFillCloseCircle className="text-red-400" />
          <span className="-mt-1"> {noDamageMessage} </span>
        </div>
        <div className="ml-5 flex flex-row flex-wrap gap-2">{noDamageList}</div>
      </>
    )}
  </div>
)

interface PageProps {
  params: {
    type: string
  }
}

const TypeDetail: React.FC<PageProps> = async ({ params: { type } }) => {
  const typeInformation = await getTypeData(type)

  const { doubleDamageTo, halfDamageTo, noDamageTo, pokemonList, moveList } = typeInformation

  const formattedType = formatName(type.charAt(0).toUpperCase() + type.slice(1))

  // Count the number of pokemon and moves for the type.
  const pokemonCount = pokemonList.length
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

  const titleDiv = (
    <h1 className="flex flex-row justify-center text-4xl font-semibold">
      {formattedType}&nbsp;
      <span className="brightness-75"> (type) </span>
    </h1>
  )

  return (
    <div>
      <div>
        <div className="space-y-4">
          <div>{titleDiv}</div>
          <div>
            <TypeSummaryRow
              moveCount={moveCount}
              pokemonCount={pokemonCount}
              typeName={formattedType}
            />
          </div>
          <div className="flex flex-row flex-wrap justify-between">
            <div className="w-full space-y-10 mdlg:w-1/3">
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

            <div className="mt-4 flex w-full flex-col pl-0 mdlg:mt-0 mdlg:w-2/3 mdlg:pl-16">
              <h1 className="text-3xl font-bold">Dual type attack pros & cons</h1>
              <p className="my-4">
                {`This chart shows the strength of the ${type} type against every type combination. The fraction of damage a ${type} type move will deal is shown - ½ means 50% damage (not very effective), 2 means 200% (super-effective) and so on.`}
              </p>
              <DualTypeChart
                doubleDamageTo={doubleDamageTo}
                halfDamageTo={halfDamageTo}
                noDamageTo={noDamageTo}
                typeName={type}
              />
            </div>
          </div>
        </div>

        <Suspense fallback={<div> Loading pokemon...</div>}>
          <MiniCardList pokemonList={pokemonList} title={`${formatName(type)} Pokemon`} />
        </Suspense>

        {/* <div>
          {
            <PokemonCardList
              title={`${formatName(type)} Pokemon`}
              pokemonUrls={typeInformation.pokemonList}
            />
          }
        </div> */}
      </div>
    </div>
  )
}

export default TypeDetail
