import { FC } from 'react'

import { TransitionLink } from '../ui/Link'

interface Path {
  path: string
  name: string
}

const DropDownItem: FC<Path> = ({ path, name }) => {
  return (
    <li className="block bg-black text-left text-white duration-500 hover:bg-gray-800 dark:bg-[hsl(243.3,97.3%,14.7%)] dark:hover:bg-blue-900">
      <TransitionLink href={path} className="flex w-full px-4 py-1.5" nonTextFlag>
        <span>{name}</span>
      </TransitionLink>
    </li>
  )
}

export default DropDownItem
