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
  mobileText: string
  icon: ReactNode
  desktopText?: string
}

const TopLevelMenu: FC<TopLevelProps> = ({ menuData, mobileText, icon, desktopText }) => {
  const [isOpen, setIsOpen] = useState(false)

  const closeMenu = () => setIsOpen(false)
  const openMenu = () => setIsOpen(true)
  const toggleMenu = () => setIsOpen(!isOpen)

  return (
    <li
      className="flex flex-1 justify-center px-2 py-2 text-center text-white duration-500 md:relative md:py-3"
      onMouseOver={openMenu}
      onFocus={openMenu}
      onMouseOut={closeMenu}
      onClick={toggleMenu}
      onBlur={closeMenu}
    >
      <span className="flex w-full flex-col items-center justify-center gap-1 text-sm hover:cursor-default md:flex-row md:gap-2 md:text-base md:font-bold">
        <>{icon}</>
        {desktopText && (
          <span className="hidden text-sm md:block lg:text-base"> {desktopText} </span>
        )}
        <span
          className={classNames('text-sm lg:text-base', {
            'block md:hidden': desktopText,
          })}
        >
          {mobileText}
        </span>
      </span>
      <ul
        className={classNames(
          'absolute left-0 right-0 top-16 z-50 text-center text-white transition-opacity duration-500 md:top-14',
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
