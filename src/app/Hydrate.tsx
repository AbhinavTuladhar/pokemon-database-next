'use client'

import { HydrationBoundary } from '@tanstack/react-query'

export default function Hydrate(props: any) {
  return <HydrationBoundary {...props} />
}
