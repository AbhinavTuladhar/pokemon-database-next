import { FC, ReactNode } from 'react'
import { LinkProps } from 'next/link'
import { Link } from 'next-view-transitions'

interface BlueLinkProps extends LinkProps {
  children: ReactNode
  boldFlag?: boolean
}

export const BlueLink: FC<BlueLinkProps> = ({ children, boldFlag, ...props }) => {
  return (
    <Link {...props} className={`${boldFlag ? 'font-bold' : ''} fancy-link`}>
      {children}
    </Link>
  )
}
