import React, { FC, PropsWithChildren } from 'react'

export const ErrorContainerPage: FC<PropsWithChildren> = ({ children }) => (
  <div className="absolute inset-0 z-[999] grid h-dvh place-items-center bg-gray-800">
    <div className="md w-11/12 rounded-lg bg-black px-4 text-white lg:w-1/2">{children}</div>
  </div>
)
