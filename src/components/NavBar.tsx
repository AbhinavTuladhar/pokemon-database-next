'use client'

import { FC, ReactNode, useState } from 'react'
import Link from 'next/link'
import classNames from 'classnames'
import { MdOutlineCatchingPokemon } from 'react-icons/md'
import { RiFileListFill } from 'react-icons/ri'

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
    <li className="block w-screen bg-gray-900 px-4 py-1.5 text-left text-white duration-300 hover:brightness-125 md:w-full">
      <Link href={path} className="flex w-full flex-1">
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
      className="z-10 float-left flex flex-1 justify-center bg-gray-800 px-2 py-3 text-center text-white duration-300 hover:brightness-125"
      onMouseOver={openMenu}
      onMouseOut={closeMenu}
      onClick={toggleMenu}
    >
      <button className="flex flex-col items-center gap-x-4 gap-y-2 md:flex-row">
        <>{icon}</>
        <span> {parentText} </span>
      </button>
      <ul
        className={classNames(
          'absolute left-0 top-[4.5rem] z-50 w-full text-center text-white transition-opacity duration-300 md:top-12',
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

  const listData1 = [
    { path: '/move', name: 'Moves' },
    { path: '/ability', name: 'Abilities' },
    { path: '/berry', name: 'Berries' },
    { path: '/item', name: 'Items' },
    { path: '/nature', name: 'Natures' },
  ]

  const listData2 = [
    { path: '/egg-group', name: 'Egg groups' },
    { path: '/sprites/animated', name: 'Animated sprites' },
    { path: '/type', name: 'Types' },
    { path: '/location', name: 'Locations' },
  ]

  return (
    <nav className="z-[999] -mt-6 rounded-md bg-slate-800 md:relative">
      <ul className="flex list-none flex-wrap">
        <TopLevelMenu
          menuData={pokedexLinks}
          parentText="Pokédex"
          icon={<MdOutlineCatchingPokemon />}
        />
        <TopLevelMenu menuData={listData1} parentText="Lists 1" icon={<RiFileListFill />} />
        <TopLevelMenu menuData={listData2} parentText="Lists 2" icon={<RiFileListFill />} />
        <div className="p-2">
          <input className="rounded-md bg-slate-500 px-2 py-1 text-white" placeholder="Search" />
        </div>
      </ul>
    </nav>
  )
}

export default NavBar
