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
  4: { icon: '4', colour: 'lime-500' },
  0.5: { icon: '½', colour: 'red-800' },
  0.25: { icon: '¼', colour: 'red-900' },
  0: { icon: '0', colour: 'black' },
}

interface BoxProps {
  multiplier: number
  className?: string
}

const TypeMultiplierBox: FC<BoxProps> = ({ multiplier, className }) => {
  const { icon, colour: multiplierColour } = effectivenessMapping[multiplier]
  // Provide a distinct background colours for each effectiveness value
  const backgroundColourMultiplier = `bg-${multiplierColour}`

  return (
    <div
      className={`${backgroundColourMultiplier} ${className} mt-1 flex h-9 w-9 items-center justify-center rounded border border-slate-700 px-1 text-center`}
    >
      {icon}
    </div>
  )
}

export default TypeMultiplierBox
