import { FC } from 'react'
import SectionTitle from '@/components/SectionTitle'

interface EffectProps {
  entry: string
}

const AbilityEffect: FC<EffectProps> = ({ entry }) => {
  const paragraphs = entry.split('\n')
  return (
    <>
      <SectionTitle>Effect</SectionTitle>
      {paragraphs?.map((paragraph, index) => (
        <div key={index}>
          {paragraph.charAt(0).toUpperCase() + paragraph.slice(1)}
          {index !== paragraphs?.length - 1 && <br />}
        </div>
      ))}
    </>
  )
}

export default AbilityEffect
