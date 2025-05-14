import React, { FC } from 'react'

import { ContestTypeCard } from '@/components/cards'
import ContestHearts from '@/components/contest-hearts'
import { Table, TableCell, TableHeader, TableRow } from '@/components/ui/Table'
import { SectionTitle } from '@/components/ui/Title'
import ContestService from '@/features/battle/services/contest.service'

const getContestEffectData = async (id: number) => {
  const response = await ContestService.getEffectById(id)
  return response
}

interface ContestInfoProps {
  effectId: number
  typeName: string
}

export const ContestInfo: FC<ContestInfoProps> = async ({ effectId, typeName }) => {
  const effectData = await getContestEffectData(effectId)
  const { appeal, jam, effect_entries } = effectData
  const effectEntry = effect_entries[0].effect

  const tableData = [
    { header: 'Condition', children: <ContestTypeCard type={typeName} /> },
    { header: 'Appeal', children: <ContestHearts type="appeal" value={appeal} wrapFlag={false} /> },
    { header: 'Jam', children: <ContestHearts type="jam" value={jam} wrapFlag={false} /> },
    { header: 'Details', children: effectEntry },
  ]

  return (
    <>
      <SectionTitle>Contest Information</SectionTitle>
      <Table>
        <tbody>
          {tableData.map(row => (
            <TableRow key={row.header}>
              <TableHeader>{row.header}</TableHeader>
              <TableCell>{row.children}</TableCell>
            </TableRow>
          ))}
        </tbody>
      </Table>
    </>
  )
}
