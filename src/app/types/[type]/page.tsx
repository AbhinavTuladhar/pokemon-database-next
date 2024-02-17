import React from 'react'
import { AiFillCheckCircle, AiFillCloseCircle } from 'react-icons/ai'
import TypeCard from '@/components/TypeCard'
// import PokemonCardList from '@/components/PokemonCardList'
// import TypeDetailCard from './TypeDetailCard'
// import DualTypeChart from './DualTypeChart'
import formatName from '@/utils/formatName'
import { TypesApi } from '@/services/TypesApi'
import TypeExtractor from '@/extractors/TypeExtractor'

const getTypeData = async (typeName: string) => {
  const response = await TypesApi.get(typeName)
  return TypeExtractor(response)
}

interface PageProps {
  params: {
    type: string
  }
}

const TypeDetail: React.FC<PageProps> = async ({ params: { type } }) => {
  const typeInformation = await getTypeData(type)

  const { pokemonList, moveList } = typeInformation ?? {}

  const formattedType = type.charAt(0).toUpperCase() + type.slice(1)

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

  const offensiveDiv = (
    <div className="flex flex-col flex-wrap">
      <div className="text-3xl font-bold">
        Attack <span className="italic text-gray-300"> pros & cons </span>
      </div>
      {doubleDamageToList?.length > 0 && (
        <>
          <div className="my-2 flex flex-row items-center gap-2 py-2">
            <AiFillCheckCircle className="text-green-400" /> {formattedType} moves are
            super-effective against
          </div>
          <div className="ml-4 flex flex-row flex-wrap gap-2">{doubleDamageToList}</div>
        </>
      )}

      <div className="my-2 flex flex-row items-center gap-2 py-2">
        <AiFillCloseCircle className="text-red-400" /> {formattedType} moves are not very effective
        against
      </div>
      <div className="ml-4 flex flex-row flex-wrap gap-2">{halfDamageToList}</div>

      {noDamageToList?.length > 0 && (
        <>
          <div className="my-2 flex flex-row items-center gap-2 py-2">
            <AiFillCloseCircle className="text-red-400" /> {formattedType} moves have no effect on
          </div>
          <div className="ml-4 flex flex-row flex-wrap gap-2">{noDamageToList}</div>
        </>
      )}
    </div>
  )

  const defensiveDiv = (
    <div className="flex flex-col flex-wrap">
      <div className="text-3xl font-bold">
        Defence <span className="italic text-gray-300"> pros & cons </span>
      </div>
      {doubleDamageFromList?.length > 0 && (
        <>
          <div className="my-2 flex flex-row items-center gap-2 py-2">
            <AiFillCheckCircle className="text-green-400" /> These types are super-effective against{' '}
            {formattedType} Pokemon.
          </div>
          <div className="ml-4 flex flex-row flex-wrap gap-2">{doubleDamageFromList}</div>
        </>
      )}

      {halfDamageFromList?.length > 0 && (
        <>
          <div className="my-2 flex flex-row items-center gap-2 py-2">
            <AiFillCloseCircle className="text-red-400" /> These types are not very effective
            against {formattedType} Pokemon.
          </div>
          <div className="ml-4 flex flex-row flex-wrap gap-2">{halfDamageFromList}</div>
        </>
      )}

      {noDamageFromList?.length > 0 && (
        <>
          <div className="my-2 flex flex-row items-center gap-2 py-2">
            <AiFillCloseCircle className="text-red-400" /> These types have no effect on{' '}
            {formattedType} Pokemon.
          </div>
          <div className="ml-4 flex flex-row flex-wrap gap-2">{noDamageFromList}</div>
        </>
      )}
    </div>
  )

  const { doubleDamageTo, halfDamageTo, noDamageTo } = typeInformation

  const DualTypeChartProps = {
    typeName: type,
    doubleDamageTo,
    halfDamageTo,
    noDamageTo,
  }

  return (
    <div>
      <div>
        <div>
          <div>{titleDiv}</div>
          <div>
            {/* <TypeDetailCard moveList={moveList} pokemonList={pokemonList} typeName={type} /> */}
          </div>
        </div>

        <div className="mt-4 flex flex-row flex-wrap justify-between">
          <div className="w-full mdlg:w-1/3">
            <div className="mb-10">{offensiveDiv}</div>
            <div>{defensiveDiv}</div>
          </div>

          <div className="mt-4 flex w-full flex-col pl-0 mdlg:mt-0 mdlg:w-2/3 mdlg:pl-16">
            <h1 className="text-3xl font-bold">Dual type attack pros & cons</h1>
            <p className="my-4">
              {`This chart shows the strength of the ${type} type against every type combination. The fraction of damage a ${type} type move will deal is shown - ½ means 50% damage (not very effective), 2 means 200% (super-effective) and so on.`}
            </p>
            {/* <DualTypeChart data={DualTypeChartProps} /> */}
          </div>
        </div>

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
