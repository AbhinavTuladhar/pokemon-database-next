import React, { FC } from 'react'
import Image from 'next/image'

interface ImageProps {
  pokemonName: string
  source: string | null | undefined
}

export const PokemonImage: FC<ImageProps> = ({ pokemonName, source }) => (
  <div className="grid size-40 place-items-center rounded-md border border-gray-300 shadow-lg dark:border-gray-700">
    {source ? <Image src={source} width={140} height={140} alt={pokemonName} /> : null}
  </div>
)
