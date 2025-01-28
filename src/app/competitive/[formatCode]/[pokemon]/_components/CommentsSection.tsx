import React, { FC } from 'react'

import HtmlRenderer from '@/components/html-renderer'

interface SectionProps {
  comment: string | undefined
}

export const CommentsSection: FC<SectionProps> = ({ comment }) => <HtmlRenderer html={comment} />
