import React, { FC } from 'react'

import { ImageTile } from './ImageTile'

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
      {Object.values(newImageData).map((image, index) => (
        <td key={index} className="table-cell min-w-36 border border-table-border py-6 text-center">
          <ImageTile imageSource={image} />
        </td>
      ))}
    </tr>
  )
}
