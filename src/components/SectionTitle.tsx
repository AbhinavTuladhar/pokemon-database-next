import { FC, ReactNode } from 'react'

interface TitleProps {
  children: ReactNode
}

const SectionTitle: FC<TitleProps> = ({ children }) => {
  return <div className="my-5 text-3xl font-bold">{children}</div>
}

export default SectionTitle
