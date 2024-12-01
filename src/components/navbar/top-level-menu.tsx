'use client'

import { FC, ReactNode, useState } from 'react'
import classNames from 'classnames'
import { AnimatePresence, HTMLMotionProps, motion } from 'framer-motion'

import { useMediaQuery } from '@/hooks/useMediaQuery'

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
  const isMobile = useMediaQuery('(max-width: 768px)')

  const closeMenu = () => setIsOpen(false)
  const openMenu = () => setIsOpen(true)
  const toggleMenu = () => setIsOpen(!isOpen)

  // transition just opacity on mobile, transition opacity and height on desktop
  const dynamicProps: HTMLMotionProps<'ul'> = {
    ...(isMobile
      ? {
          initial: { opacity: 0 },
          animate: {
            opacity: 1,
            transition: {
              delay: 0.3,
              ease: 'easeInOut',
            },
          },
          exit: { opacity: 0 },
        }
      : {
          initial: { opacity: 0, clipPath: 'inset(0 0 100% 0)' },
          animate: {
            opacity: 1,
            clipPath: 'inset(0 0 0 0)',
            transition: {
              delay: 0.15,
            },
          },
          exit: { opacity: 0, clipPath: 'inset(0 0 100% 0)' },
        }),
    transition: { duration: 0.4, ease: 'easeInOut' },
  }

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
      <AnimatePresence>
        {isOpen && (
          <motion.ul
            {...dynamicProps}
            className={classNames(
              'absolute left-0 right-0 top-16 z-50 text-center text-white transition-opacity duration-500 md:top-14',
            )}
          >
            {menuData.map(item => (
              <DropDownItem key={item.path} path={item.path} name={item.name} />
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </li>
  )
}

export default TopLevelMenu
