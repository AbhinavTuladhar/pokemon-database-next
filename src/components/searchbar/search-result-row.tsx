'use client'

import React, { FC } from 'react'
import { Link } from 'next-view-transitions'

import formatName from '@/utils/formatName'

interface RowProps {
  name: string
  resourceType: string
  closeMenu: () => void
}

const SearchResultRow: FC<RowProps> = ({ name, resourceType, closeMenu }) => {
  return (
    <Link
      className="flex justify-between gap-x-2 border-b border-b-slate-700 bg-black px-2 py-1.5 text-white duration-300 last:border-b-0 hover:bg-slate-800 dark:bg-[hsl(243.3,97.3%,14.7%)] dark:hover:bg-blue-900"
      key={name}
      href={`/${resourceType}/${name}`}
      onClick={closeMenu}
    >
      <span className="font-bold"> {formatName(name)} </span>
      <span className="font-thin text-gray-300"> {formatName(resourceType)}</span>
    </Link>
  )
}

export default SearchResultRow
