import React, { FC } from 'react'

import { TransitionLink } from '@/components/ui/Link'
import { versionToProperNameLong } from '@/features/games/data/game-name.data'

interface GenerationGamesSectionProps {
  generationString: string
  versionGroups: Array<string>
}

/**
 * To show the generation in the header, and the version groups in the main body.
 */
const GenerationGamesSection: FC<GenerationGamesSectionProps> = ({
  generationString,
  versionGroups,
}) => {
  return (
    <section className="border-bd-light dark:border-bd-dark mx-auto w-full max-w-2xl border *:px-4">
      <div className="border-b-bd-light dark:border-b-bd-dark dark:bg-hdr-dark border-b bg-neutral-200 py-3">
        <h2 className="text-3xl font-bold"> {generationString}</h2>
      </div>
      <ul className="flex list-inside list-disc flex-col gap-y-2 py-4">
        {versionGroups.map(versionGroup => (
          <li key={versionGroup}>
            <TransitionLink href={`/pokedex/game/${versionGroup}`}>
              {versionToProperNameLong[versionGroup]}
            </TransitionLink>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default GenerationGamesSection
