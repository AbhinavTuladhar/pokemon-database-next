'use client'

import { ChangeEvent, FC, useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import formatName from '@/utils/formatName'

interface ResourceData {
  name: string
  resourceType: string
}

interface InputProps {
  searchList: Array<ResourceData>
}

const SearchInput: FC<InputProps> = ({ searchList }) => {
  const pathName = usePathname()
  const [searchText, setSearchText] = useState('')
  const [filteredData, setFilteredData] = useState<Array<ResourceData>>([])

  // Reset the state whenever going to a different route.
  useEffect(() => {
    setSearchText('')
    setFilteredData([])
  }, [pathName])

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value },
    } = event
    setSearchText(value)
    handleFilter(value)
  }

  const handleFilter = (value: string) => {
    if (value.length < 2) {
      setFilteredData([])
      return
    }
    const filteredList = searchList.filter(item => item.name.includes(value))
    setFilteredData(filteredList.slice(0, 10))
  }

  return (
    <div className="relative z-50">
      <input
        value={searchText}
        onChange={handleChange}
        className="w-full rounded-md bg-slate-500 px-2 py-1 text-white"
        placeholder="Search"
      />
      <div className="absolute left-0 top-[calc(100%+1rem)] grid w-full bg-black">
        {filteredData.length > 0
          ? filteredData.map(({ name, resourceType }) => (
              <Link
                className="flex justify-between border-b border-b-slate-500 p-2 last:border-b-0"
                key={name}
                href={`/${resourceType}/${name}`}
              >
                <span> {formatName(name)} </span>
                <span> {formatName(resourceType)}</span>
              </Link>
            ))
          : null}
      </div>
    </div>
  )
}

export default SearchInput
