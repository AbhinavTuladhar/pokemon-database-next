import { BsGearFill } from 'react-icons/bs'
import { FaDatabase } from 'react-icons/fa'
import { MdOutlineCatchingPokemon } from 'react-icons/md'

import SearchbarWrapper from '../searchbar/SearchbarWrapper'

import TopLevelMenu from './TopLevelMenu'

const NavBar = () => {
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
    { path: '/sprites/animated', name: 'Animated sprites' },
  ]

  const mechanicsLinks = [
    { path: '/berry', name: 'Berries' },
    { path: '/nature', name: 'Natures' },
    { path: '/type', name: 'Types' },
    { path: '/egg-group', name: 'Egg groups' },
    { path: '/location', name: 'Locations' },
  ]
  const iconClassName = 'w-5 h-5'

  return (
    <nav className="relative z-50 -mt-6 rounded-lg bg-blue-950 md:static">
      <ul className="flex list-none flex-wrap">
        <TopLevelMenu
          menuData={pokedexLinks}
          parentText="Pokédex"
          icon={<MdOutlineCatchingPokemon className={iconClassName} />}
        />
        <TopLevelMenu
          menuData={pokemonDataLinks}
          parentText="Pokémon data"
          icon={<FaDatabase className={iconClassName} />}
        />
        <TopLevelMenu
          menuData={mechanicsLinks}
          parentText="Game Mechanics"
          icon={<BsGearFill className={iconClassName} />}
        />
        <li className="w-full min-w-48 p-2 min-[800px]:w-auto">
          <SearchbarWrapper />
        </li>
      </ul>
    </nav>
  )
}

export default NavBar
