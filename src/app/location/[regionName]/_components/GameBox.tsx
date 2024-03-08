import { FC } from 'react'
import classNames from 'classNames'

interface IconColourMap {
  icon: string
  backgroundColour: string
}

const gameMapping: Record<string, IconColourMap> = {
  red: { icon: 'R', backgroundColour: 'bg-red-500' },
  blue: { icon: 'B', backgroundColour: 'bg-blue-500' },
  yellow: { icon: 'Y', backgroundColour: 'bg-yellow-500' },

  gold: { icon: 'G', backgroundColour: 'bg-amber-400' },
  crystal: { icon: 'C', backgroundColour: 'bg-indigo-400' },
  silver: { icon: 'S', backgroundColour: 'bg-cyan-200' },

  sapphire: { icon: 'S', backgroundColour: 'bg-blue-500' },
  ruby: { icon: 'R', backgroundColour: 'bg-red-500' },
  emerald: { icon: 'E', backgroundColour: 'bg-green-500' },
  leafgreen: { icon: 'LG', backgroundColour: 'bg-green-400' },
  firered: { icon: 'FR', backgroundColour: 'bg-red-500' },

  diamond: { icon: 'D', backgroundColour: 'bg-indigo-300' },
  pearl: { icon: 'P', backgroundColour: 'bg-red-300' },
  platinum: { icon: 'Pt', backgroundColour: 'bg-indigo-200' },
  heartgold: { icon: 'HG', backgroundColour: 'bg-amber-400' },
  soulsilver: { icon: 'SS', backgroundColour: 'bg-indigo-300' },

  black: { icon: 'B', backgroundColour: 'bg-gray-900' },
  white: { icon: 'W', backgroundColour: 'bg-gray-400' },
  'black-2': { icon: 'B2', backgroundColour: 'bg-gray-900' },
  'white-2': { icon: 'W2', backgroundColour: 'bg-gray-400' },

  x: { icon: 'X', backgroundColour: 'bg-blue-500' },
  y: { icon: 'Y', backgroundColour: 'bg-red-500' },
  'omega-ruby': { icon: 'OR', backgroundColour: 'bg-red-500' },
  'alpha-sapphire': { icon: 'AS', backgroundColour: 'bg-blue-500' },
}

interface GameBoxProps {
  gameName: string
  activeFlag: boolean
}

const GameBox: FC<GameBoxProps> = ({ gameName, activeFlag }) => {
  const { icon, backgroundColour } = gameMapping[gameName]

  const activeClassName = `${backgroundColour} text-gray-500`

  return (
    <div
      className={classNames(
        'flex h-14 w-14 items-center justify-center border border-slate-200 text-lg font-bold',
        { activeClassName: activeFlag },
      )}
    >
      {icon}
    </div>
  )
}

export default GameBox
