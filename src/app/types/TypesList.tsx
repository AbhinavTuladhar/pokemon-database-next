'use client'

import fetchData from '@/services/fetchData'
import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { TypesApi } from '@/services/TypesApi'

const TypesList: React.FC<any> = () => {
  const { data: typeData } = useQuery({
    queryKey: ['types-list'],
    queryFn: () => TypesApi.getAll(),
  })

  return <div>{typeData?.results.map((type) => <div>{type.name}</div>)}</div>
}

export default TypesList
