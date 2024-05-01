import React from 'react'

import Input from '../Input'

import PokemonTableSkeleton from './PokemonTableSkeleton'

const SearchablePageSkeleton = () => {
  return (
    <>
      <div className="mb-8 flex justify-center">
        <Input placeholder="" disabled />
      </div>
      <PokemonTableSkeleton />
    </>
  )
}

export default SearchablePageSkeleton
