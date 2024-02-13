import Image from 'next/image'
import Link from 'next/link'
import type { NamedApiResourceList } from '@/types'

const fetchData = async () => {
  const urls = [
    'https://pokeapi.co/api/v2/pokemon',
    'https://pokeapi.co/api/v2/pokemon?limit=5',
    'https://pokeapi.co/api/v2/pokemon?offset=200&limit=10',
  ]
  try {
    const responses = await Promise.all(urls.map((url) => fetch(url)))
    const data = await Promise.all(responses.map((response) => response.json()))
    return data
  } catch (error) {
    console.error('Error fetching data:', error)
    throw error
  }
}

export default async function Home() {
  const response = await fetchData()
  const list = response[0].results

  console.log(JSON.stringify(response, null, 2))

  return (
    <div className="flex flex-col gap-y-4">
      <Link href="/"> Home page</Link>
    </div>
  )
}
