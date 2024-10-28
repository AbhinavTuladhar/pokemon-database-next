import React, { FC } from 'react'

import {
  SectionTitle,
  TableCell,
  TableCellHeader,
  TableContainer,
  TableRow,
} from '@/components/containers'
import ContestHearts from '@/components/contest-hearts'
import { ContestApi } from '@/services/ContestApi'

const getContestEffectData = async (id: number) => {
  const response = await ContestApi.getEffectById(id)
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
    { header: 'Condition', children: typeName },
    { header: 'Appeal', children: <ContestHearts type="appeal" value={appeal} wrapFlag={false} /> },
    { header: 'Jam', children: <ContestHearts type="jam" value={jam} wrapFlag={false} /> },
    { header: 'Details', children: effectEntry },
  ]

  return (
    <>
      <SectionTitle>Contest Information</SectionTitle>
      <TableContainer>
        <tbody>
          {tableData.map(row => (
            <TableRow key={row.header}>
              <TableCellHeader>{row.header}</TableCellHeader>
              <TableCell>{row.children}</TableCell>
            </TableRow>
          ))}
        </tbody>
      </TableContainer>
    </>
  )
}
