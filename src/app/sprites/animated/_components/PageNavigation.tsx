import React from 'react'

import { TransitionLink } from '@/components/ui/Link'

export const PageNavigation = () => {
  const linkData = [
    { ref: '#gen-1', text: 'Gen 1' },
    { ref: '#gen-2', text: 'Gen 2' },
    { ref: '#gen-3', text: 'Gen 3' },
    { ref: '#gen-4', text: 'Gen 4' },
    { ref: '#gen-5', text: 'Gen 5' },
    { ref: '#gen-6', text: 'Gen 6' },
    { ref: '#gen-7', text: 'Gen 7' },
  ]

  return (
    <div className="dark:bg-muted-blue grid place-items-center rounded-lg bg-sky-100">
      <ul className="flex flex-row flex-wrap items-center justify-center gap-y-2 divide-x divide-gray-400 py-4 dark:divide-white">
        <li className="px-4 font-bold text-black dark:text-white"> Jump to </li>
        {linkData.map(({ ref, text }, index) => (
          <li className="inline-flex w-max justify-center px-4" key={ref + index}>
            <TransitionLink href={ref}>{text}</TransitionLink>
          </li>
        ))}
      </ul>
    </div>
  )
}
