import React from 'react'

import Header from '@/components/header'
import Navbar from '@/components/navbar'

export const HeaderSection = () => (
  <>
    <Header />
    <div className="relative z-50 mx-0 max-w-(--breakpoint-xl) lg:mx-8 xl:mx-auto xl:px-8">
      <Navbar />
    </div>
  </>
)
