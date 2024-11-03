import { FC } from 'react'

interface IconColourMap {
  icon: string
  styles: string
}

const gameMapping: Record<string, IconColourMap> = {
  'red': { icon: 'R', styles: 'bg-red-500' },
  'blue': { icon: 'B', styles: 'bg-blue-500' },
  'yellow': { icon: 'Y', styles: 'bg-yellow-500' },

  'gold': { icon: 'G', styles: 'bg-amber-400' },
  'crystal': { icon: 'C', styles: 'bg-indigo-400' },
  'silver': { icon: 'S', styles: 'bg-cyan-200' },

  'sapphire': { icon: 'S', styles: 'bg-blue-500' },
  'ruby': { icon: 'R', styles: 'bg-red-500' },
  'emerald': { icon: 'E', styles: 'bg-green-500' },
  'leafgreen': { icon: 'LG', styles: 'bg-green-400' },
  'firered': { icon: 'FR', styles: 'bg-red-500' },

  'diamond': { icon: 'D', styles: 'bg-indigo-300' },
  'pearl': { icon: 'P', styles: 'bg-red-300' },
  'platinum': { icon: 'Pt', styles: 'bg-indigo-200' },
  'heartgold': { icon: 'HG', styles: 'bg-amber-400' },
  'soulsilver': { icon: 'SS', styles: 'bg-indigo-300' },

  'black': { icon: 'B', styles: 'bg-gray-900' },
  'white': { icon: 'W', styles: 'bg-gray-400 !text-black' },
  'black-2': { icon: 'B2', styles: 'bg-gray-900' },
  'white-2': { icon: 'W2', styles: 'bg-gray-400 !text-black' },

  'x': { icon: 'X', styles: 'bg-blue-500' },
  'y': { icon: 'Y', styles: 'bg-red-500' },
  'omega-ruby': { icon: 'OR', styles: 'bg-red-500' },
  'alpha-sapphire': { icon: 'AS', styles: 'bg-blue-500' },

  'sun': { icon: 'S', styles: 'bg-orange-400' },
  'moon': { icon: 'M', styles: 'bg-blue-500' },
  'ultra-sun': { icon: 'US', styles: 'bg-orange-600' },
  'ultra-moon': { icon: 'UM', styles: 'bg-cyan-600' },
}

interface GameBoxProps {
  gameName: string
  activeFlag: boolean
}

export const GameBox: FC<GameBoxProps> = ({ gameName, activeFlag }) => {
  const { icon, styles } = gameMapping[gameName]

  const activeClassName = `${styles} text-white`

  return (
    <div
      className={`flex h-[67px] w-14 items-center justify-center border-x border-bd-light text-lg font-bold dark:border-bd-dark ${activeFlag ? activeClassName : 'text-gray-500'}`}
    >
      {icon}
    </div>
  )
}
