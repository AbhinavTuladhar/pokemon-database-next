'use client'

import React, { FC, FormEventHandler } from 'react'

import { TypeCard } from '@/features/pokemon/components/TypeCard'
import { typeList } from '@/features/pokemon/data/type.data'

interface Props {
  selectedTypes: string[]
  handleButtonClick: (type: string) => void
  handleSubmit: FormEventHandler<HTMLFormElement>
}

export const TypeSelector: FC<Props> = ({ selectedTypes, handleButtonClick, handleSubmit }) => {
  return (
    <form onSubmit={handleSubmit}>
      <div className="grid grid-cols-9 gap-2">
        {typeList.map(type => (
          <div key={type}>
            <button
              className={`${selectedTypes.includes(type) ? 'bg-gray-300 dark:bg-gray-700' : ''} grid cursor-pointer place-items-center p-6 duration-300 hover:bg-gray-300 dark:hover:bg-gray-700`}
              onClick={() => handleButtonClick(type)}
              type="button"
            >
              <TypeCard typeName={type} key={type} isLink={false} />
            </button>
          </div>
        ))}
      </div>
      <div className="flex justify-center">
        <button
          className="border-bd-light dark:border-bd-dark mt-4 cursor-pointer rounded-md border px-4 py-2 duration-300 hover:bg-gray-200 dark:hover:bg-gray-700"
          type="submit"
        >
          Submit!
        </button>
      </div>
    </form>
  )
}

export default TypeSelector
