import { FC } from 'react'

import { SectionTitle } from '@/components/containers'
import buildMoveTargetData from '@/utils/buildMoveTargetData'

interface TargetBoxProps {
  text: string
  flag: string
  targeted: boolean
}

const PokemonTargetBox: FC<TargetBoxProps> = ({ text, flag, targeted }) => {
  let backgroundStyle
  let targetedStyle
  if (flag === 'ally') {
    backgroundStyle = 'bg-cyan-400 '
  } else {
    backgroundStyle = 'bg-orange-400'
  }

  if (targeted) {
    targetedStyle = 'border-green-700 border-4 text-white'
  } else {
    targetedStyle = 'text-black'
  }

  return (
    <div
      className={`flex h-14 w-24 flex-row items-center justify-center rounded-[20px_/_44px] ${backgroundStyle} ${targetedStyle}`}
    >
      {text}
    </div>
  )
}

interface TargetProps {
  targetType: string
  moveName: string
}

export const MoveTarget: FC<TargetProps> = ({ targetType, moveName }) => {
  const targetInformation = buildMoveTargetData(targetType, moveName)

  const { allyInformation, description, foeInformation } = targetInformation

  return (
    <>
      <SectionTitle>Move Targets</SectionTitle>
      <>
        <div className="mx-6 flex flex-col items-center gap-y-2">
          <div className="flex flex-row gap-x-2">
            {foeInformation.map((box, index) => (
              <PokemonTargetBox
                flag={box.flag}
                text={box.text}
                targeted={box.targeted}
                key={box.flag + index}
              />
            ))}
          </div>
          <div className="flex flex-row gap-x-2">
            {allyInformation.map((box, index) => (
              <PokemonTargetBox
                flag={box.flag}
                text={box.text}
                targeted={box.targeted}
                key={box.flag + index}
              />
            ))}
          </div>
        </div>
        <p className="mt-4 w-full text-center italic"> {description}</p>
      </>
    </>
  )
}
