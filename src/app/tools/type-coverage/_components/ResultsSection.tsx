import { FC } from 'react'

import { TypeCard } from '@/features/pokemon/components/TypeCard'

interface SectionProps {
  title: string
  combinations: string[][]
}

const ResultsSection: FC<SectionProps> = ({ title, combinations }) => (
  <div>
    <h3 className="mb-6 text-2xl font-bold">{title}</h3>
    {combinations.length > 0 ? (
      <ul className="grid grid-cols-[repeat(auto-fill,minmax(min(9.375rem,100%),1fr))] gap-x-6 gap-y-12">
        {combinations.map((combo, index) => (
          <li key={index}>
            <ul className="flex justify-center gap-x-2">
              {combo.map((type, index) => (
                <span key={index}>
                  <TypeCard typeName={type} key={type} isLink={false} />
                </span>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    ) : (
      <div>No results.</div>
    )}
  </div>
)

export default ResultsSection
