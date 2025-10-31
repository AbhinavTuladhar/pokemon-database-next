import React from 'react'

import { TransitionLink } from '@/components/ui/Link'
import { PageTitle, SectionTitle } from '@/components/ui/Title'
import { smogonFormats } from '@/features/battle/data/smogon.data'

const GenerationColumn = ({ generation }: { generation: number }) => (
  <section>
    <SectionTitle> Generation {generation} </SectionTitle>
    <ul className="list-inside list-disc">
      {smogonFormats.map(format => (
        <li key={format}>
          <TransitionLink href={`/competitive/gen${generation}${format.toLowerCase()}`}>
            Gen {generation} {format}
          </TransitionLink>
        </li>
      ))}
    </ul>
  </section>
)

const Page = () => {
  const generations = Array.from({ length: 7 }, (_, i) => i + 1)

  return (
    <>
      <PageTitle> Competitive Pokémon Sets </PageTitle>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
        {generations.map(gen => (
          <GenerationColumn key={gen} generation={gen} />
        ))}
      </div>
    </>
  )
}

export default Page
