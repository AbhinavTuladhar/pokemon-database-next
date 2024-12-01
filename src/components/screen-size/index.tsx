'use client'

import React, { useEffect, useState } from 'react'

const ScreenSize = () => {
  const [dimensions, setDimensions] = useState({
    width: 0,
    height: 0,
  })

  useEffect(() => {
    const updateDimensions = () =>
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      })

    updateDimensions()

    window.addEventListener('resize', updateDimensions)

    return () => window.removeEventListener('resize', updateDimensions)
  }, [])

  return (
    <div className="fixed bottom-5 right-5 flex gap-x-4 rounded-full border border-gray-400 bg-black px-4 py-1 font-mono text-sm text-white">
      <span>
        {dimensions.width} x {dimensions.height}
      </span>
      <span className="inline sm:hidden"> XS </span>
      <span className="hidden sm:inline md:hidden"> SM </span>
      <span className="hidden md:inline md-lg:hidden"> MD </span>
      <span className="hidden md-lg:inline lg:hidden"> MD-LG </span>
      <span className="hidden lg:inline lg-xl:hidden"> LG </span>
      <span className="hidden lg-xl:inline xl:hidden"> LG-XL </span>
      <span className="hidden xl:inline 2xl:hidden"> XL </span>
      <span className="hidden 2xl:inline"> 2XL </span>
    </div>
  )
}

export default ScreenSize
