import { FC, ReactNode } from 'react'

interface TableProps {
  children: ReactNode
  className?: string
  useFullWidth?: boolean
}

export const TableContainer: FC<TableProps> = ({ children, className, useFullWidth = true }) => {
  const innerTable = (
    <div className={`overflow-x-auto overflow-y-hidden ${className ? className : ''}`}>
      <table className="border-bd-light dark:border-bd-dark table min-w-full border-b">
        {children}
      </table>
    </div>
  )

  if (useFullWidth) {
    return innerTable
  }

  return <div className="flex justify-center">{innerTable}</div>
}
