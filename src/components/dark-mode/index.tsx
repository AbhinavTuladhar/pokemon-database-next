'use client'

import React, { FC, PropsWithChildren, useEffect, useState } from 'react'
import { useTheme } from 'next-themes'
import { FaMoon, FaSun } from 'react-icons/fa'

const IconContainer: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="grid h-10 w-10 place-items-center rounded-full duration-300 hover:bg-neutral-700 active:scale-95 dark:hover:bg-indigo-900">
      {children}
    </div>
  )
}

const DarkModeSwitch = () => {
  const [isMounted, setIsMounted] = useState(false)
  const { theme, setTheme, resolvedTheme } = useTheme()

  const toggleTheme = () => {
    setTheme(resolvedTheme === 'light' ? 'dark' : 'light')
  }

  /**
   * Used to display the correct icon upon first load.
   */
  useEffect(() => setIsMounted(true), [])

  if (!isMounted) {
    return (
      <IconContainer>
        <FaSun className="size-5 text-white" />
      </IconContainer>
    )
  }

  return (
    <button aria-label="Toggle Dark Mode" onClick={toggleTheme}>
      <IconContainer>
        {theme === 'dark' ? (
          <FaSun className="size-5 text-white" />
        ) : (
          <FaMoon className="size-5 text-white" />
        )}
      </IconContainer>
    </button>
  )
}

export default DarkModeSwitch
