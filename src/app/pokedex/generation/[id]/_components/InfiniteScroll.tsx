'use client'

import { FC, useEffect, useState } from 'react'
import InifiniteScrollComponent from 'react-infinite-scroll-component'

import { getPokemonByUrls } from '@/actions/fetchPokemon'
import PokeCard from '@/components/PokeCard'
import PokeCardSkeleton from '@/components/Suspense/PokeCardSkeleton'
import PokemonExtractor from '@/extractors/PokemonExtractor'
import { TransformedPokemon } from '@/types'

import PokeCardContainer from './PokeCardContainer'

interface ScrollProps {
  increment: number
  urlList: Array<string>
}

const InfiniteScroll: FC<ScrollProps> = ({ increment, urlList }) => {
  const [offset, setOffset] = useState(increment)
  const [pokemon, setPokemon] = useState<TransformedPokemon[]>([])
  const [hasMore, setHasMore] = useState(true)

  useEffect(() => {
    const setInitialData = async () => {
      const response = await getPokemonByUrls(urlList.slice(0, increment))
      const extractedResponse = response.map(PokemonExtractor)
      setPokemon(extractedResponse)
    }
    setInitialData()
  }, [increment, urlList])

  const fetchMore = async () => {
    const responses = await getPokemonByUrls(urlList.slice(offset, offset + increment))
    setPokemon(prevPokemon => {
      const extractedPokemon = responses.map(PokemonExtractor)
      return [...prevPokemon, ...extractedPokemon]
    })
    responses.length > 0 ? setHasMore(true) : setHasMore(false)
    setOffset(prevOffset => prevOffset + increment)
  }
  return (
    <div className="mb-8 mt-4">
      <InifiniteScrollComponent
        className="h-full overflow-hidden py-4"
        dataLength={pokemon.length}
        next={fetchMore}
        hasMore={hasMore}
        loader={
          <PokeCardContainer>
            <PokeCardSkeleton cardCount={10} />
          </PokeCardContainer>
        }
      >
        <PokeCardContainer>
          {pokemon.map(pokemon => {
            const { id, name, types, front_default: defaultSprite } = pokemon
            return (
              <PokeCard key={id} id={id} name={name} types={types} defaultSprite={defaultSprite} />
            )
          })}
        </PokeCardContainer>
      </InifiniteScrollComponent>
    </div>
  )
}

export default InfiniteScroll
