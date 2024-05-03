import { FC } from 'react'

import { SectionTitle } from '@/components/containers'

interface EffectProps {
  entry: string
  chance?: string | number
  title?: string
}

export const Description: FC<EffectProps> = ({ entry, chance, title = 'Effect' }) => {
  // The chance props is for move effects.
  const updatedEntry = chance ? entry.replace('$effect_chance', `${chance}`) : entry
  const paragraphs = updatedEntry.split('\n')
  return (
    <>
      <SectionTitle>{title}</SectionTitle>
      {paragraphs.map((paragraph, index) => (
        <div key={index}>
          {/* Capitalse the first letter of each paragraph. */}
          {paragraph.charAt(0).toUpperCase() + paragraph.slice(1)}
          {index !== paragraphs?.length - 1 && <br />}
        </div>
      ))}
    </>
  )
}
