'use client'

import { FC, useState } from 'react'
import Link from 'next/link'

interface ListItemProps {
  items: Array<{
    path: string
    name: string
  }>
  closeMenu?: () => void
  subMenuFlag: boolean
}

const ListItem: FC<ListItemProps> = ({ items, closeMenu, subMenuFlag }) => {
  return items.map((data, index) => (
    <li
      className={`float-left min-h-full w-full flex-1 ${subMenuFlag && 'w-full'}`}
      onClick={closeMenu}
      key={index}
    >
      <Link href={data.path}>
        <span
          className={`block w-full bg-gray-800 px-2 text-center text-white duration-300 hover:brightness-125 ${subMenuFlag ? 'bg-black py-3' : 'py-4'}`}
        >
          {data.name}
        </span>
      </Link>
    </li>
  ))
}

interface DropDownProps {
  menuData: Array<{
    path: string
    name: string
  }>
  parentText: string
}

const DropDownMenu: FC<DropDownProps> = ({ menuData, parentText }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    // setIsMenuOpen(prevState => !prevState)
    setIsMenuOpen(!isMenuOpen)
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  const openMenu = () => {
    setIsMenuOpen(true)
  }

  const navElements = <ListItem items={menuData} closeMenu={closeMenu} subMenuFlag={true} />

  return (
    <li
      className="float-left flex-1"
      onMouseOver={openMenu}
      onMouseOut={closeMenu}
      onClick={toggleMenu}
    >
      <div className="group relative">
        <button className="block w-full whitespace-nowrap bg-gray-800 px-2 py-4 text-center text-white duration-300 hover:brightness-125">
          <span> {parentText} </span>
          <span className="text-yellow-400">▼</span>
        </button>
        <ul
          className={`absolute z-10 ${
            isMenuOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
          } w-full text-center text-white transition-opacity duration-300`}
          onClick={closeMenu}
        >
          {navElements}
        </ul>
      </div>
    </li>
  )
}

const NavBar = () => {
  const pokedexLinks = [
    { path: '/pokedex/generation/1', name: 'Gen 1' },
    { path: '/pokedex/generation/2', name: 'Gen 2' },
    { path: '/pokedex/generation/3', name: 'Gen 3' },
    { path: '/pokedex/generation/4', name: 'Gen 4' },
    { path: '/pokedex/generation/5', name: 'Gen 5' },
    { path: '/pokedex/generation/6', name: 'Gen 6' },
    { path: '/pokedex/generation/7', name: 'Gen 7' },
  ]

  const listLinks = [
    { path: '/move', name: 'Moves' },
    { path: '/ability', name: 'Abilities' },
    { path: '/berry', name: 'Berries' },
    { path: '/egg-group', name: 'Egg groups' },
    { path: '/nature', name: 'Natures' },
    { path: '/sprites/animated', name: 'Animated sprites' },
  ]

  const otherLinks = [
    { path: '/type', name: 'Types' },
    { path: '/location', name: 'Locations' },
  ]

  return (
    <header>
      <div className="flex flex-wrap justify-center bg-gradient-to-t from-slate-900 to-slate-800 p-2 text-center text-6xl font-semibold leading-none tracking-tight lg:font-bold">
        <Link href="/" className="text-sky-500">
          Pokémon Database
        </Link>
      </div>
      <nav>
        <ul className="flex list-none flex-wrap">
          <DropDownMenu parentText="Pokédex" menuData={pokedexLinks} />
          <DropDownMenu parentText="Lists" menuData={listLinks} />
          <ListItem items={otherLinks} subMenuFlag={false} />
        </ul>
      </nav>
    </header>
  )
}

export default NavBar
