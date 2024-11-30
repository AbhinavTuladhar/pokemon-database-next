'use client'

import React from 'react'
import classNames from 'classnames'
import type { ReactTabsFunctionComponent, TabListProps } from 'react-tabs'
import { TabList as ReactTabList } from 'react-tabs'

interface CustomTabListProps extends TabListProps {
  extraClassName?: string
}

export const TabList: ReactTabsFunctionComponent<CustomTabListProps> = ({
  children,
  extraClassName,
  ...props
}) => {
  const finalClassName = classNames(
    'dark:border-b-table-border flex flex-wrap gap-x-2 border-b border-b-bd-light pl-0 dark:border-b-bd-dark sm:pl-4',
    {
      ...(extraClassName && {
        [extraClassName]: Boolean(extraClassName),
      }),
    },
  )

  return (
    <ReactTabList {...props} className={finalClassName}>
      {children}
    </ReactTabList>
  )
}

TabList.tabsRole = 'TabList'
