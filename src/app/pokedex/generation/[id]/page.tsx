import { FC, Fragment } from 'react'
import generationData from '@/data/generationData'
import PokeCardContainer from '@/components/containers/PokeCardContainer'
import fetchMultipleData from '@/services/fetchMultipleData'
import { PokemonApi } from '@/services/PokemonApi'
import { Pokemon } from '@/types'
import PokemonExtractor from '@/extractors/PokemonExtractor'
import PokeCard from '@/components/PokeCard'
import trimUrl from '@/utils/trimUrl'

const getPokemonData = async (offset: number, limit: number) => {
  // We first need to find the urls of all the pokemon in that generation.
  const generationResponse = await PokemonApi.getByGeneration(offset, limit)

  const urlList = generationResponse.results.map((pokemon) => {
    const { name, url } = pokemon
    // We need to not use the complete url, hence the offset is used.
    // For the pokemon names, we use the actual name instead of the id number.
    const replacedUrl = url.replace(/\/pokemon\/\d+\//, `/pokemon/${name}/`)
    return trimUrl(replacedUrl)
  })

  const data = await fetchMultipleData<Pokemon>(urlList)

  // Format the JSON
  const extractedData = data.map(PokemonExtractor)

  return extractedData
}

interface PageProps {
  params: {
    id: string
  }
}

const PokemonList: FC<PageProps> = async ({ params: { id } }) => {
  const generationNumber = parseInt(id)
  // Getting the corresponding object from external file
  const routeData = generationData[generationNumber - 1]
  const { limit, offset } = routeData

  const data = await getPokemonData(offset, limit)

  return (
    <main>
      <h1 className="my-4 text-center text-4xl font-bold">
        Pokemon of generation {generationNumber}
      </h1>
      <div>
        <PokeCardContainer>
          {data.map((pokemon) => {
            const { id, name, types, front_default: defaultSprite = '' } = pokemon
            return (
              <Fragment key={id}>
                <PokeCard id={id} name={name} types={types} defaultSprite={defaultSprite} />
              </Fragment>
            )
          })}
        </PokeCardContainer>
      </div>
    </main>
  )
}

export default PokemonList
