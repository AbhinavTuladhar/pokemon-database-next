import React from 'react'

import BlueLink from '@/components/BlueLink'

const PageNavigation = () => {
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
    <div className="grid place-items-center rounded-lg bg-slate-800">
      <ul className="flex flex-row flex-wrap items-center justify-center gap-y-2 divide-x divide-white py-4">
        <li className="px-4 font-bold text-white"> Jump to </li>
        {linkData.map(({ ref, text }, index) => (
          <li className="inline-flex w-max justify-center px-4" key={index}>
            <BlueLink href={ref}>{text}</BlueLink>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default PageNavigation
