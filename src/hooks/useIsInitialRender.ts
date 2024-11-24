import { useEffect, useRef } from 'react'
const useIsInitialRender = () => {
  const isMountRef = useRef(true)

  useEffect(() => {
    isMountRef.current = false
  }, [])

  return { isInitialRender: isMountRef.current }
}

export default useIsInitialRender
