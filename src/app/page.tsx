/* eslint-disable @next/next/no-img-element */
import React from 'react'
import Image from 'next/image'
import type { Variants } from 'framer-motion'

import { MotionDiv, MotionSpan } from '@/components/client-components'

import RandomPokemon from './_components/RandomPokemon'

const welcomeVariant: Variants = {
  initial: { y: '10rem', opacity: 0 },
  animate: {
    y: 0,
    opacity: 1,
    transition: { staggerChildren: 0.15, ease: 'easeOut', duration: 0.8 },
  },
}

const entryVariantLeft: Variants = {
  initial: { x: '-10rem', opacity: 0 },
  animate: {
    x: 0,
    opacity: 1,
    transition: { staggerChildren: 0.25, ease: 'easeOut', duration: 1 },
  },
}

const entryVariantRight: Variants = {
  initial: { x: '10rem', opacity: 0 },
  animate: {
    x: 0,
    opacity: 1,
    transition: { staggerChildren: 0.3, ease: 'easeInOut', duration: 0.8, delay: 0.4 },
  },
}

const ImageColumn = () => {
  return (
    <MotionDiv
      variants={entryVariantRight}
      className="flex h-full w-full flex-col items-center justify-center gap-y-10 md:w-4/12"
    >
      <Image
        src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/25.gif"
        className="h-40 flex-grow"
        alt="Pikachu gif"
        width={173}
        height={160}
        unoptimized
      />
      <Image
        src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/6.gif"
        className="h-40 flex-grow"
        alt="Charizard gif"
        width={173}
        height={160}
        unoptimized
      />
    </MotionDiv>
  )
}

const TitleText = () => {
  return (
    <>
      <MotionDiv variants={entryVariantLeft} initial="initial" animate="animate">
        <MotionSpan className="text-center" variants={entryVariantLeft}>
          <span className="text-5xl font-bold">Welcome to</span>
          <br />
          <span className="bg-gradient-to-r from-green-500 to-blue-500 bg-clip-text text-5xl font-bold text-transparent">
            Pokémon Database
          </span>
        </MotionSpan>
        <small className="text-xs">{"'s clone!"}</small>
      </MotionDiv>
    </>
  )
}

const InformativeText = () => {
  console.log('This is the informative text.')
  return (
    <>
      <MotionSpan variants={entryVariantLeft}>
        This is a simple clone of the{' '}
        <a href="https://pokemondb.net/" className="text-blue-500">
          Pokemon Database website.
        </a>
      </MotionSpan>
      <MotionSpan variants={entryVariantLeft}>
        This was made using primarily using NextJS, TypeScript, TailwindCSS and Framer Motion.
      </MotionSpan>
      <MotionSpan variants={entryVariantLeft}>
        You can view the source code{' '}
        <a
          href="https://github.com/AbhinavTuladhar/pokemon-database-next"
          className="text-blue-500"
        >
          here.
        </a>
      </MotionSpan>
    </>
  )
}

const NewPage = () => {
  return (
    <main className="py-4 lg:py-14">
      <div className="grid grid-cols-12 items-center gap-y-8 lg:gap-x-8">
        <div className="col-span-12 space-y-4 lg:col-span-5">
          <h1 className="text-main-title/tight text-center font-bold lg:text-left">
            Explore the World of Pokémon!
          </h1>
          <div className="space-y-3">
            <span className="text-lg">
              Get all sorts of information about your favourite Pokémon!
            </span>
            {/* <SearchBar /> */}
          </div>
        </div>
        <div className="col-span-12 lg:col-span-7">
          <img
            src="https://images7.alphacoders.com/592/592678.jpg"
            style={{ height: 'auto' }}
            alt="hero banner"
            className="w-full max-w-full"
          />
        </div>
      </div>
      <RandomPokemon />
    </main>
  )
}

const WelcomePage = () => {
  return <NewPage />
  // return (
  //   <MotionDiv
  //     variants={welcomeVariant}
  //     initial="initial"
  //     animate="animate"
  //     className="flex flex-row flex-wrap items-center justify-center gap-4 overflow-x-hidden py-4 md:flex-row"
  //   >
  //     <MotionDiv variants={entryVariantLeft}>
  //       <TitleText />
  //       <MotionDiv variants={entryVariantLeft} className="flex flex-col space-y-4 py-4">
  //         <InformativeText />
  //       </MotionDiv>
  //     </MotionDiv>
  //     <ImageColumn />
  //   </MotionDiv>
  // )
}

export default WelcomePage
