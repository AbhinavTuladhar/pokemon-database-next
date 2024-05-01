'use client'

import { FC } from 'react'

interface ResourceData {
  name: string
  resourceType: string
}

interface InputProps {
  searchList: Array<ResourceData>
}

const SearchInput: FC<InputProps> = ({ searchList }) => {
  return (
    <input className="w-full rounded-md bg-slate-500 px-2 py-1 text-white" placeholder="Search" />
  )
}

export default SearchInput
