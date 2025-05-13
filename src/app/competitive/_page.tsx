import React from 'react'

import { PageTitle, SectionTitle } from '@/components/containers'
import { BlueLink } from '@/components/ui/Link'
import { smogonFormats } from '@/data/smogonFormats'

const GenerationColumn = ({ generation }: { generation: number }) => (
  <section>
    <SectionTitle> Generation {generation} </SectionTitle>
    <ul className="list-inside list-disc">
      {smogonFormats.map(format => (
        <li key={format}>
          <BlueLink href={`/competitive/gen${generation}${format.toLowerCase()}`}>
            Gen {generation} {format}
          </BlueLink>
        </li>
      ))}
    </ul>
  </section>
)

const Page = () => {
  const generations = Array.from({ length: 7 }, (_, i) => i + 1)

  return (
    <main>
      <PageTitle> Competitive Pokémon Sets </PageTitle>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
        {generations.map(gen => (
          <GenerationColumn key={gen} generation={gen} />
        ))}
      </div>
    </main>
  )
}

export default Page
