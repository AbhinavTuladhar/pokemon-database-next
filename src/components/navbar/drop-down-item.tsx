import { FC } from 'react'
import Link from 'next/link'

interface Path {
  path: string
  name: string
}

const DropDownItem: FC<Path> = ({ path, name }) => {
  return (
    <li className="block bg-black px-4 py-1.5 text-left text-white duration-500 hover:bg-gray-800 dark:bg-[#05014a] dark:hover:bg-blue-900">
      <Link href={path} className="flex w-full">
        <span>{name}</span>
      </Link>
    </li>
  )
}

export default DropDownItem
