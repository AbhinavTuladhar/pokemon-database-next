import { FC } from 'react'
import TypeSummaryCard from '@/components/TypeSummaryCard'

interface SummaryRowProps {
  typeName: string
  pokemonCount: number
  moveCount: number
}

const TypeSummaryRow: FC<SummaryRowProps> = ({ typeName, moveCount, pokemonCount }) => {
  return (
    <div className="flex flex-row justify-center items-center gap-8 flex-wrap">
      <TypeSummaryCard number={pokemonCount} text={`${typeName} type Pokemon`} />
      <TypeSummaryCard number={moveCount} text={`${typeName} type moves`} />
    </div>
  )
}

export default TypeSummaryRow
