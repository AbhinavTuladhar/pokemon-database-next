import React from 'react'

import Navbar from '../navbar'
import { TransitionLink } from '../ui/Link'

const Header = () => {
  return (
    <header>
      <div className="flex flex-wrap justify-center bg-linear-to-b from-gray-700 to-gray-800 px-2 pt-2 pb-8 text-center text-6xl leading-none font-semibold tracking-tight lg:font-bold dark:from-blue-950 dark:to-slate-900">
        <TransitionLink href="/" className="text-sky-500" nonTextFlag>
          Pokémon Database
        </TransitionLink>
      </div>
      <div className="relative z-50 mx-0 max-w-(--breakpoint-xl) lg:mx-8 xl:mx-auto xl:px-8">
        <Navbar />
      </div>
    </header>
  )
}

export default Header
