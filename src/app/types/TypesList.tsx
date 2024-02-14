'use client'

import { useQuery } from '@tanstack/react-query'
import React from 'react'

const TypesList: React.FC<any> = ({ data }) => {
  const { data: typeData } = useQuery({
    queryKey: ['types-list'],
    queryFn: async () => {
      const response = await fetch('https://pokeapi.co/api/v2/type')
      const data = await response.json()
      return data
    },
  })

  return <div>{JSON.stringify(typeData, null, 2)}</div>
}

export default TypesList
