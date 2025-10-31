import { FC, PropsWithChildren } from 'react'

export const MainLayout: FC<PropsWithChildren> = ({ children }) => (
  <main className="main-layout mx-4 max-w-(--breakpoint-xl) pb-4 md:mx-8 xl:mx-auto xl:px-8">
    {children}
  </main>
)
