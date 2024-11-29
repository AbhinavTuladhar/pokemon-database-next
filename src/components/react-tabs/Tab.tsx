'use client'

import React from 'react'
import classNames from 'classnames'
import type { ReactTabsFunctionComponent, TabProps } from 'react-tabs'

interface CustomTabProps extends TabProps {
  extraClassName?: string
}

export const Tab: ReactTabsFunctionComponent<CustomTabProps> = ({
  children,
  extraClassName,
  ...props
}) => {
  const selectedClassName =
    'text-blue-500 hover:bg-neutral-50 dark:hover:bg-hdr-dark dark:!bg-gray-800 bg-neutral-50 hover:!text-blue-500'

  const finalClassName = classNames(
    'grid translate-y-px cursor-pointer place-items-center whitespace-break-spaces rounded-tl-lg rounded-tr-lg border-x border-t border-gray-300 bg-neutral-200 px-4 py-2 duration-300 hover:text-red-600  hover:underline dark:border-gray-500 dark:bg-hdr-dark dark:hover:text-red-400 dark:hover:brightness-110',
    {
      extraClassName: extraClassName,
      [selectedClassName]: props.selected,
    },
  )

  return (
    <li
      {...props}
      tabIndex={typeof props.tabIndex === 'string' ? parseInt(props.tabIndex, 10) : props.tabIndex}
      className={finalClassName}
    >
      {children}
    </li>
  )
}

Tab.tabsRole = 'Tab'
