import { FC, ReactNode } from 'react'

interface TableProps {
  children: ReactNode
}

const TableContainer: FC<TableProps> = ({ children }) => {
  return (
    <div className="overflow-x-auto overflow-y-hidden">
      <div className="table min-w-full border-none border-transparent">{children}</div>
    </div>
  )
}

export default TableContainer
