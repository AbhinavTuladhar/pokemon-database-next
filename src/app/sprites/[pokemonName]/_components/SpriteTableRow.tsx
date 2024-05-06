import React, { FC, ReactNode } from 'react'

import { ImageTile } from './ImageTile'

interface RowProps {
  rowHeader: string
  imageStrings: {
    [key: string]: string | null
  }
  imageChildren?: Array<ReactNode>
}

export const SpriteTableRow: FC<RowProps> = ({ imageChildren, rowHeader, imageStrings }) => {
  // return (
  //   <tr>
  //     <td> Row </td>
  //   </tr>
  // )
  // If there are no entries, skip rendering that row.
  const isEmpty = Object.values(imageStrings).every(key => key === null)
  if (isEmpty) {
    return null
  }

  // Split the row header into different rows using a comma separator
  const rowHeaders = rowHeader.split(', ')

  const imageCells = Object.values(imageStrings).map((image, index) => (
    <td key={index} className="table-cell min-w-36 border border-table-border p-2 text-center">
      <ImageTile imageSource={image} />
    </td>
  ))

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
      {imageCells}
    </tr>
  )
}
