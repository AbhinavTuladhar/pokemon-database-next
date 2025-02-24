import React, { FC } from 'react'

import { ImageTile } from './ImageTile'
import { TableCellWrapper } from './TableWrappers'

interface RowProps {
  rowHeader: string
  imageStrings: {
    [key: string]: string | null
  }
}

const removeNulls = (obj: { [key: string]: string | null }) => {
  // Make a new object without the null values
  const newObj = Object.entries(obj).filter(([_, value]) => value !== null)
  return Object.fromEntries(newObj)
}

export const SpriteTableRow: FC<RowProps> = ({ rowHeader, imageStrings }) => {
  // If there are no entries, skip rendering that row.
  const isEmpty = Object.values(imageStrings).every(key => key === null)
  if (isEmpty) {
    return null
  }

  // The object without null values
  const newImageData = removeNulls(imageStrings)

  // Split the row header into different rows using a comma separator
  const rowHeaders = rowHeader.split(', ')

  return (
    <tr className="table-row">
      <td className="border-bd-light dark:border-bd-dark table-cell w-36 border p-2 font-bold">
        <div>
          {rowHeaders.map((header, index) => (
            <div className="text-center" key={header + index}>
              {header}
            </div>
          ))}
        </div>
      </td>
      {Object.values(newImageData).map((image, index) => (
        <TableCellWrapper key={(image ?? '') + index}>
          <ImageTile imageSource={image} />
        </TableCellWrapper>
      ))}
    </tr>
  )
}
