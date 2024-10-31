import React, { FC } from 'react'
import Image from 'next/image'

interface IntroTextProps {
  image: string | null
}

export const IntroText: FC<IntroTextProps> = ({ image }) => {
  return (
    <section className="grid grid-cols-12">
      <div className="col-span-12 sm:col-span-7 lg:col-span-8">Intro Text</div>
      {image && (
        <div className="col-span-12 sm:col-span-5 lg:col-span-4">
          <Image className="h-auto w-auto" src={image} width={0} height={0} alt={'image'} />
        </div>
      )}
    </section>
  )
}
