import { FC } from 'react'

interface Column {
  title: string
  count: number
}

interface Props {
  data: Column[]
}

const ToolsResultsSummary: FC<Props> = ({ data }) => (
  <ul className="mx-auto grid max-w-5xl grid-cols-4">
    {data.map(({ title, count }) => (
      <li key={title} className="flex flex-col items-center gap-1">
        <span className="text-xl font-bold">{count}</span>
        <span className="text-sm">{title}</span>
      </li>
    ))}
  </ul>
)

export default ToolsResultsSummary
