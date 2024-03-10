'use client'

import { FC, ReactNode, useEffect, useState } from 'react'

interface SSRProps {
  children: ReactNode
}

const NoSSR: FC<SSRProps> = ({ children }): JSX.Element => {
  const [isMounted, setMount] = useState(false)

  useEffect(() => {
    setMount(true)
  }, [])

  return <>{isMounted ? children : null}</>
}

export default NoSSR
