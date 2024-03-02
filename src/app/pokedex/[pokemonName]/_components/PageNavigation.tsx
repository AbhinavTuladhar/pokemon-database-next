import BlueLink from '@/components/BlueLink'
import React from 'react'

const PageNavigation = () => {
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
    <nav className="grid place-items-center rounded-lg bg-cyan-300">
      <ul className="flex flex-row flex-wrap items-center justify-center gap-y-2 divide-x divide-red-400 py-4">
        <li className="px-4 font-bold text-black"> Contents </li>
        {linkData.map((row, index) => {
          const { ref, text } = row
          return (
            <li className="inline-flex w-max justify-center px-4" key={index}>
              <BlueLink href={ref}>{text}</BlueLink>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

export default PageNavigation
