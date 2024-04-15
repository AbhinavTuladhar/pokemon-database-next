import { FC, ReactNode } from 'react'

interface TableProps {
  children: ReactNode
  className?: string
}

const TableContainer: FC<TableProps> = ({ children, className }) => {
  return (
    <div className={`overflow-x-auto overflow-y-hidden ${className ? className : ''}`}>
      <table className="border-table-border table min-w-full border-b">{children}</table>
    </div>
  )
}

export default TableContainer
