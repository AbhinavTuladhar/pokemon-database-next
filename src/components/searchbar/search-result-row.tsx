import React, { FC } from 'react'
import Link from 'next/link'

import formatName from '@/utils/formatName'

interface RowProps {
  name: string
  resourceType: string
}

const SearchResultRow: FC<RowProps> = ({ name, resourceType }) => {
  return (
    <Link
      className="flex justify-between border-b border-b-slate-500 bg-[#05014a] px-2 py-1.5 duration-300 last:border-b-0 hover:bg-blue-900"
      key={name}
      href={`/${resourceType}/${name}`}
    >
      <span className="font-bold"> {formatName(name)} </span>
      <span className="font-thin text-gray-300"> {formatName(resourceType)}</span>
    </Link>
  )
}

export default SearchResultRow
