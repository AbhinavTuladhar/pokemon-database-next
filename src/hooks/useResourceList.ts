import { useEffect } from 'react'
import { useState } from 'react'

import ResourceService from '@/services/resource.service'
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
      const response = await ResourceService.fetch()
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
