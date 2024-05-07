'use client'

import React, { useState } from 'react'
import { FaSun } from 'react-icons/fa'
import { FaMoon } from 'react-icons/fa'

type Theme = 'light' | 'dark'

const DarkModeSwitch = () => {
  const [theme, setTheme] = useState<Theme>('dark')

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light')
    document.body.classList.toggle('dark')
  }
  return (
    <button onClick={toggleTheme}>
      {theme === 'dark' ? (
        <FaSun className="h-5 w-5 text-white" />
      ) : (
        <FaMoon className="h-5 w-5 text-white" />
      )}
    </button>
  )
}

export default DarkModeSwitch
