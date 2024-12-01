import { useEffect, useState } from 'react'

export const useMediaQuery = (query: string) => {
  const [matches, setMatches] = useState(window.matchMedia(query).matches)

  useEffect(() => {
    const queryList = window.matchMedia(query)

    const handleChange = () => {
      setMatches(queryList.matches)
    }

    handleChange()

    queryList.addEventListener('change', handleChange)

    return () => queryList.removeEventListener('change', handleChange)
  }, [query])

  return matches
}
