'use client'

import { FC, FormEventHandler, useState } from 'react'

import { AttackingTypeInfo } from '@/types'

import Results from './Results'
import { TypeSelector } from './TypeSelector'

interface Props {
  data: AttackingTypeInfo[]
}
export const MainPage: FC<Props> = ({ data }) => {
  const [selectedTypes, setSelectedTypes] = useState<string[]>([])
  const [finalTypes, setFinalTypes] = useState<string[]>([])
  const [isError, setIsError] = useState(false)

  const handleButtonClick = (type: string) => {
    if (selectedTypes.includes(type)) {
      setSelectedTypes(prevList => prevList.filter(innerType => innerType !== type))
    } else {
      setSelectedTypes(prevList => [...prevList, type])
    }
  }

  const handleSubmit: FormEventHandler<HTMLFormElement> = e => {
    e.preventDefault()

    if (selectedTypes.length === 0) {
      setIsError(true)
    } else {
      setIsError(false)
      setFinalTypes(selectedTypes)
    }
  }

  return (
    <div className="space-y-4 lg:space-y-10">
      <article className="dark:bg-muted-blue self-start rounded-sm bg-sky-100 p-4">
        Use this handy tool to find how effective the attacking types (that you have selected) are
        against every single possible type combination. You need to select at least one type, but
        you can select more than four if you are planning to build movesets for more than one
        Pokémon.
      </article>
      <TypeSelector
        selectedTypes={selectedTypes}
        handleButtonClick={handleButtonClick}
        handleSubmit={e => handleSubmit(e)}
        isError={isError}
      />
      <Results selectedTypes={finalTypes} typeData={data} />
    </div>
  )
}

export default MainPage
