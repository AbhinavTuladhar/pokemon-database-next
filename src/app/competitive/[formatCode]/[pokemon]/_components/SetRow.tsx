import { FC } from 'react'

interface SetRowProps {
  header: string
  value: string | string[]
}

const SetRow: FC<SetRowProps> = ({ header, value }) => (
  <tr>
    <th className="w-[1%] text-right font-normal text-nowrap"> {header}: </th>
    <td className="pl-2">{typeof value === 'string' ? value : value.join('/')}</td>
  </tr>
)

export default SetRow
