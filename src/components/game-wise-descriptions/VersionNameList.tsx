import React, { FC } from 'react'

import { versionNameBreakMap } from '@/data/gameNameMap'
import { gameToColourAndNameMap } from '@/data/gameNameToColourMap'

interface GameNameProps {
  gameName: string
  colour: string
}

const GameName: FC<GameNameProps> = ({ gameName, colour }) => (
  <span className={colour}>{gameName}</span>
)

interface GameNameRowProps {
  names: string[]
}

const GameNameRow: FC<GameNameRowProps> = ({ names }) => (
  <>
    {names.map((name, index) => {
      const { colour, properName } = gameToColourAndNameMap[name]
      const isLast = index === names.length - 1
      return (
        <React.Fragment key={index}>
          <GameName gameName={properName} colour={colour} />
          {!isLast && ' / '}
        </React.Fragment>
      )
    })}
  </>
)

interface VersionNameListProps {
  versionNames: string[]
}

const VersionNameList: FC<VersionNameListProps> = ({ versionNames }) => (
  <ul>
    {versionNames.map((version, index) => {
      const gameList = versionNameBreakMap[version]
      return (
        <li key={index}>
          <GameNameRow names={gameList} />
        </li>
      )
    })}
  </ul>
)

export default VersionNameList
