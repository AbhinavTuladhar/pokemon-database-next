import React, { FC } from 'react'

interface TitleProps {
  children: React.ReactNode
}

export const PageTitle: FC<TitleProps> = ({ children }) => (
  <h1 className="my-4 text-center text-5xl font-bold">{children}</h1>
)
