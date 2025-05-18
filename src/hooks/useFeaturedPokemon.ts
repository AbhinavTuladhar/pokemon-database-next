import { useEffect, useState } from 'react'

import { generationData } from '@/features/games/data/pokedex.data'
import PokemonService from '@/features/pokemon/services/pokemon.service'
import { transformPokemon } from '@/features/pokemon/transformers/transform-pokemon'
import { TransformedPokemon } from '@/types'

const useFeaturedPokemon = () => {
  const [pokemonData, setPokemonData] = useState<TransformedPokemon[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<any>(null)

  const getRandomNumber = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1) + min)
  }

  useEffect(() => {
    // Check if data exists in the session storage
    const sessionData = sessionStorage.getItem('pokemonData')
    if (sessionData) {
      setPokemonData(JSON.parse(sessionData))
      return
    }

    const getRandomPokemonData = async () => {
      // Generate four random numbers between 1 and 809 for the Pokemon ids, one for each generation.
      const generationIds = generationData.map(generation => {
        const { limit, offset } = generation
        const lowerLimit = offset
        const upperLimit = offset + limit
        return getRandomNumber(lowerLimit, upperLimit)
      })
      const responses = await PokemonService.getByIds(generationIds)
      const extractedData = responses.map(transformPokemon)
      setPokemonData(extractedData)
      sessionStorage.setItem('pokemonData', JSON.stringify(extractedData))
    }

    try {
      setIsLoading(true)
      getRandomPokemonData()
    } catch (error) {
      setError(error)
    } finally {
      setIsLoading(false)
    }
  }, [])

  return { pokemonData, isLoading, error }
}

export default useFeaturedPokemon
