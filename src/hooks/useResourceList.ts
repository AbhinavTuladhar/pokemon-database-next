import { useEffect } from 'react'
import { useState } from 'react'

import { ResourceApi } from '@/services/ResourcesApi'
import { FlatResourceList } from '@/types'

/**
 * A custom hook for finding the most similar resource name
 * @returns
 */
const useResourceList = () => {
  const [data, setData] = useState<FlatResourceList[]>()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<any>(null)

  useEffect(() => {
    const fetchData = async () => {
      const response = await ResourceApi.fetch()
      setData(response)
    }

    try {
      setIsLoading(true)
      fetchData()
    } catch (error) {
      setError(error)
    } finally {
      setIsLoading(false)
    }
  }, [])

  return { data, isLoading, error }
}

export default useResourceList
