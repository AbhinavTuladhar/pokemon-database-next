import React, { FC } from 'react'

interface PageProps {
  params: {
    itemName: string
  }
}

const ItemPage: FC<PageProps> = ({ params: { itemName } }) => {
  return <div>{itemName}</div>
}

export default ItemPage
