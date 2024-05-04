'use client'

import { ChangeEvent, FC, useCallback, useEffect, useMemo, useState } from 'react'
import { usePathname } from 'next/navigation'
import { AnimatePresence, motion } from 'framer-motion'
import debounce from 'lodash.debounce'
import { IoMdSearch } from 'react-icons/io'

import SearchResultRow from './search-result-row'

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

  const handleFilter = useCallback(
    (value: string) => {
      const searchQuery = value.trim().toLowerCase()

      if (searchQuery.length < 2) {
        setFilteredData([])
        return
      }
      const filteredList = searchList.filter(item =>
        item.name.replace('-', ' ').includes(searchQuery),
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
    <div
      className="relative z-20"
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
      <AnimatePresence>
        {filteredData.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="absolute left-0 top-[calc(100%+1rem)] grid w-full bg-black"
          >
            {filteredData.map(({ name, resourceType }) => (
              <SearchResultRow key={name} name={name} resourceType={resourceType} />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default SearchInput
