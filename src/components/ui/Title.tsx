import { FC, PropsWithChildren } from 'react'

export const PageTitle: FC<PropsWithChildren> = ({ children }) => (
  <h1 className="my-4 text-center text-5xl font-bold">{children}</h1>
)

export const SectionTitle: FC<PropsWithChildren> = ({ children }) => {
  return <div className="my-4 text-4xl font-bold">{children}</div>
}
