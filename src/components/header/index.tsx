import React from 'react'
import Link from 'next/link'

const Header = () => {
  return (
    <header className="flex flex-wrap justify-center bg-gradient-to-b from-blue-950 to-slate-900 px-2 pb-8 pt-2 text-center text-6xl font-semibold leading-none tracking-tight lg:font-bold">
      <Link href="/" className="text-sky-500">
        Pokémon Database
      </Link>
    </header>
  )
}

export default Header
