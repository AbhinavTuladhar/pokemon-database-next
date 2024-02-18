import { FC, ReactNode } from 'react'
import Link, { LinkProps } from 'next/link'

interface BlueLinkProps extends LinkProps {
  children: ReactNode
  boldFlag?: boolean
}

const BlueLink: FC<BlueLinkProps> = ({ children, boldFlag, ...props }) => {
  return (
    <Link {...props} className={`${boldFlag ? 'font-bold' : ''} fancy-link inline`}>
      {children}
    </Link>
  )
}

export default BlueLink
