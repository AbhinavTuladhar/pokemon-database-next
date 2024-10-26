'use client'

import React, { ButtonHTMLAttributes, FC } from 'react'
import classNames from 'classnames'

interface ImageSwitcherProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: string
  isSelected: boolean
}

const ImageSwitcher: FC<ImageSwitcherProps> = ({ isSelected, text, ...props }) => {
  return (
    <button
      {...props}
      className={classNames('w-24 rounded-3xl border px-4 py-0 duration-300', {
        'bg-black text-white dark:bg-white dark:text-black': isSelected,
        'bg-white text-black dark:bg-black dark:text-white': !isSelected,
      })}
    >
      {text}
    </button>
  )
}

export default ImageSwitcher
