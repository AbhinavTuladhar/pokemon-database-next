import Image from 'next/image'

import { RandomPokemon } from './_components'

const HeroBanner = () => (
  <section className="hero-banner isolate text-white">
    <Image
      src="/hero-background.webp"
      width={0}
      height={0}
      alt="banner"
      className="image"
      priority={true}
    />
    <div className="relative z-10 space-y-2 text-center">
      <h1 className="text-main-title/none text-center font-bold">Explore the world of Pokémon</h1>
      <div className="text-sm font-medium lg:text-xl">
        Get all sorts of information about your favourite Pokémon!
      </div>
    </div>
  </section>
)

const RandomPokemonSection = () => (
  <section className="mx-4 max-w-(--breakpoint-xl) pb-4 md:mx-8 xl:mx-auto xl:px-8">
    <RandomPokemon />
  </section>
)

const WelcomePage = () => {
  return (
    <>
      <HeroBanner />
      <RandomPokemonSection />
    </>
  )
}

export default WelcomePage
