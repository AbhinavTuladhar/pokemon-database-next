import React, { FC, ReactNode } from 'react'

interface RowProps {
  rowHeader: string
  imageChildren?: Array<ReactNode>
}

export const SpriteTableRow: FC<RowProps> = ({ imageChildren, rowHeader }) => {
  // Split the row header into different rows using a comma separator
  const rowHeaders = rowHeader.split(', ')

  return (
    <tr>
      <td className="table-cell w-36 border border-table-border p-2 text-left font-bold">
        <div>
          {rowHeaders.map((header, index) => (
            <div className="text-center" key={index}>
              {header}
            </div>
          ))}
        </div>
      </td>
      {imageChildren}
    </tr>
  )
}
