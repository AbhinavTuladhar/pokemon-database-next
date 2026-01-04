'use client'

import { FC, FormEventHandler, useState } from 'react'

import { AttackingTypeInfo } from '@/types'

import ToolResults from './ToolResults'
import { TypeSelector } from './TypeSelector'

interface Props {
  data: AttackingTypeInfo[]
}
export const MainPage: FC<Props> = ({ data }) => {
  const [selectedTypes, setSelectedTypes] = useState<string[]>([])
  const [finalTypes, setFinalTypes] = useState<string[]>([])

  const handleButtonClick = (type: string) => {
    if (selectedTypes.includes(type)) {
      setSelectedTypes(prevList => prevList.filter(innerType => innerType !== type))
    } else {
      setSelectedTypes(prevList => [...prevList, type])
    }
  }

  const handleSubmit: FormEventHandler<HTMLFormElement> = e => {
    e.preventDefault()

    setFinalTypes(selectedTypes)
  }

  return (
    <div>
      <TypeSelector
        selectedTypes={selectedTypes}
        handleButtonClick={handleButtonClick}
        handleSubmit={e => handleSubmit(e)}
      />
      <ToolResults selectedTypes={finalTypes} typeData={data} />
    </div>
  )
}

export default MainPage
