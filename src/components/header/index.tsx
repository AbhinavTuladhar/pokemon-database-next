import React from 'react'

import { TransitionLink } from '../ui/Link'

const Header = () => {
  return (
    <header className="flex flex-wrap justify-center bg-linear-to-b from-gray-700 to-gray-800 px-2 pt-2 pb-8 text-center text-6xl leading-none font-semibold tracking-tight lg:font-bold dark:from-blue-950 dark:to-slate-900">
      <TransitionLink href="/" className="text-sky-500" nonTextFlag>
        Pokémon Database
      </TransitionLink>
    </header>
  )
}

export default Header
