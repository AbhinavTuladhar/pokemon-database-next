import { FC } from 'react'

import { TypeCard } from '@/components/cards'
import idToGenerationMap from '@/data/idToGenerationMap'
import { PokemonType } from '@/types'
import formatName from '@/utils/formatName'

interface IntroProps {
  id: number
  name: string
  types: Array<PokemonType>
  genus: string | undefined
}

export const BasicIntro: FC<IntroProps> = ({ id, name, types, genus }) => {
  // Don't display for the other Pokemon forms.
  if (id >= 10_000) return

  // For grammatical purposes.
  const firstType = types[0].type.name
  const article = firstType.startsWith('e') || firstType.startsWith('i') ? 'an' : 'a'

  // Use the national number instead of the ID numbers to take into account the forms.
  // const generationIntroduced = generationMappingV2(pokedex_numbers?.slice(0, 1).entry_number)
  const generationIntroduced = idToGenerationMap(id)
  // Use only the first word for the other forms.
  const properName = formatName(name).split(' ')[0]

  const typeDiv = types.map((type, index) => {
    const typeName = type.type.name
    return (
      <span key={index}>
        <TypeCard typeName={typeName} variant="text" />
        {index !== types.length - 1 && <span>/</span>}
      </span>
    )
  })

  return (
    <div className="my-4 flex flex-row flex-wrap">
      <span>
        <span>{`${properName} is ${article} `}</span>
        <span>{typeDiv}</span>
        <span>
          {` type Pokemon introduced in Generation ${generationIntroduced}. It is also known as the '${genus}'.`}{' '}
        </span>
      </span>
    </div>
  )
}
