import React from 'react'
import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Pokémon move list | Pokémon Database',
}

const MoveList = async () => {
  const numbers = Array.from({ length: 7 }, (_, index) => index + 1)

  return (
    <div>
      {numbers.map(number => (
        <Link href={`/move/generation/${number}`} key={number}>
          Generation {number}
        </Link>
      ))}
    </div>
  )
}

export default MoveList
