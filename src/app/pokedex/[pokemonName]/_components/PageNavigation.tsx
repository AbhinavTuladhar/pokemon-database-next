import React from 'react'

import BlueLink from '@/components/link'

export const PageNavigation = () => {
  const linkData = [
    { ref: '#info', text: 'Info' },
    { ref: '#base-stats', text: 'Base stats' },
    { ref: '#evolution-chain', text: 'Evolution chart' },
    { ref: '#pokedex-entries', text: 'Pokédex entries' },
    { ref: '#moves-learned', text: 'Moves learned' },
    { ref: '#sprites', text: 'Sprites' },
    { ref: '#locations', text: 'Locations' },
    { ref: '#varieties', text: 'Forms' },
    { ref: '#languages', text: 'Languages' },
  ]
  return (
    <div className="grid place-items-center rounded-lg bg-sky-100 dark:bg-blue-950">
      <ul className="flex flex-row flex-wrap items-center justify-center gap-y-2 divide-x divide-gray-400 py-4 dark:divide-white">
        <li className="px-4 font-bold text-black dark:text-white"> Contents </li>
        {linkData.map((row, index) => {
          const { ref, text } = row
          return (
            <li className="inline-flex w-max justify-center px-4" key={index}>
              <BlueLink href={ref}>{text}</BlueLink>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
