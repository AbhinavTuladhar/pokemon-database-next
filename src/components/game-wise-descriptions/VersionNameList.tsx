import React, { FC } from 'react'

import { newGameNameMap } from '@/data/gameNameMap'

interface ListProps {
  versionNames: Array<string>
}

interface NameProps {
  gameName: string
  colour: string
  index: number
  listLength: number
}

const GameName: FC<NameProps> = ({ gameName, colour, index, listLength }) => {
  return (
    <>
      <span className={colour}>{gameName}</span>
      {index !== listLength - 1 && ' / '}
    </>
  )
}

const VersionNameList: FC<ListProps> = ({ versionNames }) => {
  return versionNames.map((version, index) => {
    const gameList = newGameNameMap[version]
    return <li className="list-none" key={version}></li>
  })
}

export default VersionNameList
