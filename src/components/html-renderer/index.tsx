import React, { FC } from 'react'

interface Props {
  html: string | undefined
}

const HtmlRenderer: FC<Props> = ({ html }) => (
  <>
    {html ? (
      <section
        className="prose prose-p:leading-6 dark:prose-headings:text-white dark:prose-strong:text-white max-w-full space-y-2 text-black dark:text-white"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    ) : null}
  </>
)

export default HtmlRenderer
