import React from 'react'

import ResourceService from '@/services/resource.service'

import SearchInput from './search-input'

const SearchbarWrapper = async () => {
  const searchData = await ResourceService.fetch()

  return <SearchInput searchList={searchData} />
}

export default SearchbarWrapper
