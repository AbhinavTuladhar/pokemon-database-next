import { FC, PropsWithChildren } from 'react'

export const PageTitle: FC<PropsWithChildren> = ({ children }) => (
  <h1 className="mt-4 mb-8 text-center text-5xl font-bold">{children}</h1>
)

export const SectionTitle: FC<PropsWithChildren> = ({ children }) => {
  return <div className="mt-8 mb-4 text-4xl font-bold">{children}</div>
}
