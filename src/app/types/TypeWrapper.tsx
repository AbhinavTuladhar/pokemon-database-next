import { dehydrate, QueryClient, HydrationBoundary } from '@tanstack/react-query'
import Hydrate from '../Hydrate'
import TypesList from './TypesList'

export default async function TypeWrapper() {
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery({
    queryKey: ['types-list'],
    queryFn: async () => {
      const response = await fetch('https://pokeapi.co/api/v2/type')
      const data = await response.json()
      return data
    },
  })

  const dehydratedState = dehydrate(queryClient)
  return (
    <HydrationBoundary state={dehydratedState}>
      <TypesList />
    </HydrationBoundary>
  )
}
