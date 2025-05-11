import React from 'react'
import { NextPage } from 'next'

interface GameNamePageProps {
  params: {
    gameName: string
  }
}

const GamePage: NextPage<GameNamePageProps> = ({ params: { gameName } }) => {
  return <div>GamePage - {gameName} </div>
}

export default GamePage
