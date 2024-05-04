import { FC, ReactNode } from 'react'

interface TitleProps {
  children: ReactNode
}

export const SectionTitle: FC<TitleProps> = ({ children }) => {
  return <div className="my-4 text-4xl font-bold">{children}</div>
}
