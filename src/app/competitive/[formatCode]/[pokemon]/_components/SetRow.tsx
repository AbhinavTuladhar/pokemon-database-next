import { FC } from 'react'

interface SetRowProps {
  header: string
  value: string | string[]
}

const SetRow: FC<SetRowProps> = ({ header, value }) => (
  <div className="flex gap-x-4">
    <span> {header}: </span>
    <span>{typeof value === 'string' ? value : value.join('/')}</span>
  </div>
)

export default SetRow
