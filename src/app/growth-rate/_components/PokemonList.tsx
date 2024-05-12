'use client'

import React, { FC, useState } from 'react'
import classNames from 'classnames'
import { RxCaretDown } from 'react-icons/rx'

import Accordion from '@/components/accordion'
import BlueLink from '@/components/link'
import formatName from '@/utils/formatName'

interface ListProps {
  pokemonNames: Array<string>
}

const PokemonList: FC<ListProps> = ({ pokemonNames }) => {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => setIsOpen(!isOpen)

  return (
    <>
      <div
        className="mt-4 flex cursor-pointer items-center gap-x-2 border-b border-b-gray-500 px-2 py-4"
        onClick={toggleMenu}
      >
        <RxCaretDown className={classNames('size-6 duration-300', { 'rotate-180': isOpen })} />
        <span className="text-xl font-bold">List of Pokémon</span>
      </div>
      <Accordion visible={isOpen}>
        <div className="grid-cols-pokemon-list mt-4 grid gap-x-4">
          {pokemonNames.map(name => (
            <span key={name}>
              <BlueLink href={`/pokedex/${name}`}>{formatName(name)}</BlueLink>
            </span>
          ))}
        </div>
      </Accordion>
    </>
  )
}

export default PokemonList
