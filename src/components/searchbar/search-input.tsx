'use client'

import { ChangeEvent, FC, useCallback, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import debounce from 'lodash.debounce'
import { IoMdSearch } from 'react-icons/io'

import { ResourceTypes } from '@/types'

import SearchResultRow from './search-result-row'

interface ResourceData {
  name: string
  resourceType: ResourceTypes
}

interface InputProps {
  searchList: Array<ResourceData>
}

const SearchInput: FC<InputProps> = ({ searchList }) => {
  const [searchText, setSearchText] = useState('')
  const [filteredData, setFilteredData] = useState<Array<ResourceData>>([])

  const closeMenu = () => {
    setSearchText('')
    setFilteredData([])
  }

  const handleFilter = useCallback(
    (value: string) => {
      const searchQuery = value.trim().toLowerCase() // Convert search query to lowercase

      if (searchQuery.length < 2) {
        setFilteredData([])
        return
      }
      const filteredList = searchList.filter(
        item => item.name.replaceAll('-', ' ').toLowerCase().includes(searchQuery), // Convert item name to lowercase
      )
      setFilteredData(filteredList.slice(0, 10))
    },
    [searchList],
  )

  const debouncedChange = useMemo(
    () =>
      debounce((value: string) => {
        handleFilter(value)
      }, 250),
    [handleFilter],
  )

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    setSearchText(value)
    debouncedChange(value)
  }

  return (
    <div className="relative z-20">
      <input
        value={searchText}
        onBlur={() => setFilteredData([])}
        onFocus={() => handleFilter(searchText)}
        onChange={handleChange}
        className="w-full rounded-md bg-slate-500 py-1 pr-8 pl-2 text-white"
        placeholder="Search"
      />
      <IoMdSearch className="absolute top-1/2 right-2 h-5 w-5 -translate-y-1/2 text-white" />
      <AnimatePresence>
        {filteredData.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="absolute top-[calc(100%+1rem)] left-0 grid w-full bg-black"
          >
            {filteredData.map(({ name, resourceType }) => (
              <SearchResultRow
                closeMenu={closeMenu}
                key={name}
                name={name}
                resourceType={resourceType}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default SearchInput
