import React, { FC } from 'react'

interface SectionProps {
  comment: string | undefined
}

export const CommentsSection: FC<SectionProps> = ({ comment }) => (
  <>
    {comment ? (
      <section className="space-y-2" dangerouslySetInnerHTML={{ __html: comment }} />
    ) : null}
  </>
)
