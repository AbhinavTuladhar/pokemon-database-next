import { FC } from 'react'

interface SummaryCardProps {
  number: number
  text: string
}

export const TypeSummaryCard: FC<SummaryCardProps> = ({ number, text }) => {
  return (
    <div className="flex w-fit flex-col items-center justify-center text-center">
      <span className="text-2xl font-bold">{number}</span>
      <span className="text-sm"> {text} </span>
    </div>
  )
}
