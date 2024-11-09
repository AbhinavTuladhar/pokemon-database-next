'use client'

import { FC, useMemo } from 'react'

import { TypeCard } from '@/components/cards'
import BlueLink from '@/components/link'
import MoveCategoryImage from '@/components/move-category-image'
import { TransformedMove } from '@/types'
import formatName from '@/utils/formatName'
import { createColumnHelper } from '@tanstack/react-table'

import TanStackTable from '../tanstack-table'

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

  const helper = createColumnHelper<TableMoveData>()

  const headerStyle = 'border-r border-r-bd-light pr-4 last:border-r-0 dark:border-r-bd-dark'

  const columns = useMemo(() => {
    const baseColumns = [
      helper.accessor('moveName', {
        header: () => <span> Name </span>,
        cell: info => {
          const moveName = info.getValue()
          return (
            <BlueLink boldFlag href={`/move/${moveName}`}>
              {formatName(moveName)}
            </BlueLink>
          )
        },
        meta: {
          headerStyle,
        },
        sortingFn: 'basic',
        enableGlobalFilter: true,
      }),
      helper.accessor('moveType', {
        header: () => <span> Type </span>,
        cell: info => <TypeCard typeName={info.getValue()} />,
        meta: {
          headerStyle,
        },
        sortingFn: 'basic',
      }),
      helper.accessor('damageClass', {
        header: () => <span> Cat. </span>,
        cell: info => (
          <div className="flex w-full justify-end">
            <MoveCategoryImage category={info.getValue()} />
          </div>
        ),
        meta: {
          headerStyle,
        },
        sortingFn: 'basic',
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
          headerStyle,
          cellStyle: 'text-right',
        },
        sortingFn: 'alphanumeric',
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
          headerStyle,
          cellStyle: 'text-right',
        },
        sortingFn: 'basic',
      }),
    ]

    return [
      ...(levelFlag
        ? [
            helper.accessor('levelLearnedAt', {
              header: () => <span> Lv. </span>,
              cell: info => info.getValue(),
              meta: {
                headerStyle,
                cellStyle: 'text-right',
              },
              sortingFn: 'basic',
            }),
          ]
        : []),
      ...baseColumns,
    ]
  }, [helper, levelFlag])

  return (
    <div className="flex justify-center mdlg:block">
      <TanStackTable
        data={smallerMoveData}
        columns={columns}
        firstColumn={levelFlag ? 'levelLearnedAt' : 'moveName'}
      />
    </div>
  )
}
