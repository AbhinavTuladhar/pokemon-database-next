import { FC, ReactNode } from 'react'

interface PokeCardContainerProps {
  children: ReactNode
}

const PokeCardContainer: FC<PokeCardContainerProps> = ({ children }) => {
  return (
    <section className="flex flex-row gap-8 justify-center items-center flex-wrap">
      {children}
    </section>
  )
}

export default PokeCardContainer
