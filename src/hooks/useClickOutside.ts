import { RefObject, useEffect, useRef } from 'react'

type ClickOutsideHandler = (event: MouseEvent | TouchEvent) => void

const useClickOutside = <T extends HTMLElement>(callback: ClickOutsideHandler): RefObject<T> => {
  const ref = useRef<T>(null)

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent | TouchEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback(event)
      }
    }

    document.addEventListener('mousedown', handleOutsideClick)
    document.addEventListener('touchstart', handleOutsideClick)

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick)
      document.removeEventListener('touchstart', handleOutsideClick)
    }
  }, [callback])

  // @ts-expect-error
  return ref
}

export default useClickOutside
