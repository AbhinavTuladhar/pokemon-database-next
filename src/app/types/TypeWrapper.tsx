import { dehydrate, QueryClient, HydrationBoundary } from '@tanstack/react-query'
import fetchData from '@/services/fetchData'
import TypesList from './TypesList'
import { TypesApi } from '@/services/TypesApi'

export default async function TypeWrapper() {
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery({
    queryKey: ['types-list'],
    queryFn: () => TypesApi.getAll(),
  })

  const dehydratedState = dehydrate(queryClient)
  return (
    <HydrationBoundary state={dehydratedState}>
      <TypesList />
    </HydrationBoundary>
  )
}
