import { FC } from 'react'
import { Link } from 'next-view-transitions'

interface Path {
  path: string
  name: string
}

const DropDownItem: FC<Path> = ({ path, name }) => {
  return (
    <li className="block bg-black text-left text-white duration-500 hover:bg-gray-800 dark:bg-[hsl(243.3,97.3%,14.7%)] dark:hover:bg-blue-900">
      <Link href={path} className="flex w-full px-4 py-1.5">
        <span>{name}</span>
      </Link>
    </li>
  )
}

export default DropDownItem
