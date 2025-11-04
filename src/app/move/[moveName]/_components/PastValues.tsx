import { FC } from 'react'

import { ElementType, TransformedPastMoveValue } from '@/types'
import { formatName } from '@/utils/string.utils'

interface PastValuesProps {
  moveName: string
  pastValues: TransformedPastMoveValue
}

export const PastValues: FC<PastValuesProps> = ({ pastValues, moveName }) => {
  return (
    <div>
      <h3 className="mt-6 mb-2 text-2xl font-bold"> Changes </h3>
      <ul className="flex list-inside list-disc flex-col gap-2">
        {pastValues.map((pastValue, index) => (
          <PastValuesRow key={index} moveName={moveName} {...pastValue} />
        ))}
      </ul>
    </div>
  )
}

type PastValueRowProps = ElementType<TransformedPastMoveValue> & { moveName: string }

const PastValuesRow: FC<PastValueRowProps> = props => {
  // Non-null values represent the values that were actually changed between generations.
  // moveName and generation are excluded from this list since they are always present
  const changedValues = Object.fromEntries(
    Object.entries(props).filter(([key, value]) => {
      if (key !== 'moveName' && key !== 'generation' && value !== null) {
        return [key, value]
      }
    }),
  )

  const entries = Object.entries(changedValues)

  return (
    <li>
      <span> Prior to </span>
      <span> {props.generation}, </span>
      <span className="italic"> {formatName(props.moveName)}</span>
      <span> had a </span>
      <span>
        {entries.map(([key, value], index) => (
          <span key={index}>
            {key} of {JSON.stringify(value)}
            {index < entries.length - 1 ? ', ' : '.'}
          </span>
        ))}
      </span>
    </li>
  )
}
