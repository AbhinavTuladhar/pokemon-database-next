import React from 'react'
import Image from 'next/image'

const ImageColumn = () => {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-y-10 md:w-4/12">
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
    </div>
  )
}

const TitleText = () => {
  return (
    <>
      <div>
        <span className="text-center">
          <span className="text-5xl font-bold">Welcome to</span>
          <br />
          <span className="bg-gradient-to-r from-green-500 to-blue-500 bg-clip-text text-5xl font-bold text-transparent">
            Pokémon Database
          </span>
        </span>
        <small className="text-xs">s clone!</small>
      </div>
    </>
  )
}

const InformativeText = () => {
  return (
    <>
      <span>
        This is a simple clone of the{' '}
        <a href="https://pokemondb.net/" className="text-blue-500">
          {' '}
          Pokemon Database website.{' '}
        </a>
      </span>
      <span>This was made using ReactJS, React Router, Tailwind CSS and some other libraries.</span>
      <span>
        You can view the source code{' '}
        <a href="https://github.com/AbhinavTuladhar/Pokemon-App" className="text-blue-500">
          {' '}
          here.{' '}
        </a>
      </span>
    </>
  )
}

const WelcomePage = () => {
  return (
    <div>
      <div className="flex flex-row items-center justify-center gap-4 py-4 md:flex-row">
        <div>
          <TitleText />
          <div className="flex flex-col space-y-4 py-4">
            <InformativeText />
          </div>
        </div>
        <ImageColumn />
      </div>
    </div>
  )
}

export default WelcomePage
