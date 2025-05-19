import { FC, ReactNode } from 'react'
import classNames from 'classnames'

interface AccordionProps {
  children: ReactNode
  visible: boolean
}

export const Accordion: FC<AccordionProps> = ({ children, visible }) => {
  return (
    <div
      className={classNames(
        'grid transition-[grid-template-rows] duration-500 ease-in-out',
        { 'grid-rows-[1fr]': visible },
        { 'grid-rows-[0fr]': !visible },
      )}
    >
      <div className="overflow-hidden">{children}</div>
    </div>
  )
}
