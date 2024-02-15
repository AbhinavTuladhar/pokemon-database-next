import { dehydrate, QueryClient, HydrationBoundary } from '@tanstack/react-query'
import TypesList from './TypesList'
import { TypesApi } from '@/services/TypesApi'
import { getQueryClient } from '@/utils/getQueryClient'

export default async function TypeWrapper() {
  const queryClient = getQueryClient()

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
