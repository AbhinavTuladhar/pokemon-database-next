import React, { FC, PropsWithChildren } from 'react'

export const PageLayout: FC<PropsWithChildren> = ({ children }) => (
  <div className="min-h-screen max-w-full bg-neutral-50 text-black dark:bg-gray-800 dark:text-white">
    {' '}
    {children}
  </div>
)
