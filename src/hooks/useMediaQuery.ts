import { useEffect, useState } from 'react'

const useMediaQuery = (query: string) => {
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return

    const queryList = window.matchMedia(query)
    const handleChange = () => setMatches(queryList.matches)

    handleChange()
    queryList.addEventListener('change', handleChange)

    return () => queryList.removeEventListener('change', handleChange)
  }, [query])

  return matches
}

export default useMediaQuery
