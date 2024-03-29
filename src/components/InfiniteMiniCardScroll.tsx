'use client'

import { FC, useState } from 'react'
import InifiniteScrollComponent from 'react-infinite-scroll-component'

import { getPokemonByUrls } from '@/actions/fetchPokemon'
import PokemonExtractor from '@/extractors/PokemonExtractor'
import { TransformedPokemon } from '@/types'

import MiniCardListSkeleton from './Suspense/MiniCardListSkeleton'
import MiniPokeCard from './MiniPokeCard'

interface ScrollProps {
  increment: number
  urlList: Array<string>
}

const InfiniteMiniCardScroll: FC<ScrollProps> = ({ increment, urlList }) => {
  const [offset, setOffset] = useState(0)
  const [pokemonData, setPokemonData] = useState<TransformedPokemon[]>([])
  const [hasMore, setHasMore] = useState(true)

  const fetchMorePokemon = async () => {
    const responses = await getPokemonByUrls(urlList.slice(offset, offset + increment))
    setPokemonData((prevPokemon) => {
      const extractedData = responses.map(PokemonExtractor)
      return [...prevPokemon, ...extractedData]
    })
    responses.length > 0 ? setHasMore(true) : setHasMore(false)
    setOffset((prevOffset) => prevOffset + increment)
  }

  return (
    <div>
      <InifiniteScrollComponent
        className="h-full overflow-hidden"
        dataLength={pokemonData.length}
        next={fetchMorePokemon}
        hasMore={hasMore}
        loader={<MiniCardListSkeleton pokemonCount={20} />}
      >
        <div className="grid grid-cols-card-list gap-x-3 gap-y-8">
          {pokemonData.map((pokemon, index) => {
            const { id, name, nationalNumber, types, gameSprite } = pokemon
            return (
              <MiniPokeCard
                gameSprite={gameSprite}
                id={id}
                name={name}
                nationalNumber={nationalNumber}
                types={types}
                key={index}
              />
            )
          })}
        </div>
      </InifiniteScrollComponent>
    </div>
  )
}

export default InfiniteMiniCardScroll
