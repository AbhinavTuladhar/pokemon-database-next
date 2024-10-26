import { BsGearFill } from 'react-icons/bs'
import { FaDatabase } from 'react-icons/fa'
import { MdOutlineCatchingPokemon } from 'react-icons/md'

import SearchBar from '@/components/searchbar'
import { mechanicsLinks, pokedexLinks, pokemonDataLinks } from '@/data/navbarLinks'

import DarkModeSwitch from '../dark-mode'

import TopLevelMenu from './top-level-menu'

const Navbar = () => {
  const iconClassName = 'w-5 h-5'

  return (
    <nav className="relative z-50 -mt-7 bg-gradient-to-b from-gray-700 to-gray-800 dark:from-blue-900 dark:to-slate-900 md:static md:rounded">
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
