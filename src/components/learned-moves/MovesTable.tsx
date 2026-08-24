'use client'

import { FC } from 'react'

import MoveCategoryImage from '@/components/move-category-image'
import { TransitionLink } from '@/components/ui/Link'
import { TypeCard } from '@/features/pokemon/components/TypeCard'
import { TransformedMove } from '@/types'
import { formatName } from '@/utils/string.utils'
import { createColumnHelper } from '@tanstack/react-table'

import TanStackTable from '../tanstack-table'
import { AppTableFeatures } from '../tanstack-table'

interface TransformedMoveLevel extends TransformedMove {
  levelLearnedAt?: number
}

interface MovesTableProps {
  movesData: Array<TransformedMoveLevel>
  levelFlag?: boolean
}

type TableMoveData = Pick<
  TransformedMoveLevel,
  'moveName' | 'levelLearnedAt' | 'moveType' | 'damageClass' | 'power' | 'accuracy'
>

export const MovesTable: FC<MovesTableProps> = ({ movesData, levelFlag }) => {
  const smallerMoveData = movesData.map(
    ({ moveName, levelLearnedAt, moveType, damageClass, power, accuracy }) => ({
      moveName,
      levelLearnedAt,
      moveType,
      damageClass,
      power,
      accuracy,
    }),
  )

  const helper = createColumnHelper<AppTableFeatures, TableMoveData>()

  const columns = helper.columns([
    helper.accessor('moveName', {
      header: () => <span> Name </span>,
      cell: info => {
        const moveName = info.getValue()
        return (
          <TransitionLink boldFlag href={`/move/${moveName}`}>
            {formatName(moveName)}
          </TransitionLink>
        )
      },
      sortFn: 'basic',
      meta: {
        cellStyle: 'min-w-32',
      },
    }),
    helper.accessor('moveType', {
      header: () => <span> Type </span>,
      cell: info => <TypeCard typeName={info.getValue()} />,
      sortFn: 'basic',
    }),
    helper.accessor('damageClass', {
      header: () => <span> Cat. </span>,
      cell: info => (
        <div className="flex w-full justify-end">
          <MoveCategoryImage category={info.getValue()} />
        </div>
      ),
      sortFn: 'basic',
    }),
    helper.accessor('power', {
      header: () => <span> Power </span>,
      cell: info => {
        const powerValue = info.getValue()
        if (powerValue === 0) {
          return '-'
        }
        return powerValue
      },
      meta: {
        cellStyle: 'text-right',
      },
      sortFn: 'alphanumeric',
    }),
    helper.accessor('accuracy', {
      header: () => <span> Acc </span>,
      cell: info => {
        const accuracyValue = info.getValue()
        if (accuracyValue === 0) {
          return '-'
        }
        if (accuracyValue === Infinity) {
          return '∞'
        }
        return accuracyValue
      },
      meta: {
        cellStyle: 'text-right',
      },
      sortFn: 'basic',
    }),
  ])

  return (
    <div className="lg-xl:mx-0 overflow-auto sm:mx-auto">
      <TanStackTable
        data={smallerMoveData}
        columns={columns}
        firstColumn={levelFlag ? 'levelLearnedAt' : 'moveName'}
        useFullWidth
      />
    </div>
  )
}
