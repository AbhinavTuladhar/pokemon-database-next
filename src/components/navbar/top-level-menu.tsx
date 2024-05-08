'use client'

import { FC, ReactNode, useState } from 'react'
import classNames from 'classnames'

import DropDownItem from './drop-down-item'

interface Path {
  path: string
  name: string
}

interface TopLevelProps {
  menuData: Array<Path>
  parentText: string
  icon: ReactNode
}

const TopLevelMenu: FC<TopLevelProps> = ({ menuData, parentText, icon }) => {
  const [isOpen, setIsOpen] = useState(false)

  const closeMenu = () => setIsOpen(false)
  const openMenu = () => setIsOpen(true)
  const toggleMenu = () => setIsOpen(!isOpen)

  return (
    <li
      className="flex flex-1 justify-center px-2 py-3 text-center text-white duration-500 md:relative"
      onMouseOver={openMenu}
      onMouseOut={closeMenu}
      onClick={toggleMenu}
    >
      <span className="flex w-full flex-col items-center justify-center gap-x-2 gap-y-2 text-sm hover:cursor-default md:flex-row md:text-base md:font-bold">
        <>{icon}</>
        <span className="text-sm lg:text-base"> {parentText} </span>
      </span>
      <ul
        className={classNames(
          'absolute left-0 right-0 top-[4.5rem] z-50 text-center text-white transition-opacity duration-500 md:top-[3.5rem]',
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

export default TopLevelMenu
