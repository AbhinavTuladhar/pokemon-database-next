'use server'

import fetchData from '@/services/fetchData'
import fetchMultipleData from '@/services/fetchMultipleData'
import { NamedApiResourceList, Pokemon } from '@/types'
import trimUrl from '@/utils/trimUrl'

export async function getPokemonByGeneration(offset: number, limit: number) {
  const response = await fetchData<NamedApiResourceList<Pokemon>>(
    `/pokemon?offset=${offset}&limit=${limit}`,
  )
  return response
}

export async function getPokemonByName(name: string) {
  const response = await fetchData<Pokemon>(`/pokemon/${name}`)
  return response
}

export async function getPokemonByUrls(urls: Array<string>) {
  const trimmedUrls = urls.map(trimUrl)
  const response = await fetchMultipleData<Pokemon>(trimmedUrls)
  return response
}
