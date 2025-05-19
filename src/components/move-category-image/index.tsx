import { FC } from 'react'
import Image from 'next/image'

import { getMoveImage } from '@/features/battle/helpers/move.helper'

interface MoveCategoryProps {
  category: string
}

const MoveCategoryImage: FC<MoveCategoryProps> = ({ category }) => {
  const imageFile = getMoveImage(category)
  const imageSource = `/move-types/${imageFile}`

  return <Image src={imageSource} width={30} height={20} alt={category} />
}

export default MoveCategoryImage
