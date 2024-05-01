'use client'

import { FC, ReactNode, useState } from 'react'
import Link from 'next/link'
import classNames from 'classnames'
import { BsGearFill } from 'react-icons/bs'
import { FaDatabase } from 'react-icons/fa'
import { MdOutlineCatchingPokemon } from 'react-icons/md'

interface Path {
  path: string
  name: string
}

interface TopLevelProps {
  menuData: Array<Path>
  parentText: string
  icon: ReactNode
}
const DropDownItem: FC<Path> = ({ path, name }) => {
  return (
    <li className="block bg-gray-900 px-4 py-1.5 text-left text-white duration-500 hover:bg-gray-700">
      <Link href={path} className="flex w-full">
        <span>{name}</span>
      </Link>
    </li>
  )
}

const TopLevelMenu: FC<TopLevelProps> = ({ menuData, parentText, icon }) => {
  const [isOpen, setIsOpen] = useState(false)

  const closeMenu = () => setIsOpen(false)
  const openMenu = () => setIsOpen(true)
  const toggleMenu = () => setIsOpen(!isOpen)

  return (
    <li
      className="flex flex-1 justify-center bg-slate-800 px-2 py-3 text-center text-white duration-500 md:relative"
      onMouseOver={openMenu}
      onMouseOut={closeMenu}
      onClick={toggleMenu}
    >
      <span className="flex w-full flex-col items-center justify-center gap-x-2 gap-y-2 text-sm hover:cursor-default md:flex-row md:text-base md:font-bold">
        <>{icon}</>
        <span> {parentText} </span>
      </span>
      <ul
        className={classNames(
          'absolute left-0 right-0 top-[4.5rem] z-50 text-center text-white transition-opacity duration-500 md:top-12',
          { 'opacity-100': isOpen },
          { 'pointer-events-none opacity-0': !isOpen },
        )}
      >
        {menuData.map(item => (
          <DropDownItem key={item.path} path={item.path} name={item.name} />
        ))}
      </ul>
    </li>
  )
}

const NavBar = () => {
  const pokedexLinks = [
    { path: '/pokedex/generation/1', name: 'Gen 1 (Kanto)' },
    { path: '/pokedex/generation/2', name: 'Gen 2 (Johto)' },
    { path: '/pokedex/generation/3', name: 'Gen 3 (Hoenn)' },
    { path: '/pokedex/generation/4', name: 'Gen 4 (Sinnoh)' },
    { path: '/pokedex/generation/5', name: 'Gen 5 (Unova)' },
    { path: '/pokedex/generation/6', name: 'Gen 6 (Kalos)' },
    { path: '/pokedex/generation/7', name: 'Gen 7 (Alola)' },
  ]

  const pokemonDataLinks = [
    { path: '/move', name: 'Moves' },
    { path: '/ability', name: 'Abilities' },
    { path: '/item', name: 'Items' },
    { path: '/sprites/animated', name: 'Animated sprites' },
  ]

  const mechanicsLinks = [
    { path: '/berry', name: 'Berries' },
    { path: '/nature', name: 'Natures' },
    { path: '/type', name: 'Types' },
    { path: '/egg-group', name: 'Egg groups' },
    { path: '/location', name: 'Locations' },
  ]
  const iconClassName = 'w-5 h-5'

  return (
    <nav className="relative -mt-6 rounded-lg bg-slate-800 md:static">
      <ul className="flex list-none flex-wrap">
        <TopLevelMenu
          menuData={pokedexLinks}
          parentText="Pokédex"
          icon={<MdOutlineCatchingPokemon className={iconClassName} />}
        />
        <TopLevelMenu
          menuData={pokemonDataLinks}
          parentText="Pokémon data"
          icon={<FaDatabase className={iconClassName} />}
        />
        <TopLevelMenu
          menuData={mechanicsLinks}
          parentText="Game Mechanics"
          icon={<BsGearFill className={iconClassName} />}
        />
        <li className="w-full p-2 md:w-auto">
          <input
            className="w-full rounded-md bg-slate-500 px-2 py-1 text-white"
            placeholder="Search"
          />
        </li>
      </ul>
    </nav>
  )
}

export default NavBar
