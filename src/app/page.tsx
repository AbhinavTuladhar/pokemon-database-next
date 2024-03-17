import React from 'react'
import Image from 'next/image'
import type { Variants } from 'framer-motion'

import { MotionDiv, MotionSpan } from '@/components/Motion'

const fadeInVariant: Variants = {
  hidden: {
    opacity: 0,
  },
  show: {
    opacity: 1,
    transition: {
      duration: 0.8,
      staggerChildren: 0.4,
      ease: 'easeOut',
    },
  },
}

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
      />
      <Image
        src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/6.gif"
        className="h-40 flex-grow"
        alt="Charizard gif"
        width={173}
        height={160}
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
        <small className="text-xs">s clone!</small>
      </MotionDiv>
    </>
  )
}

const InformativeText = () => {
  return (
    <>
      <MotionSpan variants={entryVariantLeft}>
        This is a simple clone of the{' '}
        <a href="https://pokemondb.net/" className="text-blue-500">
          {' '}
          Pokemon Database website.{' '}
        </a>
      </MotionSpan>
      <MotionSpan variants={entryVariantLeft}>
        This was made using ReactJS, React Router, Tailwind CSS and some other libraries.
      </MotionSpan>
      <MotionSpan variants={entryVariantLeft}>
        You can view the source code{' '}
        <a href="https://github.com/AbhinavTuladhar/Pokemon-App" className="text-blue-500">
          {' '}
          here.{' '}
        </a>
      </MotionSpan>
    </>
  )
}

const WelcomePage = () => {
  return (
    <MotionDiv
      variants={welcomeVariant}
      initial="initial"
      animate="animate"
      className="flex flex-row flex-wrap items-center justify-center gap-4 overflow-x-hidden py-4 md:flex-row"
    >
      <MotionDiv variants={entryVariantLeft}>
        <TitleText />
        <MotionDiv variants={entryVariantLeft} className="flex flex-col space-y-4 py-4">
          <InformativeText />
        </MotionDiv>
      </MotionDiv>
      <ImageColumn />
    </MotionDiv>
  )
}

export default WelcomePage
