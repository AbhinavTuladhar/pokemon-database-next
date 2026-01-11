'use client'

import React, { FC, FormEventHandler } from 'react'

import { TypeCard } from '@/features/pokemon/components/TypeCard'
import { typeList } from '@/features/pokemon/data/type.data'

interface Props {
  selectedTypes: string[]
  handleButtonClick: (type: string) => void
  handleSubmit: FormEventHandler<HTMLFormElement>
  isError: boolean
}

export const TypeSelector: FC<Props> = ({
  selectedTypes,
  handleButtonClick,
  handleSubmit,
  isError,
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <div className="grid grid-cols-3 justify-items-center gap-2 sm:grid-cols-6 lg:grid-cols-9 xl:gap-4">
        {typeList.map(type => (
          <div key={type}>
            <button
              className={`${selectedTypes.includes(type) ? 'bg-gray-300 dark:bg-gray-700' : ''} grid cursor-pointer place-items-center p-2 duration-300 hover:bg-gray-300 md:p-4 dark:hover:bg-gray-700`}
              onClick={() => handleButtonClick(type)}
              type="button"
            >
              <TypeCard typeName={type} key={type} isLink={false} />
            </button>
          </div>
        ))}
      </div>

      <div className={`${isError ? 'visible' : 'invisible'} my-4 text-center text-red-500`}>
        Select at least one type!
      </div>

      <div className="flex justify-center">
        <button
          className="border-bd-light dark:border-bd-dark mt-4 cursor-pointer rounded-md border bg-linear-to-br from-gray-200 to-gray-300 px-4 py-2 text-black duration-300 hover:bg-gray-200 hover:brightness-105 dark:from-gray-600 dark:to-gray-700 dark:text-white dark:hover:bg-gray-700 dark:hover:brightness-110"
          type="submit"
        >
          Submit!
        </button>
      </div>
    </form>
  )
}

export default TypeSelector
