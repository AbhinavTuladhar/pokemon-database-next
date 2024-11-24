import React, { ButtonHTMLAttributes, FC, PropsWithChildren } from 'react'

interface PageButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>, PropsWithChildren {}

const PageChangeButton: FC<PageButtonProps> = ({ children, ...props }) => (
  <button
    {...props}
    className="size-8 cursor-pointer rounded-full duration-300 hover:bg-gray-200 disabled:cursor-default disabled:text-gray-300 disabled:hover:bg-transparent dark:hover:bg-gray-600 dark:disabled:text-gray-500 dark:disabled:hover:bg-transparent"
  >
    {children}
  </button>
)

export default PageChangeButton
