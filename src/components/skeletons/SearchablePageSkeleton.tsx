import React from 'react'

import Input from '../input'

import { PokemonTableSkeleton } from './PokemonTableSkeleton'

export const SearchablePageSkeleton = () => {
  return (
    <>
      <div className="mb-8 flex justify-center">
        <Input placeholder="" disabled />
      </div>
      <PokemonTableSkeleton />
    </>
  )
}
