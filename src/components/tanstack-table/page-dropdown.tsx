'use client'

import React, { FC, useState } from 'react'
import classNames from 'classnames'
import { AnimatePresence, motion } from 'framer-motion'
import { RxCaretDown } from 'react-icons/rx'

import useClickOutside from '@/hooks/useClickOutside'

interface PageDropdownProps {
  options: Array<number>
  onChange: (value: number) => void
  initialValue: number
}

const PageDropdown: FC<PageDropdownProps> = ({ options, onChange, initialValue }) => {
  const [selectedItem, setSelectedItem] = useState(initialValue)
  const [isOpen, setIsOpen] = useState(false)

  const closeMenu = () => setIsOpen(false)
  const toggleMenu = () => setIsOpen(!isOpen)

  const divRef = useClickOutside<HTMLDivElement>(closeMenu)

  const handleSelect = (value: number) => {
    if (value === selectedItem) {
      return
    }
    setSelectedItem(value)
    onChange(value)
    closeMenu()
  }

  return (
    <div className="relative" ref={divRef}>
      <button
        onClick={toggleMenu}
        className="border-bd-light dark:border-bd-dark flex w-16 items-center justify-between gap-2 rounded-sm border p-2 dark:bg-slate-700"
      >
        <span> {selectedItem}</span>
        <RxCaretDown className={classNames('duration-300', { 'rotate-180': isOpen })} />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.ul
            initial={{ opacity: 0, clipPath: 'inset(100% 0% 0% 0%)' }}
            animate={{ opacity: 1, clipPath: 'inset(0% 0% 0% 0%)' }}
            exit={{ opacity: 0, clipPath: 'inset(100% 0% 0% 0%)' }}
            transition={{ duration: 0.3 }}
            className="border-bd-light dark:border-bd-dark absolute right-0 bottom-full left-0 z-20 origin-bottom border bg-neutral-50 dark:bg-slate-700"
          >
            {options.map((option, index) => (
              <li
                className={classNames(
                  'cursor-pointer p-2 duration-300 hover:bg-gray-200 dark:hover:bg-blue-600',
                  {
                    'cursor-default bg-gray-200 dark:bg-blue-600': option === selectedItem,
                  },
                )}
                key={index}
                onClick={() => handleSelect(option)}
              >
                {option}
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  )
}

export default PageDropdown
