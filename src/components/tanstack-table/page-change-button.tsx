import React, { ButtonHTMLAttributes, FC, PropsWithChildren } from 'react'

interface PageButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>, PropsWithChildren {}

const PageChangeButton: FC<PageButtonProps> = ({ children, ...props }) => (
  <button
    {...props}
    disabled={false}
    className="size-8 cursor-pointer rounded-full duration-300 hover:bg-gray-200 dark:hover:bg-gray-600"
  >
    {children}
  </button>
)

export default PageChangeButton
