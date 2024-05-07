'use client'

import React, { FC, PropsWithChildren, useState } from 'react'
import { FaSun } from 'react-icons/fa'
import { FaMoon } from 'react-icons/fa'

type Theme = 'light' | 'dark'

const IconContainer: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="grid h-10 w-10 place-items-center rounded-full duration-300 hover:bg-neutral-700 active:scale-95 dark:hover:bg-indigo-900">
      {children}
    </div>
  )
}

const DarkModeSwitch = () => {
  const [theme, setTheme] = useState<Theme>('dark')

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'))
    document.body.classList.toggle('dark')
  }
  return (
    <button onClick={toggleTheme}>
      <IconContainer>
        {theme === 'dark' ? (
          <FaSun className="h-5 w-5 text-white" />
        ) : (
          <FaMoon className="h-5 w-5 text-white" />
        )}
      </IconContainer>
    </button>
  )
}

export default DarkModeSwitch
