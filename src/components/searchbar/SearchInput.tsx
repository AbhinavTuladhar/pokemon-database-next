'use client'

import { ChangeEvent, FC, useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { IoMdSearch } from 'react-icons/io'

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
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Reset the state whenever going to a different route.
  useEffect(() => {
    setSearchText('')
    setFilteredData([])
  }, [pathName])

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
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
    <div
      className="relative z-50"
      ref={dropdownRef}
      onBlur={() => setFilteredData([])}
      onFocus={() => handleFilter(searchText)}
    >
      <input
        value={searchText}
        onChange={handleChange}
        className="w-full rounded-md bg-slate-500 py-1 pl-2 pr-8 text-white"
        placeholder="Search"
      />
      <IoMdSearch className="absolute right-2 top-1/2 h-5 w-5 -translate-y-1/2 text-white" />
      <div className="absolute left-0 top-[calc(100%+1rem)] grid w-full bg-black">
        {filteredData.length > 0
          ? filteredData.map(({ name, resourceType }) => (
              <Link
                className="flex justify-between border-b border-b-slate-500 px-2 py-1.5 last:border-b-0"
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
