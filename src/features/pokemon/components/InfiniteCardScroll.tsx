'use client'

import { FC, useState } from 'react'
import InifiniteScrollComponent from 'react-infinite-scroll-component'

import { MiniCardListSkeleton } from '@/components/skeletons'
import PokemonService from '@/features/pokemon/services/pokemon.service'
import transformPokemon from '@/features/pokemon/transformers/transform-pokemon'
import { TransformedPokemon } from '@/types'

import { MiniPokeCard } from './PokeCard'

interface ScrollProps {
  increment: number
  nameList: Array<string>
}

export const InfiniteMiniCardScroll: FC<ScrollProps> = ({ increment, nameList }) => {
  const [offset, setOffset] = useState(0)
  const [pokemonData, setPokemonData] = useState<TransformedPokemon[]>([])
  const [hasMore, setHasMore] = useState(true)

  const fetchMorePokemon = async () => {
    const responses = await PokemonService.getByNames(nameList.slice(offset, offset + increment))
    setPokemonData(prevPokemon => {
      const extractedData = responses.map(transformPokemon)
      return [...prevPokemon, ...extractedData]
    })
    responses.length > 0 ? setHasMore(true) : setHasMore(false)
    setOffset(prevOffset => prevOffset + increment)
  }

  return (
    <div>
      <InifiniteScrollComponent
        className="h-full overflow-hidden"
        dataLength={pokemonData.length}
        next={fetchMorePokemon}
        hasMore={hasMore}
        scrollThreshold="50vh"
        loader={
          <div className="mt-4">
            <MiniCardListSkeleton pokemonCount={20} />
          </div>
        }
      >
        <div className="grid-cols-card-list grid gap-x-3 gap-y-8">
          {pokemonData.map(pokemon => {
            const { id, name, nationalNumber, types, gameSprite } = pokemon
            return (
              <MiniPokeCard
                gameSprite={gameSprite}
                id={id}
                name={name}
                nationalNumber={nationalNumber}
                types={types}
                key={id}
              />
            )
          })}
        </div>
      </InifiniteScrollComponent>
    </div>
  )
}
