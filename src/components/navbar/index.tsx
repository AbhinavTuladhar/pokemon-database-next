import { BsGearFill } from 'react-icons/bs'
import { FaDatabase } from 'react-icons/fa'
import { MdOutlineCatchingPokemon } from 'react-icons/md'

import SearchBar from '@/components/searchbar'

import DarkModeSwitch from '../dark-mode'

import TopLevelMenu from './top-level-menu'

const Navbar = () => {
  const pokedexLinks = [
    { path: '/pokedex/generation/1', name: 'Gen 1 (Kanto)' },
    { path: '/pokedex/generation/2', name: 'Gen 2 (Johto)' },
    { path: '/pokedex/generation/3', name: 'Gen 3 (Hoenn)' },
    { path: '/pokedex/generation/4', name: 'Gen 4 (Sinnoh)' },
    { path: '/pokedex/generation/5', name: 'Gen 5 (Unova)' },
    { path: '/pokedex/generation/6', name: 'Gen 6 (Kalos)' },
    { path: '/pokedex/generation/7', name: 'Gen 7 (Alola)' },
  ]

  const pokemonDataLinks = [
    { path: '/move', name: 'Moves' },
    { path: '/ability', name: 'Abilities' },
    { path: '/item', name: 'Items' },
    { path: '/sprites', name: 'Sprite gallery' },
    { path: '/sprites/animated', name: 'Animated sprites' },
    { path: '/location', name: 'Locations' },
  ]

  const mechanicsLinks = [
    { path: '/berry', name: 'Berries' },
    { path: '/nature', name: 'Natures' },
    { path: '/type', name: 'Types' },
    { path: '/dual-type-chart', name: 'Dual type charts' },
    { path: '/egg-group', name: 'Egg groups' },
    { path: '/growth-rate', name: 'Growth rates' },
  ]
  const iconClassName = 'w-5 h-5'

  return (
    <nav className="relative z-50 -mt-7 rounded-lg bg-gradient-to-b from-gray-700 to-gray-800 dark:from-blue-950 dark:to-slate-900 md:static">
      <ul className="grid list-none grid-cols-3 md:grid-cols-4">
        <TopLevelMenu
          menuData={pokedexLinks}
          mobileText="Pokédex"
          icon={<MdOutlineCatchingPokemon className={`${iconClassName} rotate-180`} />}
        />
        <TopLevelMenu
          menuData={pokemonDataLinks}
          mobileText="Data"
          desktopText="Pokémon data"
          icon={<FaDatabase className={iconClassName} />}
        />
        <TopLevelMenu
          menuData={mechanicsLinks}
          mobileText="Mechanics"
          desktopText="Game Mechanics"
          icon={<BsGearFill className={iconClassName} />}
        />
        <li className="col-span-3 flex min-w-48 items-center gap-x-2 px-2 pb-2 md:col-span-1 md:py-2 ">
          <div className="flex-1">
            <SearchBar />
          </div>
          <DarkModeSwitch />
        </li>
      </ul>
    </nav>
  )
}

export default Navbar
