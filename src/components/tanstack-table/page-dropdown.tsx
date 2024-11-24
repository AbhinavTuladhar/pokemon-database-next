'use client'

import React, { FC, useState } from 'react'
import classNames from 'classnames'
import { AnimatePresence, motion } from 'framer-motion'
import { RxCaretDown } from 'react-icons/rx'

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

  const handleSelect = (value: string | number) => {
    setSelectedItem(Number(value))
    onChange(Number(value))
    closeMenu()
  }

  return (
    <div className="relative">
      <button
        onClick={toggleMenu}
        className="flex w-16 items-center justify-between gap-2 rounded border border-bd-light p-2 dark:border-bd-dark dark:bg-slate-700"
      >
        <span> {selectedItem}</span>
        <RxCaretDown className={classNames('duration-300', { 'rotate-180': isOpen })} />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.ul
            initial={{ opacity: 0, scaleY: 0 }}
            animate={{ opacity: 1, scaleY: 1 }}
            exit={{ opacity: 0, scaleY: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute bottom-full left-0 right-0 z-20 origin-bottom border border-bd-light dark:border-bd-dark"
          >
            {options.map((option, index) => (
              <li
                className="cursor-pointer p-2 duration-300 hover:bg-blue-400 dark:bg-slate-700 dark:hover:bg-blue-600"
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
