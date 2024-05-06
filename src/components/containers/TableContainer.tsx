import { FC, ReactNode } from 'react'

interface TableProps {
  children: ReactNode
  className?: string
}

export const TableContainer: FC<TableProps> = ({ children, className }) => {
  return (
    <div className={`overflow-x-auto overflow-y-hidden ${className ? className : ''}`}>
      <table className="table min-w-full border-b border-gray-200 dark:border-table-border">
        {children}
      </table>
    </div>
  )
}
