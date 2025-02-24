import { FC } from 'react'

import formatName from '@/utils/formatName'

interface TypeCardProps {
  moveCount: number
  pokemonCount: number
  typeName: string
}

export const TypeDetailCard: FC<TypeCardProps> = ({ moveCount, pokemonCount, typeName }) => {
  // Now include only the Pokemon + their forms up to generation 7 only.
  // const pokemonCount = pokemonList
  //   ?.map((url) => {
  //     const idNumber = url.match(/\/(\d+)\/$/)[1]
  //     return parseInt(idNumber)
  //   })
  //   ?.filter((id) => id <= 10157)?.length

  return (
    <section className="mt-6 mb-3 flex flex-row flex-wrap justify-center gap-x-20 gap-y-10">
      <div className="flex w-40 flex-col items-center justify-center rounded-lg border border-slate-500 p-2 text-center">
        <span className="text-2xl font-bold">{pokemonCount}</span>
        <span className="text-sm"> {formatName(typeName)} type Pokémon </span>
      </div>

      <div className="flex w-40 flex-col items-center justify-center rounded-lg border border-slate-500 p-2 text-center">
        <span className="text-2xl font-bold">{moveCount}</span>
        <span className="text-sm"> {formatName(typeName)} type moves </span>
      </div>
    </section>
  )
}
