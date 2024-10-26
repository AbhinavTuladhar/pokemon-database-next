'use client'

import { useEffect } from 'react'
import { useParams } from 'next/navigation'

import ErrorContainer from '@/components/error-handling'

export default function ErrorPage({ error }: Readonly<{ error: Error & { digest?: string } }>) {
  const params = useParams<{ areaName: string }>()
  const areaName = params.areaName

  const pageUrl = `/location/${areaName}`

  useEffect(() => {
    console.error(error)
  }, [error])

  return <ErrorContainer pageUrl={pageUrl} param={areaName} resourceType="location" />
}
