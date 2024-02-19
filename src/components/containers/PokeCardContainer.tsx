import { FC, ReactNode } from 'react'

interface PokeCardContainerProps {
  children: ReactNode
}

const PokeCardContainer: FC<PokeCardContainerProps> = ({ children }) => {
  return (
    <section className="flex flex-row flex-wrap items-center justify-center gap-8">
      {children}
    </section>
  )
}

export default PokeCardContainer
