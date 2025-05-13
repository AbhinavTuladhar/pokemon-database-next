import React, { FC } from 'react'

import { TransformedMoveLevel } from '@/types'

import { SectionTitle } from '../ui/Title'

import { MovesTable } from './MovesTable'

interface MoveSectionProps {
  title: string
  subTitle: string
  moveData: Array<TransformedMoveLevel>
  levelFlag: boolean
  errorText: string
}

const MoveSection: FC<MoveSectionProps> = ({ title, subTitle, moveData, levelFlag, errorText }) => (
  <>
    <SectionTitle>{title}</SectionTitle>
    <span className="mb-4 text-sm">{moveData.length === 0 ? errorText : subTitle}</span>
    {moveData.length > 0 && <MovesTable movesData={moveData} levelFlag={levelFlag} />}
  </>
)

export default MoveSection
