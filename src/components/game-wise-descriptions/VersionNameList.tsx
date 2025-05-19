import React, { FC } from 'react'

import { gameToUnformattedName, versionToArraySplit } from '@/features/games/data/game-name.data'
import { gameToColourAndName } from '@/features/games/data/game-name.data'

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
    {names
      .filter(name => name !== undefined)
      .map((name, index) => {
        const { colour, properName } = gameToColourAndName[name]
        const isLast = index === names.length - 1
        return (
          <React.Fragment key={name + index}>
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

const VersionNameList: FC<VersionNameListProps> = ({ versionNames }) => {
  return (
    <ul>
      {versionNames.map((version, index) => {
        const gameList = versionToArraySplit[version]
        // If gamelist is undefined, it means we're using individual game names.
        if (!gameList) {
          const formattedGameNames = [gameToUnformattedName[version]]
          return (
            <li key={version + index}>
              <GameNameRow names={formattedGameNames} />
            </li>
          )
        }
        return (
          <li key={version + index}>
            <GameNameRow names={gameList} />
          </li>
        )
      })}
    </ul>
  )
}

export default VersionNameList
