import { FC } from 'react'

interface MappingInteface {
  [key: number]: {
    icon: string
    colour: string
  }
}

const effectivenessMapping: MappingInteface = {
  1: { icon: '', colour: 'transparent' },
  2: { icon: '2', colour: 'lime-600' },
  1.5: { icon: '1½', colour: 'lime-600' },
  4: { icon: '4', colour: 'lime-500' },
  5: { icon: '5', colour: 'lime-500' },
  0.5: { icon: '½', colour: 'red-800' },
  0.25: { icon: '¼', colour: 'red-900' },
  0: { icon: '0', colour: 'black' },
}

interface BoxProps {
  multiplier: number
  className?: string
}

export const TypeMultiplierBox: FC<BoxProps> = ({ multiplier, className }) => {
  const { icon, colour: multiplierColour } = effectivenessMapping[multiplier]
  // Provide a distinct background colours for each effectiveness value
  const backgroundColourMultiplier = `bg-${multiplierColour}`

  return (
    <div
      className={`${backgroundColourMultiplier} ${className} flex h-[37px] w-[37px] items-center justify-center border border-gray-100 text-center text-yellow-300 hover:cursor-default dark:border-table-border`}
    >
      {icon}
    </div>
  )
}
