import React from 'react'

import { ResourceApi } from '@/services/ResourcesApi'

import SearchInput from './search-input'

const SearchbarWrapper = async () => {
  const searchData = await ResourceApi.fetch()

  return <SearchInput searchList={searchData} />
}

export default SearchbarWrapper
