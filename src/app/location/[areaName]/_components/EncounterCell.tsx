import { FC, ReactNode } from 'react'

interface EncounterCellProps {
  children: ReactNode
}

const EncounterCell: FC<EncounterCellProps> = ({ children }) => {
  return (
    <td className="table-cell h-14 whitespace-nowrap border-t border-slate-200 px-4 py-0 text-center align-middle">
      {children}
    </td>
  )
}

export default EncounterCell
