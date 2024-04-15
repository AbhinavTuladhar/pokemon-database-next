import React from 'react'
import Image from 'next/image'

interface TableColumnProps {
  columnIndex: number
  images: Array<string | null>
  title: string
}

const SpriteTableColumn: React.FC<TableColumnProps> = ({ columnIndex, images, title }) => {
  if (columnIndex === 0) {
    const labels = [title, 'Normal', 'Shiny']

    return (
      <div className="flex w-24 flex-col">
        {labels.map((label, index) => (
          <div
            className="border-table-border grid h-40 place-items-center border first:h-16 first:bg-gray-900"
            key={index}
          >
            {label}
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="flex w-40 flex-col">
      <div className="border-table-border grid h-16 w-40 place-items-center border bg-gray-900 font-bold">
        {title}
      </div>
      {images.map((image, imageIndex) => {
        return (
          <div
            className="border-table-border grid h-40 w-40 place-items-center border object-center p-2"
            key={imageIndex}
          >
            {image ? (
              <Image
                src={image}
                width={140}
                height={140}
                alt="test"
                className="aspect-square object-contain"
                unoptimized={image.endsWith('.gif')}
              />
            ) : (
              <span className="text-4xl"> — </span>
            )}
          </div>
        )
      })}
    </div>
  )
}

export default SpriteTableColumn
