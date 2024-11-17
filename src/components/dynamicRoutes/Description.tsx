import { FC, Fragment } from 'react'

import { SectionTitle } from '@/components/containers'

import { EffectTable } from './EffectTable'

interface EffectProps {
  entry: string
  chance?: string | number
  title?: string
}

export const Description: FC<EffectProps> = ({ entry, chance, title = 'Effect' }) => {
  // The chance props is for move effects.
  const updatedEntry = chance ? entry.replace('$effect_chance', `${chance}`) : entry
  const paragraphs = updatedEntry.split('\n').filter(paragraph => paragraph !== '')

  // There are entries which are intended to be displayed in the form of a table.
  // This is parsed in the EffectTable component.
  const isTableRequired = updatedEntry.includes('--:')

  return (
    <>
      <SectionTitle>{title}</SectionTitle>
      {isTableRequired ? (
        <EffectTable entry={updatedEntry} />
      ) : (
        <div className="space-y-4">
          {paragraphs.map((paragraph, index) => (
            <p key={paragraph + index}>
              {/* Capitalse the first letter of each paragraph. */}
              {paragraph.charAt(0).toUpperCase() + paragraph.slice(1)}
            </p>
          ))}
        </div>
      )}
    </>
  )
}
