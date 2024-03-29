import { FC } from 'react'

import SectionTitle from '@/components/containers/SectionTitle'
import MiniTypeCard from '@/components/MiniTypeCard'
import { Tooltip } from '@/components/ReactTooltip'
import TypeMultiplierBox from '@/components/TypeMultiplierBox'
import TypeExtractor from '@/extractors/TypeExtractor'
import { TypesApi } from '@/services/TypesApi'
import { PokemonType } from '@/types'
import findTypeEffectiveness from '@/utils/findTypeEffectiveness'
import formatName from '@/utils/formatName'
import multiplierToString from '@/utils/multiplierToString'
import stringifyUrl from '@/utils/stringifyUrl'

interface TypeRowProps {
  typeDefenceInfo: Array<{
    type: string
    multiplier: number
  }>
  extraClassName?: string
}

const TypeDefenceRow: FC<TypeRowProps> = ({ typeDefenceInfo, extraClassName }) => (
  <div
    className={`mx-auto flex flex-row justify-center gap-x-px overflow-x-hidden overflow-y-hidden sm:mx-0 ${extraClassName}`}
  >
    {typeDefenceInfo.map((row, rowIndex) => (
      <div className="flex w-9 flex-col text-center" key={rowIndex}>
        <MiniTypeCard typeName={row.type} />
        <div id={row.type}>
          <TypeMultiplierBox multiplier={row.multiplier} />
        </div>
      </div>
    ))}
  </div>
)

interface TypeChartProps {
  types: Array<PokemonType>
  pokemonName: string
}

// Fetches type data only for the one or two types of the Pokemon.
const fetchTypesData = async (urls: Array<string>, replacements: Array<string>) => {
  const properUrls = urls.map((url, number) => {
    const typeName = replacements[number]
    return stringifyUrl(url, typeName)
  })
  const typeData = await TypesApi.getSome(properUrls)

  return typeData.map(TypeExtractor)
}

const TypeChart: FC<TypeChartProps> = async ({ types, pokemonName }) => {
  const typeUrls = types.map((type) => type.type.url)
  const typeNames = types.map((type) => formatName(type.type.name))
  const typeNamesString = typeNames.join('/')

  const typeData = await fetchTypesData(typeUrls, typeNames)

  // Now calculate a type-effectiveness object
  const obj = findTypeEffectiveness(typeData)
  const typeDefenseInfo = Object.entries(obj).map(([type, multiplier]) => {
    return { type, multiplier }
  })

  const toolTipData = typeDefenseInfo.map((obj, index) => {
    const { type, multiplier } = obj
    const effectivenessString = multiplierToString(multiplier)
    return (
      <Tooltip anchorSelect={`#${type}`} place="bottom" key={index}>
        <span className="text-xs">{`${formatName(type)} → ${typeNamesString} = ${effectivenessString}`}</span>
      </Tooltip>
    )
  })

  const firstClassName = 'mt-6'
  const secondClassName = 'mt-2 md:mt-6 sm:mt-6'

  // Break down the 18 types into two rows, with nine types each.
  return (
    <section>
      <SectionTitle>Type Defences</SectionTitle>
      <span> {`The effectiveness of each type on ${formatName(pokemonName)}: `} </span>

      <div className="flex flex-col justify-center gap-x-px overflow-x-auto min-[720px]:flex-row md:flex-row mdlg:flex-col">
        <TypeDefenceRow
          typeDefenceInfo={typeDefenseInfo.slice(0, 9)}
          extraClassName={firstClassName}
        />
        <TypeDefenceRow
          typeDefenceInfo={typeDefenseInfo.slice(9)}
          extraClassName={secondClassName}
        />
      </div>

      <>{toolTipData}</>
    </section>
  )
}

export default TypeChart
